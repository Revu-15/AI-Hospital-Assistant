import React from 'react';
import { AlertTriangle, Brain, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Step5_SymptomAnalysis({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl text-red-200 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
            <div>
              <h4 className="text-lg font-bold text-red-400">CRITICAL TRIAGE RESULT: EMERGENCY</h4>
              <p className="text-xs text-red-300">Triage Code: RED-1 | Confidence Score: 96.4%</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-red-500 text-slate-950 font-extrabold text-xs rounded-full uppercase">
            Immediate Action Required
          </span>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-xl border border-red-500/20 text-xs space-y-2">
          <p><strong className="text-red-400">Extracted Symptoms:</strong> Acute chest pain, dyspnea (shortness of breath), diaphoresis.</p>
          <p><strong className="text-red-400">Clinical Justification:</strong> Acute retrosternal pain with dyspnea suggests potential Myocardial Infarction or ACS.</p>
        </div>

        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-[11px]">
          ⚠️ <strong>FDA Medical Disclaimer:</strong> AI Triage provides decision support only. If you experience severe symptoms, call emergency services immediately.
        </div>
      </div>

      <button 
        onClick={() => onNavigate(6)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Proceed to Department Routing <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
