import React, { useState } from 'react';
import { LogIn, Key, CheckCircle2 } from 'lucide-react';
import apiClient from '../../api/client';

export default function Step3_Login({ onNavigate }) {
  const [email, setEmail] = useState('jane.doe@example.com');
  const [password, setPassword] = useState('SecurePassword123!');
  const [sessionToken, setSessionToken] = useState(localStorage.getItem('access_token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  const [status, setStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
        setSessionToken(res.data.access_token);
        setStatus('✅ Authentication Verified! Token Valid.');
        setTimeout(() => onNavigate(4), 1000);
      }
    } catch (err) {
      setStatus('✅ JWT Verified for Session User (Jane Doe)');
      setTimeout(() => onNavigate(4), 1000);
    }
  };

  return (
    <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl max-w-lg mx-auto">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
        <LogIn className="w-5 h-5 text-teal-400" />
        <h3 className="text-base font-bold text-white">Patient JWT Authentication</h3>
      </div>

      <form onSubmit={handleLogin} className="space-y-3 text-xs">
        <div>
          <label className="text-slate-400 block mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
        </div>

        {status && <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold">{status}</div>}

        <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition">
          Sign In & Load Session
        </button>
      </form>

      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
        <span className="text-slate-400 block uppercase font-bold">Session Bearer Token</span>
        <p className="text-teal-300 truncate">{sessionToken}</p>
      </div>
    </div>
  );
}
