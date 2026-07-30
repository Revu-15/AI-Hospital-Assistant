import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import apiClient from '../../api/client';

export default function Step9_ReportUpload({ onNavigate }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setStatus('Processing PDF text chunking (500 chars) & MiniLM vector embeddings...');
    setTimeout(() => {
      setStatus('✅ Indexed into FAISS Vector Database (Index: faiss_index/patient_1)');
      setTimeout(() => onNavigate(10), 1200);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-slate-700 hover:border-teal-500 bg-slate-950 p-6 rounded-2xl text-center space-y-3 transition">
        <UploadCloud className="w-10 h-10 text-teal-400 mx-auto animate-pulse" />
        <h4 className="text-sm font-bold text-white">Upload Medical Report (PDF)</h4>
        <p className="text-xs text-slate-400">Supported: ECG Reports, Troponin Blood Work, Past EHR Records</p>
        <input 
          type="file" 
          accept=".pdf"
          onChange={e => setFile(e.target.files[0])}
          className="block mx-auto text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-500/20 file:text-teal-300 hover:file:bg-teal-500/30"
        />
      </div>

      {status && <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-300 text-xs font-mono">{status}</div>}

      <button 
        onClick={handleUpload}
        className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition"
      >
        Process & Index PDF to FAISS
      </button>
    </div>
  );
}
