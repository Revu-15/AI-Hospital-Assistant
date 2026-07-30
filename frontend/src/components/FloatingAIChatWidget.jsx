import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Mic, Paperclip, AlertTriangle, Stethoscope, FileText, 
  CheckCircle2, Bot, User, RefreshCw, Volume2, Maximize2, Minimize2 
} from 'lucide-react';
import { apiService } from '../api/client';

export default function FloatingAIChatWidget({ onOpenFullChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '👋 Hello! I am your 24/7 AI Health Coordinator powered by OpenAI Swarm.\n\nAsk about booking appointments, lab report summaries, pharmacy drug interactions, or hospital FAQs.',
      timestamp: 'Just now',
      agent: 'Main Hospital Agent'
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (overrideText) => {
    const query = overrideText || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setInputQuery('');
    setIsTyping(true);

    try {
      const res = await apiService.sendSwarmChat(query, 'main');
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: res.data.response || "I'm here to assist you with your health query.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agent: res.data.active_agent || 'Main Agent',
          handoffs: res.data.handoff_history
        }
      ]);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I am ready to help you with doctor appointments, prescriptions, billing, and lab report analysis.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agent: 'Main Hospital Agent'
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-3 bg-gradient-to-r from-apolloBlue via-blue-600 to-teal-500 hover:scale-105 text-white px-5 py-3.5 rounded-full shadow-xl shadow-apolloBlue/30 transition-all duration-300"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold font-sans">AI Swarm Assistant</span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      )}

      {/* Opened AI Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[520px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-apolloBlue to-teal-600 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-bold">OpenAI Swarm Medical AI</h3>
                <p className="text-[10px] text-blue-100">8 Multi-Agent Network Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {onOpenFullChat && (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullChat();
                  }}
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition text-xs font-bold flex items-center gap-1"
                  title="Expand to Full Screen Chat"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  m.sender === 'user' 
                    ? 'bg-apolloBlue text-white rounded-tr-none font-medium' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none shadow-sm'
                }`}>
                  {m.agent && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-apolloSky dark:bg-blue-950 text-apolloBlue dark:text-blue-300 block w-fit mb-1">
                      {m.agent}
                    </span>
                  )}
                  <div className="whitespace-pre-line font-sans">{m.text}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-xs text-apolloBlue flex items-center space-x-2">
                  <div className="w-2 h-2 bg-apolloBlue rounded-full animate-ping"></div>
                  <span>Swarm agents orchestrating...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form 
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input 
                type="text" 
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                placeholder="Ask Swarm Agent..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none"
              />
              <button 
                type="submit"
                className="bg-apolloBlue text-white p-2 rounded-xl font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}
