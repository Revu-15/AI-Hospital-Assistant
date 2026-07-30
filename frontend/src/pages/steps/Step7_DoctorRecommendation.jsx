import React from 'react';
import { UserCheck, Star, Calendar, ArrowRight } from 'lucide-react';

export default function Step7_DoctorRecommendation({ onNavigate }) {
  const doctors = [
    {
      id: 101,
      name: "Dr. Sarah Jenkins, MD",
      specialty: "Interventional Cardiology",
      experience: "15 Years Exp.",
      rating: 4.95,
      slots: ["10:30 AM", "11:15 AM", "02:00 PM"]
    },
    {
      id: 104,
      name: "Dr. Marcus Vance, MD",
      specialty: "Cardiovascular Specialist",
      experience: "12 Years Exp.",
      rating: 4.88,
      slots: ["11:00 AM", "01:30 PM", "03:45 PM"]
    }
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Top Cardiology Specialists Matched</h4>

      {doctors.map(doc => (
        <div key={doc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between hover:border-teal-500/40 transition">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center font-bold text-teal-300">
              {doc.name.split(' ')[1][0]}{doc.name.split(' ')[2]?.[0] || 'M'}
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">{doc.name}</h5>
              <p className="text-[11px] text-slate-400">{doc.specialty} • {doc.experience}</p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="flex items-center text-amber-400 text-xs font-bold justify-end">
              <Star className="w-3.5 h-3.5 fill-current mr-1" /> {doc.rating}
            </div>
            <button 
              onClick={() => onNavigate(8)}
              className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition"
            >
              Select Slot 10:30 AM
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
