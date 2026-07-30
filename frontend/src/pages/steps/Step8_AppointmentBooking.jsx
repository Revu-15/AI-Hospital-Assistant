import React from 'react';
import { CalendarCheck, CheckCircle2, Ticket, ArrowRight } from 'lucide-react';

export default function Step8_AppointmentBooking({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Appointment Booking Confirmed</span>
          <h3 className="text-3xl font-extrabold text-teal-400 font-mono mt-1">TK-CARD-884</h3>
          <p className="text-xs text-slate-300 mt-2 font-medium">
            Doctor: Dr. Sarah Jenkins | Slot: 10:30 AM Tomorrow | Room 302
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
          SMS & Email Confirmation alerts queued for patient (+1987654321).
        </div>
      </div>

      <button 
        onClick={() => onNavigate(9)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Upload Medical PDF Reports for RAG <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
