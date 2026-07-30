import React from 'react';
import { Bell, CheckCircle2, RotateCcw } from 'lucide-react';

export default function Step17_FollowupAgent({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/10">
          <Bell className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Automated Care Reminders Scheduled</span>
          <h3 className="text-2xl font-bold text-white mt-1">Patient Follow-up Active</h3>
          <p className="text-xs text-slate-300 mt-2">
            SMS & Email reminders set for Daily Medication (8:00 PM) and Doctor Re-consultation (In 7 Days).
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-teal-300 font-mono">
          "Hi Jane, remember to take Aspirin 81mg with dinner tonight. How are your symptoms today?"
        </div>
      </div>

      <button 
        onClick={() => onNavigate(1)} 
        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition flex items-center justify-center"
      >
        <RotateCcw className="w-4 h-4 mr-2" /> Restart Workflow Demo (Step 1)
      </button>
    </div>
  );
}
