import React from 'react';
import { CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Step14_BillingAgent({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-teal-400" />
            <h4 className="text-sm font-bold text-white">Itemized Invoice & Co-Pay Breakdown</h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">INV-2026-9041</span>
        </div>

        <div className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400">Consultation Fee</span>
          <span className="text-white font-mono">$150.00</span>
        </div>
        <div className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400">Pharmacy & Medications</span>
          <span className="text-white font-mono">$45.00</span>
        </div>
        <div className="flex justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400">Lab & Angiography Test</span>
          <span className="text-white font-mono">$200.00</span>
        </div>
        <div className="flex justify-between font-bold text-sm text-teal-400 pt-1">
          <span>BlueCross Insurance Cover (80%)</span>
          <span>-$316.00</span>
        </div>
        <div className="flex justify-between font-bold text-base text-white border-t border-slate-700 pt-2">
          <span>Patient Payable Co-Pay</span>
          <span className="text-emerald-400 font-mono">$79.00</span>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(15)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        View Hospital Admin Analytics Dashboard <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
