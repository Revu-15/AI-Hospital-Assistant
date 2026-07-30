import React, { useState } from 'react';
import { 
  Search, Stethoscope, Sparkles, FileText, Pill, CreditCard, Ambulance, Star, 
  MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2, Heart, Award, Building2,
  Users, MessageSquare, PhoneCall, Zap, Activity, ChevronRight, Check
} from 'lucide-react';

export default function HomePage({ onNavigate, onOpenChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = [
    { name: "Cardiology", icon: Heart, count: "12 Doctors", color: "bg-rose-50 text-rose-600 border-rose-200" },
    { name: "Emergency Care", icon: Ambulance, count: "24/7 On-Call", color: "bg-red-50 text-red-600 border-red-200" },
    { name: "Neurology", icon: Activity, count: "8 Doctors", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { name: "General Medicine", icon: Stethoscope, count: "15 Doctors", color: "bg-sky-50 text-sky-600 border-sky-200" }
  ];

  const doctors = [
    {
      id: 101,
      name: "Dr. Sarah Jenkins, MD",
      specialty: "Interventional Cardiology",
      experience: "15+ Years Exp.",
      hospital: "Aura Central Hospital",
      rating: 4.95,
      reviews: 142,
      slot: "10:30 AM Tomorrow",
      avatar: "SJ",
      badge: "Top Rated"
    },
    {
      id: 104,
      name: "Dr. Marcus Vance, MD",
      specialty: "Cardiovascular Specialist",
      experience: "12+ Years Exp.",
      hospital: "Aura Specialty Clinic",
      rating: 4.88,
      reviews: 98,
      slot: "11:00 AM Tomorrow",
      avatar: "MV",
      badge: "Available Today"
    },
    {
      id: 108,
      name: "Dr. Elena Rostova, MD",
      specialty: "Senior Neurologist",
      experience: "18+ Years Exp.",
      hospital: "Brain & Spine Institute",
      rating: 4.92,
      reviews: 165,
      slot: "01:00 PM Tomorrow",
      avatar: "ER",
      badge: "Lead Specialist"
    }
  ];

  return (
    <div className="space-y-20 pb-20 bg-medicalBg">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>SmartHospital AI • Healthcare Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          How can we help you <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-teal-500 bg-clip-text text-transparent">today?</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Search top doctors, book instant hospital visits, analyze medical reports with AI, and access 24/7 virtual care.
        </p>

        {/* Large Central Search Bar */}
        <div className="max-w-2xl mx-auto relative shadow-medical rounded-3xl bg-white p-2 border border-slate-200 flex items-center">
          <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, doctors, departments, or lab tests..." 
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none py-2"
          />
          <button 
            onClick={() => onNavigate('patient')}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center space-x-1"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Action Category Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto pt-4">
          <button onClick={() => onNavigate('patient')} className="medical-card p-4 text-center space-y-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto group-hover:bg-sky-500 group-hover:text-white transition">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">Book Appt</span>
          </button>

          <button onClick={onOpenChat} className="medical-card p-4 text-center space-y-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto group-hover:bg-teal-500 group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">AI Health Chat</span>
          </button>

          <button onClick={() => onNavigate('patient')} className="medical-card p-4 text-center space-y-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">PDF Report</span>
          </button>

          <button onClick={() => onNavigate('patient')} className="medical-card p-4 text-center space-y-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:bg-emerald-500 group-hover:text-white transition">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">Pharmacy</span>
          </button>

          <button onClick={() => onNavigate('patient')} className="medical-card p-4 text-center space-y-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto group-hover:bg-indigo-600 group-hover:text-white transition">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">Billing</span>
          </button>

          <button onClick={onOpenChat} className="medical-card p-4 text-center space-y-2 group cursor-pointer border-red-200 hover:border-red-400">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto group-hover:bg-red-600 group-hover:text-white transition">
              <Ambulance className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-red-600 block">Emergency</span>
          </button>
        </div>
      </section>

      {/* 2. Popular Departments Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Popular Clinical Departments</h2>
          <p className="text-slate-500 text-xs max-w-lg mx-auto">Select a specialty to consult top doctors and schedule in-person or video visits</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <div key={i} className="medical-card p-6 space-y-4 hover:border-sky-300 transition cursor-pointer">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${dept.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{dept.count} • Verified Faculty</p>
                </div>
                <div className="flex items-center text-sky-600 text-xs font-bold pt-2">
                  <span>Explore Department</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Top Doctor Cards Showcase */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Top Specialist Doctors</h2>
            <p className="text-xs text-slate-500 mt-1">Book verified appointments with experienced hospital consultants</p>
          </div>
          <button onClick={() => onNavigate('patient')} className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center">
            View All Doctors <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map(doc => (
            <div key={doc.id} className="medical-card p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center font-bold text-sky-700 text-lg">
                    {doc.avatar}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {doc.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                  <p className="text-xs text-sky-600 font-semibold">{doc.specialty}</p>
                  <p className="text-xs text-slate-500 mt-1">{doc.hospital} • {doc.experience}</p>
                  <div className="flex items-center text-amber-500 text-xs font-bold mt-2">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" /> {doc.rating} ({doc.reviews} Patient Reviews)
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Next Available</span>
                  <span className="text-xs text-emerald-600 font-bold">{doc.slot}</span>
                </div>
                <button 
                  onClick={() => onNavigate('patient')} 
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AI Assistant Highlights Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="medical-card p-8 sm:p-12 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 text-white border-0 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>Omnipresent AI Health Assistant</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Instant Clinical Triage & Report Analysis 24/7</h2>
            <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
              Describe symptoms in your own words. Our AI Assistant categorizes urgency, matches specialist doctors, and explains complex blood work or PDF lab reports in seconds.
            </p>
            <div className="flex space-x-4 pt-2">
              <button 
                onClick={onOpenChat}
                className="px-6 py-3 bg-white text-sky-700 hover:bg-sky-50 font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start AI Chat Assistant</span>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl space-y-3 w-full max-w-xs text-xs text-white">
            <div className="flex items-center space-x-2 font-bold text-sky-100 border-b border-white/20 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>AI Features Built-in</span>
            </div>
            <p className="flex items-center">✓ Emergency Triage Code Classification</p>
            <p className="flex items-center">✓ FAISS Medical Report Vector Search</p>
            <p className="flex items-center">✓ Drug-Drug Interaction Safety Review</p>
            <p className="flex items-center">✓ 80% Co-Pay Insurance Calculation</p>
          </div>
        </div>
      </section>
    </div>
  );
}
