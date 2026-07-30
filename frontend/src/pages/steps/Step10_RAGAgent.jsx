import React, { useState } from 'react';
import { Search, Sparkles, Database, ArrowRight } from 'lucide-react';
import apiClient from '../../api/client';

export default function Step10_RAGAgent({ onNavigate }) {
  const [question, setQuestion] = useState("What are my troponin levels and key findings in the report?");
  const [answer, setAnswer] = useState(
    "Based on the retrieved FAISS vector chunks from Cardiac_Lab_Report_2026.pdf:\n• Troponin T level: 0.14 ng/mL (Elevated, Ref: <0.01 ng/mL)\n• ECG: ST-segment elevation in leads V1-V4 indicating anterior STEMI.\n• Blood Pressure: 145/90 mmHg | Heart Rate: 98 bpm."
  );

  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Ask AI About Uploaded PDF (RAG Query)</h4>
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            value={question} 
            onChange={e => setQuestion(e.target.value)} 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white" 
          />
          <button className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs">
            Query FAISS
          </button>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-line">
          {answer}
        </div>
      </div>

      <button 
        onClick={() => onNavigate(11)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Proceed to Hospital Kiosk Check-in <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
