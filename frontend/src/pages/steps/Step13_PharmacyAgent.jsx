import React from 'react';
import { Pill, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export default function Step13_PharmacyAgent({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <Pill className="w-5 h-5 text-teal-400" />
            <h4 className="text-sm font-bold text-white">AI Drug Interaction & Safety Review</h4>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
            SAFETY STATUS: APPROVED
          </span>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
          <p><strong className="text-teal-400">Prescription:</strong> Aspirin 81mg + Clopidogrel 75mg (Dual Antiplatelet Therapy)</p>
          <p><strong className="text-teal-400">Dosage Instructions:</strong> Take 1 tablet daily after food with water.</p>
          <p className="text-amber-300"><strong className="text-amber-400">Warning Alert:</strong> Mild risk of increased bruising. Avoid non-prescribed NSAIDs like Ibuprofen.</p>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(14)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Calculate Billing & Insurance Co-Pay <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
