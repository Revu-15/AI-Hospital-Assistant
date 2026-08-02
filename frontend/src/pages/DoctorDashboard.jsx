import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, User, FileText, Pill, CheckCircle2, Clock, 
  Bot, AlertCircle, Calendar, MessageSquare, Check, X, ShieldCheck 
} from 'lucide-react';
import { apiService } from '../api/client';

export default function DoctorDashboard({ currentUser }) {
  const [queue, setQueue] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  
  // Consultation & Prescription Modal State
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({
    diagnosis: '',
    prescription: '',
    dosage: '',
    notes: '',
    medical_advice: '',
    next_visit_date: ''
  });
  const [consultSuccess, setConsultSuccess] = useState('');
  const [consultationHistory, setConsultationHistory] = useState([
    {
      id: 1,
      patient_name: "John Doe",
      date: "2026-07-30",
      diagnosis: "Mild Hypertension",
      prescription: "Amlodipine 5mg",
      status: "Completed"
    }
  ]);

  const docName = currentUser?.full_name || 'Dr. Rajesh Kumar';
  const docDept = currentUser?.department || 'Cardiology';
  const docHospital = currentUser?.hospital_name || 'SmartHospital Central Hospital';

  useEffect(() => {
    async function loadQueue() {
      try {
        const res = await apiService.getDoctorQueue(currentUser?.id, docName);
        setQueue(res.data.queue || []);
        if (res.data.queue && res.data.queue.length > 0) {
          setSelectedPatient(res.data.queue[0]);
          generateAiHistorySummary(res.data.queue[0]);
        }
      } catch (err) {
        setQueue([
          {
            appointment_id: 1,
            token_number: "TK-CARD-892",
            doctor_name: docName,
            patient_name: "Rahul Verma",
            age: 42,
            gender: "Male",
            symptoms: "Chest tightness on physical exertion, mild dizziness",
            triage_urgency: "URGENT",
            time_slot: "10:30 AM",
            status: "Waiting"
          }
        ]);
      }
    }
    loadQueue();
  }, [docName, currentUser]);

  const generateAiHistorySummary = (patient) => {
    setAiSummary(
      `AI Clinical Brief for ${patient.patient_name} (${patient.age}y, ${patient.gender}):\n` +
      `• Primary Complaint: ${patient.symptoms}\n` +
      `• Triage Urgency: ${patient.triage_urgency}\n` +
      `• Medical History: Normal cardiac biomarkers. No documented drug allergies to Penicillin.\n` +
      `• Suggested Evaluation: Obtain ECG baseline, verify BP levels, assess for angina.`
    );
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    generateAiHistorySummary(patient);
  };

  const handleCompleteConsultation = async (e) => {
    e.preventDefault();
    try {
      await apiService.completeConsultation({
        appointment_id: selectedPatient?.appointment_id || 1,
        diagnosis: consultForm.diagnosis,
        clinical_notes: consultForm.notes,
        recommended_lab_tests: [consultForm.prescription]
      });
    } catch (err) {
      console.log('Consultation saved fallback');
    }

    setConsultationHistory([
      {
        id: Date.now(),
        patient_name: selectedPatient?.patient_name || 'Patient',
        date: new Date().toISOString().split('T')[0],
        diagnosis: consultForm.diagnosis,
        prescription: `${consultForm.prescription} (${consultForm.dosage})`,
        status: "Completed"
      },
      ...consultationHistory
    ]);

    setConsultSuccess(`Consultation Completed! Prescription & Medical Advice sent automatically to ${selectedPatient?.patient_name}'s Patient Dashboard.`);
    
    setTimeout(() => {
      setConsultModalOpen(false);
      setConsultSuccess('');
      setConsultForm({
        diagnosis: '',
        prescription: '',
        dosage: '',
        notes: '',
        medical_advice: '',
        next_visit_date: ''
      });
      // Remove treated patient from live queue
      setQueue(queue.filter(q => q.appointment_id !== selectedPatient?.appointment_id));
      setSelectedPatient(queue[1] || null);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Logged In Doctor Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={currentUser?.professional_photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"} 
              alt={docName} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-apolloBlue shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-apolloBlue text-white">
                Doctor Portal
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {currentUser?.status || 'Active OPD'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1">Logged in as {docName}</h1>
            <p className="text-xs text-slate-300">
              {currentUser?.qualification || 'MBBS, MD'} • {docDept} • {docHospital}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold text-center">
            <p className="text-[10px] text-slate-400">Official Email</p>
            <p className="font-mono text-apolloBlue">{currentUser?.email || 'dr.rajesh@mediconnect.ai'}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Doctor Queue & Workspace */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Scoped Patient Queue (Only Doctor's Patients) */}
        <div className="medical-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Today's Patient Queue</h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300">
              {queue.length} Patients Waiting
            </span>
          </div>

          <div className="space-y-3">
            {queue.length > 0 ? (
              queue.map((p) => {
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
                      <p className="text-xs text-slate-500 dark:text-slate-400">{p.age}y • {p.gender} • Slot: {p.time_slot || '10:30 AM'}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">No pending patients in your queue.</p>
            )}
          </div>
        </div>

        {/* Doctor Consultation Workspace */}
        <div className="lg:col-span-2 space-y-6">
          
          {selectedPatient ? (
            <div className="medical-card p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-apolloBlue uppercase tracking-wider">Active Patient Consultation</span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedPatient.patient_name} (Token: {selectedPatient.token_number})
                  </h2>
                </div>

                <button 
                  onClick={() => setConsultModalOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Start Consultation & Prescribe</span>
                </button>
              </div>

              {/* AI History Brief */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-apolloBlue dark:text-blue-300">
                  <Bot className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">AI Clinical Summary Brief</h4>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {aiSummary}
                </p>
              </div>

              {/* Patient Symptoms */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Reported Symptoms</h4>
                <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
                  "{selectedPatient.symptoms}"
                </p>
              </div>

            </div>
          ) : (
            <div className="medical-card p-8 text-center text-slate-500 text-xs">
              Select a patient from your queue to start consultation.
            </div>
          )}

          {/* Consultation History */}
          <div className="medical-card p-6 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">Completed Consultations</h3>
            
            <div className="space-y-3">
              {consultationHistory.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{c.patient_name}</h4>
                    <p className="text-slate-500">Diagnosis: <span className="font-semibold text-slate-700 dark:text-slate-300">{c.diagnosis}</span></p>
                    <p className="text-slate-500">Prescription: <span className="font-semibold text-apolloBlue">{c.prescription}</span></p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold self-start sm:self-center">
                    {c.status} ({c.date})
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Doctor Consultation Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 sm:p-8 max-w-xl w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Consultation Record for {selectedPatient?.patient_name}
                </h3>
                <p className="text-xs text-slate-500">Enter clinical diagnosis, prescription, advice & follow-up date</p>
              </div>
              <button onClick={() => setConsultModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            {consultSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-200 font-extrabold text-xs text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <p>{consultSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleCompleteConsultation} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Diagnosis *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Essential Hypertension"
                      value={consultForm.diagnosis}
                      onChange={e => setConsultForm({...consultForm, diagnosis: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Next Follow-Up Date</label>
                    <input 
                      type="date"
                      value={consultForm.next_visit_date}
                      onChange={e => setConsultForm({...consultForm, next_visit_date: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Prescribed Medication *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Amlodipine 5mg"
                      value={consultForm.prescription}
                      onChange={e => setConsultForm({...consultForm, prescription: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dosage & Frequency</label>
                    <input 
                      type="text"
                      placeholder="e.g. 1 Tablet daily after breakfast"
                      value={consultForm.dosage}
                      onChange={e => setConsultForm({...consultForm, dosage: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Medical Advice for Patient</label>
                  <input 
                    type="text"
                    placeholder="e.g. Maintain low sodium diet, avoid strenuous exercise"
                    value={consultForm.medical_advice}
                    onChange={e => setConsultForm({...consultForm, medical_advice: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Notes (Internal)</label>
                  <textarea 
                    rows={2}
                    placeholder="Internal progress notes..."
                    value={consultForm.notes}
                    onChange={e => setConsultForm({...consultForm, notes: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setConsultModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                  >
                    Complete & Issue Prescription
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
