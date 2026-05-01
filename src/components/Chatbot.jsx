import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { 
  MessageCircle, X, Send, User, Bot, Mic, MicOff, 
  Volume2, VolumeX, Loader2, Sparkles, Search, History, RotateCcw 
} from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';
import { performWebSearch } from '../services/searchService';
import { generateRobustAiResponse } from '../services/aiService';
import './Chatbot.css';

/**
 * Premium Floating Voice Assistant
 * Features: Multi-modal (Text/Voice), Web-Aware, Multi-provider Fallback.
 */
export default function Chatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mute, setMute] = useState(false);
  
  // Environment Keys
  const searchApiKey = import.meta.env.VITE_TAVILY_API_KEY || '';
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const nimKey = import.meta.env.VITE_NVIDIA_NIM_API_KEY || '';
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Language-Specific Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Map context lang to Speech API lang
      const langMap = { en: 'en-US', es: 'es-ES', hi: 'hi-IN', ur: 'ur-PK' };
      recognitionRef.current.lang = langMap[lang] || 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, [lang]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isSearching, isOpen]);

  const speak = (text) => {
    if (mute || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-US', es: 'es-ES', hi: 'hi-IN', ur: 'ur-PK' };
    utterance.lang = langMap[lang] || 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');

    try {
      let searchData = { answer: null, results: [] };
      
      if (searchApiKey) {
        setIsSearching(true);
        searchData = await performWebSearch(text, searchApiKey);
        setIsSearching(false);
      }
      
      setIsTyping(true);

      
      // 2. AI Response via Robust Orchestrator
      const context = searchData.results.length > 0 
        ? searchData.results.map(r => `Source: ${r.title}\nContent: ${r.content}`).join('\n\n')
        : "No real-time data found. Use internal knowledge.";
      
      const aiPrompt = `User Question: ${text}\n\nWeb Search Context:\n${context}`;
      
      // Map context lang for AI Service
      const aiLangMap = { en: 'en-US', es: 'es-ES', hi: 'hi-IN', ur: 'en-US' }; // Defaulting ur to en for AI if not supported
      
      const response = await generateRobustAiResponse(
        aiPrompt, 
        nimKey ? 'nim' : 'gemini', 
        geminiKey, 
        nimKey, 
        aiLangMap[lang] || 'en-US'
      );
      
      const sanitizedText = DOMPurify.sanitize(response.replace(/[*#_`~]/g, ''));
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: sanitizedText, 
        sources: searchData.results.slice(0, 2).map(r => (r.url ? new URL(r.url).hostname : 'Search Result'))
      }]);

      
      setIsTyping(false);
      speak(sanitizedText);
    } catch (err) {
      console.error("Chatbot Error:", err);
      setIsSearching(false);
      setIsTyping(false);
      
      const errorDetail = err.message || "Unknown error";
      const errMsg = `I encountered an issue connecting to my AI brain: "${errorDetail}". Please verify your API keys and project settings.`;
      
      setMessages(prev => [...prev, { type: 'bot', text: errMsg }]);
    }

  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Floating Toggle */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        <div className="chatbot-toggle__status" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window glass-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header__info">
                <div className="chatbot-avatar">
                  <Bot size={20} />
                  <div className="chatbot-avatar__online" />
                </div>
                <div>
                  <h4 className="chatbot-header__title">ElectED Assistant ⚡</h4>
                  <div className="chatbot-header__status">
                    <Sparkles size={10} />
                    <span>Full AI Brain Active</span>
                  </div>
                </div>
              </div>
              <div className="chatbot-header__actions">
                <button className="chatbot-action-btn" title="Reset Chat" onClick={() => setMessages([])}>
                  <RotateCcw size={18} />
                </button>
                <button className="chatbot-action-btn" title="Close" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.length === 0 && (
                <div className="chatbot-welcome">
                  <div className="chatbot-welcome__icon">🤖</div>
                  <h4>How can I help you today?</h4>
                  <p>{searchApiKey ? 'I can search the web for real-time election data.' : 'Ask me about registration, dates, or election processes.'}</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message chat-message--${msg.type}`}>
                  {msg.type === 'bot' && (
                    <div className="chat-avatar">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`chat-bubble chat-bubble--${msg.type}`}>
                    {msg.text}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="chat-bubble__sources">
                        <Search size={10} />
                        <span>Sources: {msg.sources.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isSearching && (
                <div className="chat-status-msg">
                  <div className="animate-pulse">🔍 Searching the web...</div>
                </div>
              )}
              {isTyping && !isSearching && (
                <div className="chat-status-msg">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input-container" onSubmit={handleSend}>
              <div className="chatbot-input-wrapper">
                <button 
                  type="button" 
                  className={`chatbot-voice-btn ${isListening ? 'active' : ''}`}
                  onClick={toggleListening}
                >
                  <Mic size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="chatbot-send-btn"
                  disabled={!input.trim() || isTyping}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
