import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Stethoscope, DollarSign, Activity, Download, Layers } from 'lucide-react';
import apiClient from '../api/client';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    total_patients_registered: 142,
    active_specialist_doctors: 18,
    completed_consultations: 76,
    gross_revenue: "$42,850.00",
    bed_occupancy_rate: "78%",
    agent_triage_accuracy: "96.4%"
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await apiClient.get('/admin/analytics');
        if (res.data.hospital_metrics) setMetrics(res.data.hospital_metrics);
      } catch (err) {}
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Executive Analytics</span>
          <h2 className="text-2xl font-extrabold text-slate-900">Hospital Operations & Revenue</h2>
        </div>
        <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="medical-card p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Total Patients Registered</span>
          <span className="text-3xl font-extrabold text-slate-900">{metrics.total_patients_registered}</span>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ +14% this month</span>
        </div>

        <div className="medical-card p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Active Specialist Doctors</span>
          <span className="text-3xl font-extrabold text-sky-600">{metrics.active_specialist_doctors}</span>
          <span className="text-[10px] text-slate-500 block">Across 4 Departments</span>
        </div>

        <div className="medical-card p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Gross Revenue</span>
          <span className="text-3xl font-extrabold text-emerald-600">{metrics.gross_revenue}</span>
          <span className="text-[10px] text-emerald-600 font-bold block">80% Insurance Co-Pay</span>
        </div>

        <div className="medical-card p-5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">AI Triage Accuracy</span>
          <span className="text-3xl font-extrabold text-indigo-600">{metrics.agent_triage_accuracy}</span>
          <span className="text-[10px] text-sky-600 font-bold block">Llama-3 8B Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="medical-card p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Layers className="w-5 h-5 text-sky-500 mr-2" /> Department Patient Volume Share
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Cardiology</span>
                <span className="text-sky-600 font-bold">38% (54 Patients)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-sky-500 h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Emergency Medicine</span>
                <span className="text-emerald-600 font-bold">28% (40 Patients)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Neurology</span>
                <span className="text-indigo-600 font-bold">20% (28 Patients)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="medical-card p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <Activity className="w-5 h-5 text-emerald-500 mr-2" /> AI Subsystem Throughput
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Symptom Triage Subsystem</span>
                <span className="text-slate-500">Avg Latency: 320ms</span>
              </div>
              <span className="font-mono font-bold text-sky-600">1,420 Requests</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 block">Medical Report RAG Search</span>
                <span className="text-slate-500">FAISS Similarity Store</span>
              </div>
              <span className="font-mono font-bold text-indigo-600">890 Queries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
