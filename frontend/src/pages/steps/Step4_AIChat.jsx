import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, AlertCircle } from 'lucide-react';
import apiClient from '../../api/client';

export default function Step4_AIChat({ onNavigate }) {
  const [query, setQuery] = useState("I have acute chest pain and shortness of breath starting 30 minutes ago.");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello Jane. Describe your symptoms, onset time, and discomfort level for instant AI triage." }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: query }]);
    setLoading(true);

    try {
      const res = await apiClient.post('/ai/triage', { user_query: query });
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: `🚨 Urgent Triage Result: ${res.data.urgency_level} (${res.data.recommended_department} Department recommended).`
        }
      ]);
      setLoading(false);
      setTimeout(() => onNavigate(5), 1200);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "🚨 Simulated Triage: EMERGENCY (Code RED-1). Recommended Department: Cardiology."
        }
      ]);
      setLoading(false);
      setTimeout(() => onNavigate(5), 1200);
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-teal-400" />
          <h4 className="text-sm font-bold text-white">Conversational Clinical Triage Intake</h4>
        </div>
        <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/30">
          Agent: intake_agent_node
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
              m.sender === 'user' ? 'bg-teal-500 text-slate-950 font-semibold' : 'bg-slate-900 border border-slate-800 text-slate-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-teal-400 p-2">AI Reasoning in Progress...</div>}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" 
        />
        <button onClick={handleSend} className="bg-teal-500 hover:bg-teal-400 text-slate-950 p-2.5 rounded-xl font-bold">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
