import React, { useState, useEffect } from 'react';
import { AlertTriangle, PhoneCall, MapPin, ShieldAlert, HeartHandshake, ChevronRight, Activity, Clock, Search, Building2 } from 'lucide-react';
import { apiService } from '../api/client';

export default function EmergencyPage() {
  const [emergencyData, setEmergencyData] = useState(null);
  const [symptomInput, setSymptomInput] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [loadingTriage, setLoadingTriage] = useState(false);

  // Hospital Search Directory State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hospitalsList, setHospitalsList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  useEffect(() => {
    async function loadEmergency() {
      try {
        const res = await apiService.getEmergencyData();
        setEmergencyData(res.data);
      } catch (err) {
        console.log('Emergency fallback');
      }
    }
    loadEmergency();
    loadDirectoryMeta();
    fetchHospitalsData('', '', '');
  }, []);

  const loadDirectoryMeta = async () => {
    try {
      const res = await apiService.getHospitalMeta();
      if (res.data?.states) setStatesList(res.data.states);
      if (res.data?.cities) setCitiesList(res.data.cities);
    } catch (err) {
      console.log('Hospital meta load fallback');
    }
  };

  const fetchHospitalsData = async (q, st, ct) => {
    setLoadingHospitals(true);
    try {
      const res = await apiService.searchHospitals(q, st, ct, 40);
      if (res.data?.hospitals) setHospitalsList(res.data.hospitals);
    } catch (err) {
      console.log('Hospital search error');
    } finally {
      setLoadingHospitals(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHospitalsData(searchQuery, selectedState, selectedCity);
  };

  const handleTriageSubmit = async (e) => {
    e.preventDefault();
    if (!symptomInput) return;
    setLoadingTriage(true);
    try {
      const res = await apiService.triageSymptoms(symptomInput);
      setTriageResult(res.data);
    } catch (err) {
      setTriageResult({
        status: 'EMERGENCY_CRITICAL',
        urgency: 'CRITICAL',
        action_required: 'CALL EMERGENCY SERVICES IMMEDIATELY',
        instructions: 'Do not attempt to drive. Keep patient seated, loosen tight clothing, and call 911 / Ambulance Hotline.'
      });
    } finally {
      setLoadingTriage(false);
    }
  };

  const firstAidSteps = emergencyData?.first_aid_guidelines || [
    {
      condition: "Chest Pain / Suspected Cardiac Event",
      steps: [
        "Call 911 / Emergency Ambulance Hotline (+1 800 555-9111) immediately.",
        "Sit or lie down in a comfortable position, slightly elevated.",
        "Loosen tight clothing around chest and neck.",
        "Chew one adult Aspirin (325mg) if advised by emergency responder and not allergic."
      ]
    },
    {
      condition: "Severe Bleeding / Trauma",
      steps: [
        "Apply direct firm pressure to the wound with a clean cloth or bandage.",
        "Elevate the injured limb above heart level if possible.",
        "Do not remove embedded objects; apply padding around them.",
        "Keep patient warm with a blanket until emergency paramedics arrive."
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* SOS Red Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white p-6 sm:p-8 shadow-xl shadow-rose-600/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>24/7 EMERGENCY TRIAGE & AMBULANCE DISPATCH</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Medical Emergency Assistance
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
              If experiencing severe chest pain, stroke symptoms, loss of consciousness, or uncontrollable bleeding, dispatch an ambulance immediately.
            </p>
          </div>

          <a 
            href="tel:+18005559111"
            className="px-6 py-4 rounded-2xl bg-white text-rose-600 font-extrabold text-sm hover:bg-rose-50 shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2.5 shrink-0 animate-pulse"
          >
            <PhoneCall className="w-5 h-5 fill-rose-600" />
            <span>Call Ambulance (+1 800 555-9111)</span>
          </a>
        </div>
      </div>

      {/* Main Grid: ER Symptom Evaluator & Nearest Hospitals */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Instant Emergency Symptom Evaluator */}
        <div className="lg:col-span-2 medical-card p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Activity className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              AI Emergency Symptom Evaluator
            </h3>
          </div>

          <form onSubmit={handleTriageSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Describe Acute Emergency Symptoms
              </label>
              <textarea 
                rows={3}
                required
                placeholder="e.g. Sudden onset chest tightness radiating to left arm, dizziness..."
                value={symptomInput}
                onChange={e => setSymptomInput(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loadingTriage}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{loadingTriage ? 'Analyzing Urgency...' : 'Evaluate ER Urgency'}</span>
            </button>
          </form>

          {triageResult && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white">
                {triageResult.urgency}
              </span>
              <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200">{triageResult.action_required}</h4>
              <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">{triageResult.instructions}</p>
            </div>
          )}

          {/* First Aid Guidelines Accordion */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
              Essential Emergency First Aid Guidance
            </h4>

            <div className="space-y-3">
              {firstAidSteps.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <h5 className="font-bold text-xs text-apolloBlue">{item.condition}</h5>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    {item.steps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nearest ER Hospitals List */}
        <div className="medical-card p-6 space-y-4 h-fit">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="w-5 h-5 text-apolloBlue" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              Nearest Hospital ERs
            </h3>
          </div>

          <div className="space-y-4">
            {(emergencyData?.nearest_hospitals || [
              {
                name: "SmartHospital Central Super-Specialty Hospital",
                distance_miles: "1.2 miles",
                address: "4th Block Main Road",
                er_hotline: "+1 (800) 555-9111",
                trauma_center_level: "Level 1 Trauma & Cardiac ICU"
              }
            ]).map((h, i) => (
              <div key={i} className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300">
                  {h.distance_miles} Away
                </span>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{h.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{h.address}</p>
                <p className="text-[11px] font-bold text-teal-600 dark:text-teal-400">{h.trauma_center_level}</p>

                <a 
                  href={`tel:${h.er_hotline}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call ER Hotline: {h.er_hotline}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 467+ Hospitals Search Directory */}
      <div className="medical-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-apolloSky text-apolloBlue flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">Search National Hospital Directory</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Search over 460+ registered hospitals by name, state, city, or pincode</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-apolloBlue dark:text-blue-300 text-xs font-bold self-start sm:self-center">
            {hospitalsList.length} Hospitals Found
          </span>
        </div>

        {/* Search & Filter Form */}
        <form onSubmit={handleSearchSubmit} className="grid sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input 
              type="text" 
              placeholder="Search by hospital name, city, address, or pincode..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <select 
              value={selectedState}
              onChange={e => {
                setSelectedState(e.target.value);
                fetchHospitalsData(searchQuery, e.target.value, selectedCity);
              }}
              className="w-full py-2.5 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100 font-semibold"
            >
              <option value="">All States ({statesList.length})</option>
              {statesList.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Directory</span>
          </button>
        </form>

        {/* Results Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {loadingHospitals ? (
            <p className="col-span-full text-xs text-slate-500 text-center py-8">Searching hospital directory...</p>
          ) : hospitalsList.length > 0 ? (
            hospitalsList.map((h, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300">
                      {h.state || 'India'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">PIN: {h.pincode || 'N/A'}</span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 leading-snug">{h.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{h.address}, {h.city}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">{h.city}</span>
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(h.name + ' ' + h.city)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[11px] font-bold text-apolloBlue hover:underline flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-xs text-slate-500 text-center py-8">No hospitals found matching criteria.</p>
          )}
        </div>
      </div>

    </div>
  );
}
