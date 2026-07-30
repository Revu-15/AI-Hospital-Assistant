import React from 'react';
import { QrCode, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Step11_KioskCheckin({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
        <div className="bg-white p-4 rounded-2xl inline-block shadow-xl mx-auto border-4 border-teal-500/40">
          <QrCode className="w-28 h-28 text-slate-950" />
        </div>
        <div>
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Status: Checked-In</span>
          <h3 className="text-2xl font-bold text-white mt-1">Ticket #TK-CARD-884</h3>
          <p className="text-xs text-slate-400 mt-1">Queue Position: #3 | Estimated Wait: 15 Mins</p>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(12)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Doctor EHR Consultation Interface <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
