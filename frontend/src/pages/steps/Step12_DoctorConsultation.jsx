import React from 'react';
import { Stethoscope, Pill, FileSpreadsheet, ArrowRight } from 'lucide-react';

export default function Step12_DoctorConsultation({ onNavigate }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <Stethoscope className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-white">Doctor EHR Consultation Entry</h4>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="text-slate-400 block font-semibold mb-1">Clinical Diagnosis</label>
            <input type="text" readOnly value="Acute Anterior ST-Elevation Myocardial Infarction (STEMI)" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-semibold" />
          </div>
          <div>
            <label className="text-slate-400 block font-semibold mb-1">E-Prescribed Medications</label>
            <input type="text" readOnly value="Aspirin 81mg (Daily) + Clopidogrel 75mg (Daily)" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-teal-300 font-semibold" />
          </div>
          <div>
            <label className="text-slate-400 block font-semibold mb-1">Ordered Lab Tests</label>
            <input type="text" readOnly value='["Coronary Angiography", "Lipid Profile"]' className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-300 font-mono" />
          </div>
        </div>
      </div>

      <button 
        onClick={() => onNavigate(13)} 
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center"
      >
        Run AI Pharmacy Safety Agent <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
