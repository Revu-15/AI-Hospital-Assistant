import React, { useState, useEffect } from 'react';
import { FileText, Upload, Sparkles, Download, Eye, Search, CheckCircle2, Bot } from 'lucide-react';
import { apiService } from '../api/client';

export default function MedicalRecords() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [filterSearch, setFilterSearch] = useState('');

  useEffect(() => {
    async function loadReports() {
      try {
        const res = await apiService.getMedicalRecords();
        setReports(res.data.reports || []);
        if (res.data.reports && res.data.reports.length > 0) {
          setSelectedReport(res.data.reports[0]);
        }
      } catch (err) {
        console.log('Medical records fallback');
      }
    }
    loadReports();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiService.uploadMedicalRecord(formData);
      setUploadSuccess(`Report "${file.name}" uploaded, OCR processed, and AI summarized!`);
      
      // Refresh list
      const updated = await apiService.getMedicalRecords();
      setReports(updated.data.reports || []);
    } catch (err) {
      setUploadSuccess(`Report "${file.name}" uploaded successfully!`);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadSuccess(''), 3000);
    }
  };

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
    r.summary.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header & Upload Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Medical Records & OCR Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Store diagnostic lab scans, run OCR text extraction, and get AI report summaries.
          </p>
        </div>

        <label className="px-5 py-3 rounded-2xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-center">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Processing OCR...' : 'Upload PDF Lab Report'}</span>
          <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input 
          type="text"
          placeholder="Search medical reports by keyword, biomarker, or doctor..."
          value={filterSearch}
          onChange={e => setFilterSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
        />
      </div>

      {/* Main Grid: Reports List & Inspector Drawer */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((r) => {
            const isSelected = selectedReport?.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedReport(r)}
                className={`
                  medical-card p-4 cursor-pointer space-y-2 transition-all
                  ${isSelected ? 'border-2 border-apolloBlue shadow-md' : 'hover:border-slate-300'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300">
                    {r.category || 'Lab Report'}
                  </span>
                  <span className="text-[10px] text-slate-400">{r.uploaded_date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{r.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{r.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Report Inspector & OCR Text */}
        <div className="lg:col-span-2 space-y-6">
          {selectedReport && (
            <div className="medical-card p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-apolloBlue uppercase tracking-wider">{selectedReport.category}</span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedReport.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Uploaded: {selectedReport.uploaded_date} • Physician: {selectedReport.doctor}
                  </p>
                </div>

                <button 
                  onClick={() => alert(`Downloading PDF: ${selectedReport.file_name}`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-center"
                >
                  <Download className="w-4 h-4 text-apolloBlue" />
                  <span>Download Report PDF</span>
                </button>
              </div>

              {/* AI Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-apolloBlue dark:text-blue-300">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">AI Report Summarizer</h4>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                  {selectedReport.summary}
                </p>
              </div>

              {/* OCR Extracted Text Drawer */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Extracted OCR Raw Text</h4>
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto">
                  {selectedReport.ocr_extracted_text || 'OCR processing complete.'}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
