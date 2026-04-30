import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

// Fallback logic for when no API key is provided in .env
const KNOWLEDGE_BASE = [
  { keywords: ['register', 'registration', 'sign up'], answer: "📋 **Voter Registration** is the first step! You need to register before you can vote. Requirements usually include proof of citizenship, age, and residency. (Add an API key in your .env file to unlock full answers!)" },
  { keywords: ['eligible', 'eligibility', 'who can vote'], answer: "✅ **Voter Eligibility** generally requires you to be 18+, a citizen, and a resident of your jurisdiction. Use our Eligibility Checker tool for personalized guidance!" },
  { keywords: ['vote', 'voting', 'ballot', 'how to vote'], answer: "🗳️ **How to Vote:** Find your polling place, bring required ID, and cast your ballot! You can also vote early or by mail in many places." },
  { keywords: ['timeline', 'process', 'stages'], answer: "📅 **The Election Process:** 1. Registration 2. Candidate Filing 3. Campaign 4. Voting 5. Counting 6. Certification 7. Inauguration." },
];

function getFallbackResponse(message) {
  const lower = message.toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(k => lower.includes(k))) return item.answer;
  }
  return "👋 Hi! I am running in **Basic Mode** because no API key was found in the `.env` file.\n\n🔓 **To unlock my full \"large data\" AI brain** and ask me *anything* about elections, please add `VITE_GEMINI_API_KEY=your_key` to the `.env` file in the project root and restart the server!";
}

function formatMessage(text) {
  // Simple markdown parser for bold and line breaks
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  formatted = formatted.replace(/\n/g, '<br />');
  return formatted;
}

export default function Chatbot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: t('chatbot.welcome') + (apiKey ? " I am powered by Gemini AI! Ask me anything about elections." : " (Basic Mode)"), time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const getGeminiResponse = async (promptText) => {
    if (!apiKey) return getFallbackResponse(promptText);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Fallback: Removed googleSearch tool because it requires a paid/billed API key
      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest"
      });
      
      const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      const systemPrompt = `You are ElectED, an expert, friendly, and non-partisan Election Education Assistant. The current date is ${currentDate}. You have access to Google Search—ALWAYS use it to fetch real-time, current data if the user asks about current elections, current candidates, or recent events. Explain the election process, voting requirements, political systems, and democracy in simple, accessible language. Use emojis and bullet points to make answers readable. Keep answers concise (under 150 words). Never take a political stance or endorse candidates.\n\nUser Question: `;
      
      const result = await model.generateContent(systemPrompt + promptText);
      return result.response.text();
    } catch (err) {
      console.error(err);
      return "❌ **API Error:** " + (err.message || "Could not connect to Gemini. Please check if your API key is valid.");
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: 'user', text, time: new Date() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);

    const replyText = await getGeminiResponse(text);
    
    setTyping(false);
    setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: replyText, time: new Date() }]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const resetChat = () => {
    setMessages([{ id: 1, from: 'bot', text: t('chatbot.welcome') + (apiKey ? " I am powered by Gemini AI! Ask me anything about elections." : " (Basic Mode)"), time: new Date() }]);
  };

  const suggestions = ['Explain the Electoral College', 'How do mail-in ballots work?', 'What is gerrymandering?', 'Primary vs General election?'];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className={`chatbot-fab ${open ? 'chatbot-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? t('common.close') + ' Assistant' : 'Open Election Assistant'}
        id="chatbot-fab-btn"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chatbot-fab__badge">✨</span>}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window animate-slide-in" role="dialog" aria-label="Election Assistant Chat" aria-modal="true">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__left">
              <div className="chatbot-avatar" style={{ background: apiKey ? 'var(--color-primary-500)' : 'var(--text-muted)' }}>
                <Bot size={18} />
                <span className="chatbot-avatar__status" style={{ background: apiKey ? 'var(--color-success)' : 'var(--color-warning)' }} aria-label="Online"></span>
              </div>
              <div>
                <p className="chatbot-header__title">{t('chatbot.title')} {apiKey ? '⚡' : '💤'}</p>
                <p className="chatbot-header__subtitle" style={{ color: apiKey ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)' }}>
                  <Sparkles size={10} style={{ display:'inline', marginRight:3 }} />
                  {apiKey ? 'Full AI Brain Active' : 'Basic Mode - Add Key to .env'}
                </p>
              </div>
            </div>
            <div className="chatbot-header__actions">
              <button className="chatbot-icon-btn" onClick={resetChat} aria-label="Reset conversation">
                <RotateCcw size={15} />
              </button>
              <button className="chatbot-icon-btn" onClick={() => setOpen(false)} aria-label="Close">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                {msg.from === 'bot' && (
                  <div className="chatbot-msg__avatar"><Bot size={14} /></div>
                )}
                <div
                  className="chatbot-msg__bubble"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                {msg.from === 'user' && (
                  <div className="chatbot-msg__avatar chatbot-msg__avatar--user"><User size={14} /></div>
                )}
              </div>
            ))}
            {typing && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar"><Bot size={14} /></div>
                <div className="chatbot-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="chatbot-suggestions">
              {suggestions.map((s) => (
                <button key={s} className="chatbot-suggestion" onClick={() => { setInput(s); setTimeout(sendMessage, 0); }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={apiKey ? "Ask me anything..." : "API key required for complex questions..."}
              aria-label="Type your message"
              maxLength={500}
            />
            <button
              className={`chatbot-send ${input.trim() ? 'chatbot-send--active' : ''}`}
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
