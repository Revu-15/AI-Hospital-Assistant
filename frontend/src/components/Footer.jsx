import React from 'react';
import { Activity, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900">AuraHealth AI</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Commercial SaaS Healthcare Platform powering instant clinical triage, report RAG analysis, telehealth consultations, and digital prescriptions.
          </p>
          <p className="text-[11px] text-slate-400">© 2026 AuraHealth Inc. All rights reserved.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">Patient Services</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#triage" className="hover:text-sky-600 transition">AI Symptom Triage</a></li>
            <li><a href="#doctors" className="hover:text-sky-600 transition">Search Specialist Doctors</a></li>
            <li><a href="#reports" className="hover:text-sky-600 transition">Upload Medical PDF Reports</a></li>
            <li><a href="#pharmacy" className="hover:text-sky-600 transition">Online Pharmacy & Safety</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">Healthcare Providers</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#doctor-ehr" className="hover:text-sky-600 transition">Doctor EHR Workspace</a></li>
            <li><a href="#checkin" className="hover:text-sky-600 transition">Touchscreen Kiosk Check-In</a></li>
            <li><a href="#admin" className="hover:text-sky-600 transition">Hospital Analytics Portal</a></li>
            <li><a href="#billing" className="hover:text-sky-600 transition">Insurance Co-Pay Settlement</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">24/7 Helpline</h4>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-sky-500" />
              <span>+1 (800) 555-AURA</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-sky-500" />
              <span>care@aurahealth.ai</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-sky-500" />
              <span>Silicon Valley Medical Plaza, CA</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
