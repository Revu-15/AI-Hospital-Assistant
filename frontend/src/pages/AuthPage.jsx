import React from 'react';
import { Heart, UserCheck, Stethoscope, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function AuthPage({ onNavigate, setCurrentUser }) {
  
  const handleSelectRole = (roleType) => {
    let selectedUser;

    if (roleType === 'Admin') {
      selectedUser = {
        id: 1,
        full_name: 'Revanth Polamreddy (System Admin)',
        email: 'polamreddyrevanth.82@gmail.com',
        role: 'Admin'
      };
      localStorage.setItem('user', JSON.stringify(selectedUser));
      setCurrentUser(selectedUser);
      onNavigate('admin');
    } else if (roleType === 'Doctor') {
      selectedUser = {
        id: 101,
        full_name: 'Dr. Sarah Jenkins',
        email: 'dr.jenkins@smarthospital.ai',
        role: 'Doctor'
      };
      localStorage.setItem('user', JSON.stringify(selectedUser));
      setCurrentUser(selectedUser);
      onNavigate('doctor');
    } else {
      selectedUser = {
        id: 9042,
        full_name: 'Revanth Polamreddy',
        email: 'revanth.polamreddy15@gmail.com',
        role: 'Patient'
      };
      localStorage.setItem('user', JSON.stringify(selectedUser));
      setCurrentUser(selectedUser);
      onNavigate('patient');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-6 sm:my-12 space-y-8 text-center">
      
      {/* Header */}
      <div className="space-y-3 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-apolloBlue to-teal-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-apolloBlue/20">
          <Heart className="w-8 h-8 fill-white/20" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Select Active User Role
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          No sign up or password required. Click any profile below to instantly switch portals.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        
        {/* Patient Portal Card */}
        <div 
          onClick={() => handleSelectRole('Patient')}
          className="medical-card p-6 cursor-pointer group hover:border-apolloBlue hover:shadow-xl transition-all flex flex-col justify-between space-y-6 text-left"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-apolloBlue flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-900/40 dark:text-blue-300">
                Patient Mode
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mt-2">Revanth Polamreddy</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Access appointments, digital health records, prescriptions & AI chat.
              </p>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center justify-center gap-1.5">
            <span>Enter Patient Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Portal Card */}
        <div 
          onClick={() => handleSelectRole('Doctor')}
          className="medical-card p-6 cursor-pointer group hover:border-teal-500 hover:shadow-xl transition-all flex flex-col justify-between space-y-6 text-left"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                Doctor Mode
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mt-2">Dr. Sarah Jenkins</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Manage live patient queue, clinical diagnoses, and prescriptions.
              </p>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-1.5">
            <span>Enter Doctor Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Portal Card */}
        <div 
          onClick={() => handleSelectRole('Admin')}
          className="medical-card p-6 cursor-pointer group hover:border-amber-500 hover:shadow-xl transition-all flex flex-col justify-between space-y-6 text-left"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                Admin Mode
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mt-2">System Admin</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Monitor hospital analytics, revenue metrics, and Swarm agent health.
              </p>
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-1.5">
            <span>Enter Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
