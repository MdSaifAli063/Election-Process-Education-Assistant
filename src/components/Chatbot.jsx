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
  const [searching, setSearching] = useState(false);
  
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
      
      // Google Search requires a paid API tier. Uncomment tools array when billing is enabled.
      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
        // tools: [{ googleSearch: {} }] 
      });
      
      const systemPrompt = `You are ElectED, a highly intelligent and up-to-date AI Assistant. The current year is 2026. 

I will provide you with "Real-time Web Search Results" for the user's query. You MUST prioritize the information in those results to ensure your answer is current and accurate for today's date. 

If the user asks about elections, be an expert, non-partisan guide. If they ask about anything else, provide a factual, helpful, and concise response. Use emojis and bullet points for readability. Keep answers under 150 words.

User Question: `;
      
      const result = await model.generateContent(systemPrompt + promptText);
      return result.response.text();
    } catch (err) {
      console.error(err);
      return "❌ **API Error:** " + (err.message || "Could not connect to Gemini. Please check if your API key is valid.");
    }
  };

  const fetchWebContext = async (query) => {
    setSearching(true);
    let context = "";
    try {
      // Source 1: DuckDuckGo Instant Answer (Quick facts)
      const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&origin=*`;
      const ddgRes = await fetch(ddgUrl);
      const ddgData = await ddgRes.json();
      if (ddgData.AbstractText) {
        context += `DuckDuckGo Info: ${ddgData.AbstractText}\n\n`;
      }

      // Source 2: Wikipedia (Deep data)
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
      
      if (searchData.query?.search?.length > 0) {
        const title = searchData.query.search[0].title;
        const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=8&exlimit=1&titles=${encodeURIComponent(title)}&explaintext=1&format=json&origin=*`;
        const pageRes = await fetch(pageUrl);
        const pageData = await pageRes.json();
        const pages = pageData.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].extract) {
          context += `Wikipedia Data: ${pages[pageId].extract}`;
        }
      }
    } catch (e) {
      console.error("Web search failed", e);
    } finally {
      setSearching(false);
    }
    return context || null;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: 'user', text, time: new Date() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    
    // Perform multi-source live web search
    const webContext = await fetchWebContext(text);
    
    setTyping(true);
    const enrichedText = webContext 
      ? `[HIGH-LEVEL WEB SEARCH RESULTS]\n${webContext}\n\n[USER QUESTION]\n${text}\n\nPlease analyze the search data above and provide a definitive, up-to-date answer.` 
      : text;

    const replyText = await getGeminiResponse(enrichedText);
    
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
            {searching && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar"><Bot size={14} /></div>
                <div className="chatbot-msg__bubble" style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.8 }}>
                  <Sparkles size={12} style={{ marginRight: 6, color: 'var(--color-primary-400)' }} />
                  Searching web for answers...
                </div>
              </div>
            )}
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
