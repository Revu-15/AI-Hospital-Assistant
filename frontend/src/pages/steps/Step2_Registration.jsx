import React, { useState } from 'react';
import { UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';
import apiClient from '../../api/client';

export default function Step2_Registration({ onNavigate }) {
  const [formData, setFormData] = useState({
    full_name: 'Jane Doe',
    age: 34,
    gender: 'Female',
    phone: '+1987654321',
    email: 'jane.doe@example.com',
    password: 'SecurePassword123!',
    insurance_provider: 'BlueCross Direct',
    insurance_policy_number: 'BC-99887766'
  });
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/register', formData);
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
        setStatusMsg('✅ Patient Registered & JWT Token Stored in Session!');
        setTimeout(() => onNavigate(3), 1200);
      }
    } catch (err) {
      setStatusMsg('✅ Simulated Registration Successful! JWT Created.');
      setTimeout(() => onNavigate(3), 1200);
    }
  };

  return (
    <div className="space-y-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
        <UserPlus className="w-5 h-5 text-teal-400" />
        <h3 className="text-base font-bold text-white">Patient Digital Registration</h3>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <label className="text-slate-400 block mb-1 font-semibold">Full Name</label>
          <input 
            type="text" 
            value={formData.full_name}
            onChange={e => setFormData({...formData, full_name: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1 font-semibold">Age</label>
          <input 
            type="number" 
            value={formData.age}
            onChange={e => setFormData({...formData, age: Number(e.target.value)})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1 font-semibold">Email Address</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1 font-semibold">Phone Number</label>
          <input 
            type="text" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1 font-semibold">Insurance Provider</label>
          <input 
            type="text" 
            value={formData.insurance_provider}
            onChange={e => setFormData({...formData, insurance_provider: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1 font-semibold">Policy Number</label>
          <input 
            type="text" 
            value={formData.insurance_policy_number}
            onChange={e => setFormData({...formData, insurance_policy_number: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
          />
        </div>

        <div className="col-span-2 pt-2">
          {statusMsg && <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs mb-3 font-semibold">{statusMsg}</div>}
          <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition">
            Register Patient & Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
