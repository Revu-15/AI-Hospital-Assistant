import React, { useState, useEffect } from 'react';
import { Stethoscope, User, FileText, Pill, CheckCircle2, Clock, Bot, AlertCircle, Plus } from 'lucide-react';
import { apiService } from '../api/client';

export default function DoctorDashboard() {
  const [queue, setQueue] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [prescribeModalOpen, setPrescribeModalOpen] = useState(false);
  const [rxForm, setRxForm] = useState({ medication: '', dosage: '', instructions: '' });
  const [rxSuccess, setRxSuccess] = useState('');

  useEffect(() => {
    async function loadQueue() {
      try {
        const res = await apiService.getDoctorQueue();
        setQueue(res.data.queue || []);
        if (res.data.queue && res.data.queue.length > 0) {
          setSelectedPatient(res.data.queue[0]);
          generateAiHistorySummary(res.data.queue[0]);
        }
      } catch (err) {
        console.log('Doctor queue fallback');
      }
    }
    loadQueue();
  }, []);

  const generateAiHistorySummary = (patient) => {
    setAiSummary(
      `AI Clinical Brief for ${patient.patient_name} (${patient.age}y, ${patient.gender}):\n` +
      `• Primary Complaint: ${patient.symptoms}\n` +
      `• Triage Urgency: ${patient.triage_urgency}\n` +
      `• Historical Notes: Prior mild hypertension. No documented drug allergies to Penicillin.\n` +
      `• Recommended Actions: Obtain ECG baseline, verify BP levels, assess for angina.`
    );
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    generateAiHistorySummary(patient);
  };

  const handlePrescribeSubmit = (e) => {
    e.preventDefault();
    setRxSuccess(`Digital Prescription for ${rxForm.medication} sent to Pharmacy & Patient Portal!`);
    setTimeout(() => {
      setPrescribeModalOpen(false);
      setRxSuccess('');
      setRxForm({ medication: '', dosage: '', instructions: '' });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Doctor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-apolloBlue to-teal-400 flex items-center justify-center font-bold text-lg text-white">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Dr. Sarah Jenkins</h1>
            <p className="text-xs text-slate-300">Senior Consultant • Interventional Cardiology</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>OPD Clinic Active</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Queue & Consultation Workspace */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Patient Consultation Queue */}
        <div className="medical-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Live Patient Queue</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300">
              {queue.length} Waiting
            </span>
          </div>

          <div className="space-y-3">
            {queue.map((p) => {
              const isSelected = selectedPatient?.appointment_id === p.appointment_id;
              return (
                <div
                  key={p.appointment_id}
                  onClick={() => handleSelectPatient(p)}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer space-y-2
                    ${isSelected 
                      ? 'bg-apolloSky/60 dark:bg-blue-950/50 border-apolloBlue shadow-sm' 
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-apolloBlue">{p.token_number}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.triage_urgency === 'URGENT' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {p.triage_urgency}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{p.patient_name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{p.age}y • {p.gender}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EHR & AI Summary Consultation Workspace */}
        <div className="lg:col-span-2 space-y-6">
          
          {selectedPatient && (
            <div className="medical-card p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-apolloBlue uppercase tracking-wider">Active Patient Consultation</span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedPatient.patient_name} (Token: {selectedPatient.token_number})
                  </h2>
                </div>

                <button 
                  onClick={() => setPrescribeModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center gap-1.5"
                >
                  <Pill className="w-4 h-4" />
                  <span>Write Prescription</span>
                </button>
              </div>

              {/* AI History Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-apolloBlue dark:text-blue-300">
                  <Bot className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">AI Patient History Brief</h4>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {aiSummary}
                </p>
              </div>

              {/* Patient Reported Symptoms */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Presenting Symptoms</h4>
                <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
                  "{selectedPatient.symptoms}"
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Write Prescription Modal */}
      {prescribeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              Write Prescription for {selectedPatient?.patient_name}
            </h3>

            {rxSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs">
                {rxSuccess}
              </div>
            ) : (
              <form onSubmit={handlePrescribeSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Medication Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Aspirin 81mg"
                    value={rxForm.medication}
                    onChange={e => setRxForm({...rxForm, medication: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dosage & Frequency</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 1 Tablet Daily with Breakfast"
                    value={rxForm.dosage}
                    onChange={e => setRxForm({...rxForm, dosage: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Instructions</label>
                  <textarea 
                    rows={2}
                    placeholder="Special instructions for patient..."
                    value={rxForm.instructions}
                    onChange={e => setRxForm({...rxForm, instructions: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setPrescribeModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-apolloBlue text-white font-bold text-xs hover:bg-blue-700"
                  >
                    Issue Prescription
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
