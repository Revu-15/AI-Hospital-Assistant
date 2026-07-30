import React from 'react';
import { Activity, Shield, Cpu, ArrowRight } from 'lucide-react';

export default function Step1_Landing({ onNavigate }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-950/60 via-slate-900 to-cyan-950/50 p-8 border border-teal-500/30 shadow-2xl">
        <div className="w-16 h-16 bg-teal-500/20 border border-teal-400/40 rounded-2xl flex items-center justify-center mx-auto mb-5 text-teal-400 shadow-lg shadow-teal-500/20">
          <Activity className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-3xl font-extrabold text-white text-center mb-3">
          Hospital Agentic AI Portal
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto text-center mb-8 leading-relaxed">
          Autonomous multi-agent clinical triage, medical report RAG analysis, specialist doctor matching, and continuous post-care follow-up.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center hover:border-teal-500/40 transition">
            <span className="text-2xl block mb-1">📱</span>
            <div className="text-teal-400 font-bold text-sm">Mobile PWA</div>
            <p className="text-[11px] text-slate-400">Patient Remote Access</p>
          </div>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 hover:border-teal-500/40 transition text-center">
            <span className="text-2xl block mb-1">💻</span>
            <div className="text-emerald-400 font-bold text-sm">Web Dashboard</div>
            <p className="text-[11px] text-slate-400">Full EHR Management</p>
          </div>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 hover:border-teal-500/40 transition text-center">
            <span className="text-2xl block mb-1">🖥️</span>
            <div className="text-cyan-400 font-bold text-sm">Hospital Kiosk</div>
            <p className="text-[11px] text-slate-400">Touchscreen Entry</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => onNavigate(2)} 
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 transition flex items-center"
          >
            Start Patient Registration <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button 
            onClick={() => onNavigate(4)} 
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold rounded-xl transition flex items-center"
          >
            Emergency AI Triage
          </button>
        </div>
      </div>
    </div>
  );
}
