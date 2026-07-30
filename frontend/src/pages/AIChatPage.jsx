import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, RefreshCw, User, Shield, ArrowRight, Zap } from 'lucide-react';
import { apiService } from '../api/client';

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: (
        "👋 Hello! I am the **Main AI Hospital Coordinator** at SmartHospital Healthcare.\n\n" +
        "I can coordinate with our 8 specialized OpenAI Swarm Agents:\n" +
        "• 📅 **Appointment Agent**: Schedule, cancel, or check doctor slots\n" +
        "• 💳 **Billing & Insurance Agent**: Invoices, co-pay & coverage\n" +
        "• 📋 **Medical Records Agent**: Summarize lab reports & search history\n" +
        "• 💊 **Prescription Agent**: Medication schedules & drug interactions\n" +
        "• 🚨 **Emergency Triage Agent**: Urgent care & ambulance contact\n" +
        "• 🩺 **Symptom Checker Agent**: Condition analysis & specialist matching\n" +
        "• 🏥 **Hospital FAQ Agent**: Visiting hours, doctors list & facilities\n\n" +
        "How can I assist you today?"
      ),
      activeAgent: 'Main Hospital Agent',
      handoffHistory: ['Main Hospital Agent']
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [activeAgent, setActiveAgent] = useState('main');
  const [activeAgentName, setActiveAgentName] = useState('Main Hospital Agent');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice Input (Speech Recognition)
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Speech Output (Text-to-Speech)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getFallbackResponse = (queryText) => {
    const q = queryText.toLowerCase();
    if (q.includes('book') || q.includes('appointment') || q.includes('doctor') || q.includes('cardiology') || q.includes('slot') || q.includes('jenkins')) {
      return {
        reply: "📅 **[Appointment Agent]**: I can schedule your appointment with **Dr. Sarah Jenkins** (Interventional Cardiology) for tomorrow at **10:30 AM**. Token Reserved: **#TK-CARD-892** at SmartHospital Central Hospital.",
        agent: "Appointment Agent",
        trace: ["Main Hospital Agent", "Appointment Agent"]
      };
    } else if (q.includes('aspirin') || q.includes('ibuprofen') || q.includes('drug') || q.includes('medicine') || q.includes('interaction') || q.includes('pill') || q.includes('prescription')) {
      return {
        reply: "💊 **[Prescription Safety Agent]**: ⚠️ **Drug Interaction Warning**: Combining **Aspirin 81mg** and **Ibuprofen (NSAID)** increases gastrointestinal bleeding risk and reduces aspirin's cardioprotective effects. Please consult your physician before taking both simultaneously.",
        agent: "Prescription Agent",
        trace: ["Main Hospital Agent", "Prescription Agent"]
      };
    } else if (q.includes('bill') || q.includes('insurance') || q.includes('copay') || q.includes('invoice') || q.includes('pay') || q.includes('claim')) {
      return {
        reply: "💳 **[Billing & Insurance Agent]**: Your insurance plan (**Star Health Care**) covers 80% of outpatient consultations and lab diagnostics. Remaining copay amount: **$45.00**. Latest Invoice **#INV-9402** is generated.",
        agent: "Billing Agent",
        trace: ["Main Hospital Agent", "Billing Agent"]
      };
    } else if (q.includes('report') || q.includes('blood') || q.includes('ecg') || q.includes('lab') || q.includes('summarize')) {
      return {
        reply: "📋 **[Medical Records Agent]**: Report Summary Analyzed: Lipid Panel shows Total Cholesterol at 215 mg/dL, HDL at 52 mg/dL, LDL at 130 mg/dL. ECG scan confirms normal sinus rhythm.",
        agent: "Medical Records Agent",
        trace: ["Main Hospital Agent", "Medical Records Agent"]
      };
    } else if (q.includes('chest') || q.includes('breath') || q.includes('emergency') || q.includes('pain') || q.includes('triage') || q.includes('ambulance')) {
      return {
        reply: "🚨 **[Emergency Triage Agent]**: **CRITICAL TRIAGE ALERT**: Chest pain and shortness of breath require immediate medical evaluation. Please call **911 / 108** or contact our ER Hotline: **+1 (800) 555-9111**. Nearest ER: SmartHospital Central (1.2 miles away).",
        agent: "Emergency Agent",
        trace: ["Main Hospital Agent", "Emergency Agent"]
      };
    } else if (q.includes('hours') || q.includes('visiting') || q.includes('faq') || q.includes('pharmacy') || q.includes('timing') || q.includes('location')) {
      return {
        reply: "🏥 **[Hospital FAQ Agent]**: SmartHospital Central OPD Hours: **08:00 AM - 08:00 PM**. Emergency & 24/7 Pharmacy are open round-the-clock. Visiting Hours: **10:00 AM - 01:00 PM & 04:00 PM - 08:00 PM**.",
        agent: "Hospital FAQ Agent",
        trace: ["Main Hospital Agent", "Hospital FAQ Agent"]
      };
    } else {
      return {
        reply: "🩺 **[Main Hospital Agent]**: Thank you for contacting SmartHospital AI. I can assist you with booking doctor appointments, checking prescription interactions, downloading invoices, or emergency triage. How can I help you?",
        agent: "Main Hospital Agent",
        trace: ["Main Hospital Agent"]
      };
    }
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const newHistory = [...messages, { role: 'user', content: query }];
    setMessages(newHistory);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await apiService.sendSwarmChat(
        query,
        activeAgent,
        newHistory.map(m => ({ role: m.role, content: m.content }))
      );

      const assistantReply = res.data.response || "How else can I assist you with your health today?";
      const nextAgentName = res.data.active_agent || activeAgentName;
      const handoffs = res.data.handoff_history || [nextAgentName];

      setActiveAgentName(nextAgentName);

      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: assistantReply,
          activeAgent: nextAgentName,
          handoffHistory: handoffs
        }
      ]);
    } catch (err) {
      const fallback = getFallbackResponse(query);
      setActiveAgentName(fallback.agent);

      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: fallback.reply,
          activeAgent: fallback.agent,
          handoffHistory: fallback.trace
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const agentChips = [
    { label: "Book Doctor Slot", query: "Book a cardiology appointment with Dr. Sarah Jenkins for tomorrow.", agent: "appointment" },
    { label: "Check Drug Interaction", query: "Can I take Aspirin 81mg together with OTC Ibuprofen?", agent: "prescription" },
    { label: "Insurance & Invoice", query: "What is my insurance co-pay for my recent lab invoice?", agent: "billing" },
    { label: "Summarize Reports", query: "Summarize my recent blood work and lipid panel results.", agent: "medical" },
    { label: "ER Triage Help", query: "I feel chest pressure and shortness of breath.", agent: "emergency" },
    { label: "Hospital FAQs", query: "What are the hospital visiting hours and pharmacy timings?", agent: "faq" }
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col medical-card overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-4 sm:p-5 glass-nav border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-apolloBlue to-teal-400 flex items-center justify-center text-white shadow-md shadow-apolloBlue/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-slate-800 dark:text-slate-100">AI Swarm Medical Assistant</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                8 Agents Active
              </span>
            </div>
            <p className="text-xs font-semibold text-apolloBlue dark:text-blue-300">
              Active Agent: {activeAgentName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMessages([])} 
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Suggested:</span>
        {agentChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveAgent(chip.agent);
              handleSendMessage(chip.query);
            }}
            className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-apolloBlue hover:text-apolloBlue whitespace-nowrap transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Messages Stream Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-medicalBg/50 dark:bg-slate-900/50">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-apolloBlue text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                
                {/* Handoff Trace Badge */}
                {!isUser && m.handoffHistory && m.handoffHistory.length > 1 && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-apolloBlue dark:text-blue-300 border border-blue-200/60 text-[10px] font-bold">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Swarm Trace: {m.handoffHistory.join(' → ')}</span>
                  </div>
                )}

                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  isUser 
                    ? 'bg-apolloBlue text-white font-medium rounded-tr-none shadow-md shadow-apolloBlue/10' 
                    : 'medical-card text-slate-800 dark:text-slate-100 rounded-tl-none font-sans whitespace-pre-line'
                }`}>
                  {m.content}
                </div>

                {!isUser && (
                  <button 
                    onClick={() => speakText(m.content)} 
                    className="text-[10px] font-bold text-slate-400 hover:text-apolloBlue flex items-center gap-1 pt-0.5"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Stop Audio' : 'Listen Speech'}</span>
                  </button>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-apolloBlue text-white flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl medical-card text-xs font-semibold text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-apolloBlue animate-ping"></span>
              <span>OpenAI Swarm Agents evaluating request...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Controller Footer */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }} 
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-2xl transition-colors ${
              isListening 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title="Speech to Text Voice Input"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            placeholder={isListening ? "Listening... Speak your query..." : "Ask appointment, prescriptions, billing, symptoms, ER..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 text-xs rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-apolloBlue/50 text-slate-800 dark:text-slate-100"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="p-3 rounded-2xl bg-apolloBlue hover:bg-blue-700 text-white shadow-md shadow-apolloBlue/20 disabled:opacity-50 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
