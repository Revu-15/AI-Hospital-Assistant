import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, FileText, Pill, CreditCard, Activity, 
  Clock, Shield, Plus, ChevronRight, Bot, Upload, AlertCircle, CheckCircle2
} from 'lucide-react';
import { apiService } from '../api/client';

export default function PatientDashboard({ onNavigate, currentUser }) {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profRes, apptRes, timeRes, prescRes] = await Promise.allSettled([
          apiService.getPatientProfile(),
          apiService.getAppointments(),
          apiService.getHealthTimeline(),
          apiService.getPrescriptions()
        ]);

        if (profRes.status === 'fulfilled') setProfile(profRes.value.data.patient);
        if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data.appointments || []);
        if (timeRes.status === 'fulfilled') setTimeline(timeRes.value.data.timeline || []);
        if (prescRes.status === 'fulfilled') setPrescriptions(prescRes.value.data.prescriptions || []);
      } catch (err) {
        console.log('Dashboard fetch fallback');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const healthVitals = [
    { label: "Blood Pressure", val: "120/80 mmHg", status: "Optimal", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Heart Rate", val: "72 bpm", status: "Normal Sinus", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40" },
    { label: "Blood Glucose", val: "95 mg/dL", status: "Fasting Normal", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" },
    { label: "SpO2 Saturation", val: "99%", status: "Excellent", color: "text-apolloBlue bg-blue-50 dark:bg-blue-950/40" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Patient Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-apolloBlue to-teal-600 text-white p-6 sm:p-8 shadow-lg shadow-apolloBlue/15">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200">Patient Health Portal</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, {currentUser?.full_name || profile?.full_name || 'Revanth Polamreddy'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Insurance Status: <strong className="text-white">{profile?.insurance_provider || 'Star Health Care'}</strong> (Policy #{profile?.insurance_policy_number || 'POL-9842019'}). Your 80% outpatient co-pay is active.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onNavigate('appointments')}
              className="px-4 py-2.5 rounded-xl bg-white text-apolloBlue font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
            >
              + Book Appointment
            </button>
            <button 
              onClick={() => onNavigate('chat')}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md transition-colors flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthVitals.map((v, i) => (
          <div key={i} className="medical-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{v.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.color}`}>
                {v.status}
              </span>
            </div>
            <p className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{v.val}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Appointments & Prescriptions */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 medical-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-apolloBlue" />
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Upcoming Appointments</h3>
            </div>
            <button 
              onClick={() => onNavigate('appointments')}
              className="text-xs font-bold text-apolloBlue hover:underline"
            >
              Manage All
            </button>
          </div>

          <div className="space-y-3">
            {appointments.length > 0 ? (
              appointments.slice(0, 2).map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-apolloBlue font-bold flex flex-col items-center justify-center text-xs">
                      <span>{a.date ? a.date.split('-')[2] || '01' : '01'}</span>
                      <span className="text-[9px] uppercase">AUG</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{a.doctor_name || 'Dr. Sarah Jenkins'}</h4>
                      <p className="text-xs font-medium text-apolloBlue">{a.department || 'Cardiology Consultation'}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Time: {a.time || '10:30 AM'} • Token: {a.token_number || 'TK-CARD-892'}</p>
                    </div>
                  </div>

                  <span className="self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    Confirmed
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">No scheduled appointments.</p>
            )}
          </div>
        </div>

        {/* Active Medications Quick Card */}
        <div className="medical-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Active Regimen</h3>
            </div>
            <button 
              onClick={() => onNavigate('prescriptions')}
              className="text-xs font-bold text-apolloBlue hover:underline"
            >
              View Regimen
            </button>
          </div>

          <div className="space-y-3">
            {prescriptions.slice(0, 2).map((p, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{p.medication_name || 'Aspirin 81mg'}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {p.ai_safety_status || 'APPROVED'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{p.dosage || '1 Tablet Daily'}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Health Activity Timeline */}
      <div className="medical-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Health History Timeline</h3>
          <button onClick={() => onNavigate('medical-records')} className="text-xs font-bold text-apolloBlue hover:underline">
            View All Reports
          </button>
        </div>

        <div className="space-y-4">
          {timeline.map((item) => (
            <div key={item.id} className="flex gap-4 items-start border-l-2 border-apolloBlue pl-4 py-1">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">{item.date}</span>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-0.5">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.summary}</p>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-apolloBlue mt-2">
                  {item.doctor} • {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
