import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { MessageSquare, Send, User, Bot, Mic, MicOff, Volume2, VolumeX, Search, Globe, Loader2, X, AlertCircle } from 'lucide-react';
import { performWebSearch } from '../services/searchService';
import { generateRobustAiResponse } from '../services/aiService';

const VoiceAssistant = ({ language = 'en-US' }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: searchApiKey ? "Welcome to ElectED's Voice Assistant. I can search the web for real-time election data. How can I help you today?" : "Welcome to ElectED's Voice Assistant. How can I help you today?", sources: [] }

  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mute, setMute] = useState(false);
  
  // Keys from environment
  const searchApiKey = import.meta.env.VITE_TAVILY_API_KEY || '';
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const nimKey = import.meta.env.VITE_NVIDIA_NIM_API_KEY || '';
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
    }
    
    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isSearching]);

  const speak = (text) => {
    if (mute || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setIsSearching(true);
    
    abortControllerRef.current = new AbortController();
    
    try {
      // 1. Web Search
      const searchData = await performWebSearch(text, searchApiKey);
      setIsSearching(false);
      setIsTyping(true);
      
      // 2. AI Response
      const context = searchData.results.length > 0 
        ? searchData.results.map(r => `Source: ${r.title}\nContent: ${r.content}`).join('\n\n')
        : "No real-time data found. Use internal knowledge.";
      
      const aiPrompt = `User: ${text}\n\nContext:\n${context}`;
      const response = await generateRobustAiResponse(aiPrompt, 'gemini', geminiKey, nimKey, language);
      
      const sanitizedText = DOMPurify.sanitize(response.replace(/[*#_`~]/g, ''));
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: sanitizedText, 
        sources: searchData.results.map(r => new URL(r.url).hostname)
      }]);
      
      setIsTyping(false);
      speak(sanitizedText);
    } catch (err) {
      console.error("Assistant Error:", err);
      setIsSearching(false);
      setIsTyping(false);
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
    <div className="voice-assistant-container" style={{
      maxWidth: '600px',
      margin: '2rem auto',
      background: 'var(--glass-bg)',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      height: '600px',
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>ELECTED AI</span>
        </div>
        <button onClick={() => setMute(!mute)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          {mute ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{
            alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            background: msg.type === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
            color: msg.type === 'user' ? 'white' : 'var(--text-primary)',
            padding: '0.75rem 1rem',
            borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            border: '1px solid var(--glass-border)',
            fontSize: '0.95rem'
          }}>
            {msg.text}
            {msg.sources && msg.sources.length > 0 && (
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {msg.sources.map((s, i) => <span key={i} style={{ fontSize: '0.65rem', opacity: 0.7 }}>• {s}</span>)}
              </div>
            )}
          </motion.div>
        ))}
        {isSearching && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Loader2 size={14} className="animate-spin" /> Searching web...</div>}
        {isTyping && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ElectED is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem' }}>
        <button onClick={toggleListening} style={{
          width: '45px', height: '45px', borderRadius: '50%', border: 'none',
          background: isListening ? '#ef4444' : 'var(--bg-secondary)',
          color: isListening ? 'white' : 'var(--text-primary)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center'
        }}>
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything..."
          style={{
            flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)',
            borderRadius: '25px', padding: '0 1.25rem', color: 'var(--text-primary)', outline: 'none'
          }}
        />
        <button onClick={() => handleSend()} style={{
          width: '45px', height: '45px', borderRadius: '50%', border: 'none',
          background: 'var(--primary)', color: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Send size={18} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default VoiceAssistant;
