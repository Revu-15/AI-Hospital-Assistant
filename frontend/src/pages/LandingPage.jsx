import React from 'react';
import { 
  Heart, Calendar, FileText, Pill, CreditCard, AlertTriangle, 
  Bot, ShieldCheck, Stethoscope, Clock, MapPin, Star, ChevronRight, 
  Sparkles, CheckCircle2, UserCheck, PhoneCall, ArrowRight, Zap
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const departments = [
    { name: "Cardiology", desc: "Heart & Vascular Care", icon: Heart, doctors: 18, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40" },
    { name: "Neurology", desc: "Brain & Spine Specialists", icon: Stethoscope, doctors: 14, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40" },
    { name: "Pediatrics", desc: "Child & Infant Care", icon: UserCheck, doctors: 12, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" },
    { name: "Orthopedics", desc: "Bone & Joint Surgery", icon: Zap, doctors: 16, color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40" },
  ];

  const featuredDoctors = [
    {
      id: 101,
      name: "Dr. Sarah Jenkins",
      spec: "Interventional Cardiology",
      exp: "15 Years Exp",
      rating: 4.95,
      hospital: "Apollo Central Hospital",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 102,
      name: "Dr. Rajesh Sharma",
      spec: "Internal Medicine & Diabetology",
      exp: "18 Years Exp",
      rating: 4.90,
      hospital: "Apollo Central Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 104,
      name: "Dr. Marcus Vance",
      spec: "Neurology & Spine Specialist",
      exp: "14 Years Exp",
      rating: 4.92,
      hospital: "Apollo Neuro Institute",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const swarmAgents = [
    { name: "Main Hospital Coordinator", role: "Intent Detection & Global Routing" },
    { name: "Appointment Booking Agent", role: "Instant Scheduling & Availability" },
    { name: "Medical Records Agent", role: "OCR Extraction & Report Summaries" },
    { name: "Billing & Claims Agent", role: "Insurance Co-pay & PDF Invoices" },
    { name: "Prescription Safety Agent", role: "Dosage Reminders & Drug Warnings" },
    { name: "Emergency Triage Agent", role: "24/7 ER Dispatch & First Aid" },
    { name: "Symptom Checker Agent", role: "Condition Diagnosis & Specialist Match" },
    { name: "Hospital FAQ Agent", role: "Timings, Doctors & Facilities Info" }
  ];

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-apolloBlue via-blue-600 to-teal-600 text-white p-8 lg:p-12 shadow-xl shadow-apolloBlue/20">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Powered by OpenAI Swarm Multi-Agent Architecture</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Intelligent Healthcare, <br />
              <span className="text-teal-200">Simplified for You.</span>
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
              Experience next-generation patient care with Apollo AI. Instant doctor appointments, AI report summarization, drug interaction checking, and 24/7 emergency guidance coordinated by 8 specialized Swarm agents.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onNavigate('chat')}
                className="px-6 py-3.5 rounded-2xl bg-white text-apolloBlue font-bold text-sm hover:bg-blue-50 shadow-lg shadow-black/10 transition-all flex items-center gap-2 group"
              >
                <Bot className="w-5 h-5 text-apolloBlue" />
                <span>Talk to AI Hospital Agent</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => onNavigate('appointments')}
                className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex items-center gap-6 border-t border-white/20 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span>HIPAA Compliant Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-300" />
                <span>24/7 ER Guidance</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative">
            <div className="medical-card p-6 text-slate-800 dark:text-slate-100 space-y-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Swarm Agent Active</span>
                </div>
                <span className="text-xs font-bold text-apolloBlue px-2.5 py-1 rounded-full bg-apolloSky dark:bg-blue-950/60">
                  Main Agent
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-apolloBlue">Patient:</strong> "I need to book a cardiology appointment and check if Aspirin interacts with my new medicine."
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-200">
                  <strong className="text-teal-600 dark:text-teal-400">Main Agent:</strong> "Handoff to <strong>Appointment Agent</strong> for Dr. Sarah Jenkins (10:30 AM slot available). Handoff to <strong>Prescription Agent</strong> for Drug Interaction analysis."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50">
                  <p className="text-[10px] font-bold text-teal-700 dark:text-teal-300">Slot Reserved</p>
                  <p className="text-xs font-extrabold text-teal-900 dark:text-teal-100">10:30 AM Today</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/50">
                  <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Safety Check</p>
                  <p className="text-xs font-extrabold text-emerald-900 dark:text-emerald-100">APPROVED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Complete Hospital Portal Services
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Seamlessly manage your healthcare journey from booking to discharge.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div onClick={() => onNavigate('appointments')} className="medical-card p-5 cursor-pointer group hover:border-apolloBlue transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-apolloBlue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Book Doctor Appointment</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Find top specialists, view available time slots, and schedule instant consultations.
            </p>
          </div>

          <div onClick={() => onNavigate('medical-records')} className="medical-card p-5 cursor-pointer group hover:border-teal-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Medical Records & OCR</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Upload lab reports, extract medical findings, and generate instant AI report summaries.
            </p>
          </div>

          <div onClick={() => onNavigate('prescriptions')} className="medical-card p-5 cursor-pointer group hover:border-purple-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Prescriptions & Safety</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Track medication dosages, receive intake reminders, and run AI drug interaction checks.
            </p>
          </div>

          <div onClick={() => onNavigate('emergency')} className="medical-card p-5 cursor-pointer group hover:border-rose-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">24/7 Emergency Triage</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Urgent first aid instructions, 1-click ambulance hotline, and nearest ER map locator.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Top Specialist Doctors
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Consult with Apollo's leading senior consultants and medical practitioners.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('appointments')}
            className="text-xs font-bold text-apolloBlue hover:underline flex items-center gap-1"
          >
            <span>View All Doctors</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredDoctors.map(doc => (
            <div key={doc.id} className="medical-card p-5 flex flex-col justify-between">
              <div className="flex gap-4">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">{doc.name}</h4>
                  <p className="text-xs font-semibold text-apolloBlue mt-0.5">{doc.spec}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{doc.exp} • {doc.hospital}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{doc.rating} Rating</span>
                </div>
                <button 
                  onClick={() => onNavigate('appointments')}
                  className="px-3.5 py-1.5 rounded-xl bg-apolloSky hover:bg-apolloBlue hover:text-white text-apolloBlue font-bold text-xs transition-colors"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Swarm Multi-Agent Network Architecture Showcase */}
      <section className="medical-card p-8 space-y-6 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-800/80 border-blue-100 dark:border-slate-700">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-apolloBlue dark:text-blue-300 text-xs font-bold mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>OpenAI Swarm Framework</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            8 Specialized AI Swarm Agents Working Together
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Our multi-agent system detects intent and transfers control dynamically between specialized domain agents.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {swarmAgents.map((agent, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-apolloSky dark:bg-blue-900/40 text-apolloBlue dark:text-blue-300">
                Agent #{idx + 1}
              </span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-2">{agent.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{agent.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
