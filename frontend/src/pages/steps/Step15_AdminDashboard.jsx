import React from 'react';
import { BarChart3, Users, Stethoscope, DollarSign, Activity, ArrowRight } from 'lucide-react';

export default function Step15_AdminDashboard({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-white">Real-Time Hospital Performance Analytics</h4>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Patients Registered</span>
          <span className="text-xl font-bold text-teal-400">142</span>
        </div>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Active Doctors</span>
          <span className="text-xl font-bold text-emerald-400">18</span>
        </div>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Gross Revenue</span>
          <span className="text-xl font-bold text-cyan-400">$42,850.00</span>
        </div>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">AI Triage Accuracy</span>
          <span className="text-xl font-bold text-amber-400">96.4%</span>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(16)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Generate AI Discharge Summary <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
