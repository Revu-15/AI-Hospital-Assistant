import React from 'react';
import { Building2, ArrowRight, MapPin } from 'lucide-react';

export default function Step6_DeptRecommendation({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <h4 className="text-sm font-bold text-white uppercase">Recommended Hospital Department</h4>
          </div>
          <span className="text-xs bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full font-mono border border-teal-500/30">
            Primary Match (98%)
          </span>
        </div>

        <div>
          <div className="flex items-center space-x-2 text-xs text-teal-400 font-bold mb-1">
            <MapPin className="w-4 h-4" /> Floor 3, Building A • Cardiac Care Block
          </div>
          <h3 className="text-2xl font-bold text-white">Department of Cardiology</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Equipped with 24/7 cardiac catheterization labs, ECG telemetry monitoring, and specialized interventional cardiologists.
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 block font-semibold mb-1">Alternative Fallback Department:</span>
          <p className="text-slate-200">Emergency Medicine (Ground Floor Trauma Center)</p>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(7)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Find & Match Specialist Doctors <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
