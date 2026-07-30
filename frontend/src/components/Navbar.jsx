import React from 'react';
import { Activity, Search, Shield, User, Stethoscope, BarChart3, Sparkles, LogIn, ChevronRight } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, setCurrentUser }) {
  return (
    <header className="sticky top-0 z-50 glass-nav px-6 py-3.5 flex items-center justify-between shadow-sm">
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-teal-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Activity className="w-5 h-5 text-sky-500 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Aura<span className="text-sky-500">Health</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-600 border border-sky-200 uppercase tracking-widest">
              Commercial SaaS
            </span>
          </div>
          <p className="text-[11px] text-slate-500">AI-Powered Hospital & Patient Platform</p>
        </div>
      </div>

      {/* Center Nav Tabs */}
      <nav className="hidden md:flex items-center space-x-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'home' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('patient')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
            activeTab === 'patient' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Patient Portal</span>
        </button>
        <button
          onClick={() => setActiveTab('doctor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
            activeTab === 'doctor' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Doctor EHR</span>
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
            activeTab === 'admin' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Admin Workspace</span>
        </button>
      </nav>

      {/* Right User Actions */}
      <div className="flex items-center space-x-3">
        {currentUser ? (
          <div className="flex items-center space-x-3 bg-white border border-slate-200 px-3.5 py-1.5 rounded-2xl shadow-sm">
            <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 border border-sky-200 flex items-center justify-center font-bold text-xs">
              {currentUser.full_name[0]}
            </div>
            <div className="text-left text-xs">
              <span className="text-slate-900 font-bold block leading-tight">{currentUser.full_name}</span>
              <span className="text-[10px] text-sky-600 capitalize">{currentUser.role} Account</span>
            </div>
            <button 
              onClick={() => setCurrentUser(null)}
              className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold ml-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('auth')}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold rounded-2xl shadow-md shadow-sky-500/20 transition flex items-center space-x-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Join</span>
          </button>
        )}
      </div>
    </header>
  );
}
