import React from 'react';
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Step16_DischargeSummary({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl text-xs">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <FileText className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-white">AI-Generated Patient Clinical Discharge Summary</h4>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2 leading-relaxed text-slate-200">
          <p><strong className="text-teal-400">Diagnosis:</strong> Acute Anterior Myocardial Infarction. Successfully stabilized.</p>
          <p><strong className="text-teal-400">Discharge Meds:</strong> Aspirin 81mg daily + Atorvastatin 20mg nightly.</p>
          <p><strong className="text-teal-400">Recovery Instructions:</strong> Low-sodium cardiac diet. Avoid strenuous physical activity for 14 days.</p>
          <p><strong className="text-teal-400">Next Appointment:</strong> Follow-up with Dr. Sarah Jenkins in 7 days.</p>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(17)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Schedule Automated Post-Care Follow-up <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
