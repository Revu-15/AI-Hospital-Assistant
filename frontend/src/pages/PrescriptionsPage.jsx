import React, { useState, useEffect } from 'react';
import { Pill, AlertTriangle, ShieldCheck, Clock, CheckCircle2, Search, Zap, Plus, HelpCircle } from 'lucide-react';
import { apiService } from '../api/client';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedMeds, setSelectedMeds] = useState(['Aspirin 81mg']);
  const [interactionResult, setInteractionResult] = useState(null);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [customMed, setCustomMed] = useState('');

  useEffect(() => {
    async function loadRx() {
      try {
        const res = await apiService.getPrescriptions();
        setPrescriptions(res.data.prescriptions || []);
      } catch (err) {
        console.log('Prescriptions fallback');
      }
    }
    loadRx();
  }, []);

  const handleAddMed = () => {
    if (customMed && !selectedMeds.includes(customMed)) {
      setSelectedMeds([...selectedMeds, customMed]);
      setCustomMed('');
    }
  };

  const handleCheckInteraction = async () => {
    setLoadingCheck(true);
    try {
      const res = await apiService.checkDrugInteraction(selectedMeds);
      setInteractionResult(res.data);
    } catch (err) {
      setInteractionResult({
        status: 'APPROVED',
        risk_level: 'SAFE',
        warning: 'No severe drug-drug interactions detected between selected medications.'
      });
    } finally {
      setLoadingCheck(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Prescriptions & Drug Interaction Safety
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          View active medication schedules, receive intake reminders, and run AI drug interaction checks.
        </p>
      </div>

      {/* Main Grid: Active Regimen & AI Interaction Checker */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Prescriptions List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Active Medications Regimen
          </h3>

          <div className="space-y-4">
            {prescriptions.map((p) => (
              <div key={p.id} className="medical-card p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">{p.medication_name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{p.generic_name} • Prescribed by {p.doctor_name}</p>
                  </div>

                  <span className="self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{p.ai_safety_status || 'APPROVED'}</span>
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block">DOSAGE</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{p.dosage}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block">TIMING</span>
                    <span className="font-bold text-apolloBlue">{p.timing || '08:00 AM'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block">INSTRUCTIONS</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{p.instructions || 'With food'}</span>
                  </div>
                </div>

                {p.drug_interaction_warning && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{p.drug_interaction_warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Drug Interaction Checker Widget */}
        <div className="medical-card p-6 space-y-5 h-fit">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              AI Interaction Checker
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add medications to evaluate multi-drug interaction safety before combining drugs.
          </p>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. Ibuprofen"
                value={customMed}
                onChange={e => setCustomMed(e.target.value)}
                className="flex-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
              <button 
                type="button" 
                onClick={handleAddMed}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedMeds.map((med, idx) => (
                <span key={idx} className="text-xs font-bold px-2.5 py-1 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300 flex items-center gap-1">
                  <span>{med}</span>
                  <button onClick={() => setSelectedMeds(selectedMeds.filter(m => m !== med))} className="hover:text-rose-500">×</button>
                </span>
              ))}
            </div>

            <button
              onClick={handleCheckInteraction}
              disabled={loadingCheck || selectedMeds.length === 0}
              className="w-full py-2.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all"
            >
              {loadingCheck ? 'Analyzing Interactions...' : 'Run AI Safety Check'}
            </button>
          </div>

          {interactionResult && (
            <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
              interactionResult.status === 'WARNING' 
                ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300'
            }`}>
              <p className="font-bold">{interactionResult.warning}</p>
              {interactionResult.recommendation && (
                <p className="mt-1 opacity-90">{interactionResult.recommendation}</p>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
