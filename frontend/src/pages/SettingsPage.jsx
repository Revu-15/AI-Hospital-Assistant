import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Moon, Sun, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'patient@apollo.com',
    phone: '+1 (555) 234-5678',
    insurance: 'Star Health Care'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    reminders: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Account & Portal Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage profile information, notification preferences, and application settings.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="medical-card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-5 h-5 text-apolloBlue" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Patient Profile</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={e => setProfile({...profile, email: e.target.value})}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={profile.phone}
                onChange={e => setProfile({...profile, phone: e.target.value})}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Insurance Provider</label>
              <input 
                type="text" 
                value={profile.insurance}
                onChange={e => setProfile({...profile, insurance: e.target.value})}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="medical-card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Bell className="w-5 h-5 text-apolloBlue" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Notification Preferences</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Email Notifications</span>
                <p className="text-slate-500 text-[11px]">Appointment confirmations and invoice receipts</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={e => setNotifications({...notifications, email: e.target.checked})}
                className="w-4 h-4 rounded text-apolloBlue"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">SMS Reminders</span>
                <p className="text-slate-500 text-[11px]">Medicine dose intake alerts and token updates</p>
              </div>
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={e => setNotifications({...notifications, sms: e.target.checked})}
                className="w-4 h-4 rounded text-apolloBlue"
              />
            </label>
          </div>
        </div>

        <button 
          type="submit"
          className="px-6 py-3 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preference Changes</span>
        </button>

      </form>

    </div>
  );
}
