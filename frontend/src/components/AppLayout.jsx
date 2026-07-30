import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, FileText, Pill, CreditCard, AlertTriangle, 
  Bot, Settings, Sun, Moon, Bell, User, LogOut, Menu, X, 
  Search, Shield, ChevronRight, Activity, Home, Stethoscope
} from 'lucide-react';

export default function AppLayout({ children, activeRoute, onNavigate, currentUser, setCurrentUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navigationItems = [
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'patient', label: 'Patient Dashboard', icon: Activity },
    { id: 'doctor', label: 'Doctor Portal', icon: Stethoscope },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'medical-records', label: 'Medical Records', icon: FileText },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'billing', label: 'Billing & Claims', icon: CreditCard },
    { id: 'emergency', label: 'Emergency Triage', icon: AlertTriangle, badge: 'SOS', color: 'text-rose-500' },
    { id: 'chat', label: 'AI Swarm Chat', icon: Bot, badge: '8 Agents', color: 'text-apolloBlue' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const notifications = [
    { id: 1, title: 'Appointment Confirmed', desc: 'Dr. Sarah Jenkins for Aug 01 at 10:30 AM', time: '10m ago' },
    { id: 2, title: 'Prescription Reminder', desc: 'Take Aspirin 81mg with breakfast', time: '1h ago' },
    { id: 3, title: 'Invoice Ready', desc: 'Lab report invoice #INV-9402 generated', time: '3h ago' }
  ];

  return (
    <div className="min-h-screen bg-medicalBg dark:bg-darkMedicalBg text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-apolloBlue to-apolloLightBlue flex items-center justify-center text-white shadow-md shadow-apolloBlue/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-apolloBlue via-blue-600 to-teal-500 bg-clip-text text-transparent">
                SmartHospital AI
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-900/40 dark:text-blue-300">
                Swarm Healthcare
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input 
            type="text" 
            placeholder="Search doctors, appointments, symptoms, medicines..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-apolloBlue/50"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Quick SOS Trigger */}
          <button 
            onClick={() => onNavigate('emergency')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 text-xs font-bold hover:bg-rose-100 transition-colors animate-pulse"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOS ER</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
            </button>

            {/* Notification Drawer Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 medical-card p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Notifications</h4>
                  <span className="text-xs font-medium text-apolloBlue">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto my-2">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg px-2 transition-colors">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth Toggle */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-apolloBlue to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow">
                {currentUser.full_name ? currentUser.full_name[0] : 'P'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{currentUser.full_name || 'Patient User'}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">ID: #PT-9042</p>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('auth')}
              className="px-4 py-2 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Signup</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
          transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-4 pt-6
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Hospital Navigation
            </p>
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all
                    ${isActive 
                      ? 'bg-apolloBlue text-white shadow-md shadow-apolloBlue/25' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color || 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-apolloBlue'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Swarm Agent Info Widget */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-apolloSky to-blue-50 dark:from-slate-800/80 dark:to-slate-800 border border-blue-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1.5">
              <Bot className="w-4 h-4 text-apolloBlue" />
              <span className="text-xs font-bold text-apolloBlue dark:text-blue-300">OpenAI Swarm Engine</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              8 Multi-Agent Collaboration Network active & online.
            </p>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

    </div>
  );
}
