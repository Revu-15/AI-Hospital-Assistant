import React, { useState } from 'react';
import { 
  Heart, Calendar, FileText, Pill, CreditCard, AlertTriangle, 
  Bot, ShieldCheck, Stethoscope, Clock, MapPin, Star, ChevronRight, 
  Sparkles, CheckCircle2, UserCheck, PhoneCall, ArrowRight, Zap,
  User, Phone, Award, Wrench, IndianRupee, Shield
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Hero Slot Booking Form State
  const [slotForm, setSlotForm] = useState({
    hospital: 'SmartHospital Bannerghatta, Bangalore',
    name: '',
    phone: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!slotForm.name || !slotForm.phone) {
      alert('Please enter your Name and Phone Number.');
      return;
    }
    setOtpSent(true);
  };

  const handleSlotFormSubmit = (e) => {
    e.preventDefault();
    if (!slotForm.otp) {
      alert('Please enter the 6-digit OTP code sent to your phone (e.g. 123456).');
      return;
    }
    setBookingSuccess(true);
    setTimeout(() => {
      onNavigate('appointments');
    }, 1500);
  };

  const departments = [
    { name: "Cardiology", desc: "Heart & Vascular Care", icon: Heart, doctors: 18, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40" },
    { name: "Neurology", desc: "Brain & Spine Specialists", icon: Stethoscope, doctors: 14, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40" },
    { name: "Pediatrics", desc: "Child & Infant Care", icon: UserCheck, doctors: 12, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" },
    { name: "Orthopedics", desc: "Bone & Joint Surgery", icon: Zap, doctors: 16, color: "text-teal-500 bg-teal-50 dark:bg-teal-950/40" },
  ];

  const featuredDoctors = [
    {
      id: 101,
      name: "Dr. Rajesh Kumar",
      spec: "Interventional Cardiology",
      exp: "15 Years Exp",
      rating: 4.95,
      hospital: "SmartHospital Central Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 102,
      name: "Dr. Priya Sharma",
      spec: "Internal Medicine & Diabetology",
      exp: "18 Years Exp",
      rating: 4.90,
      hospital: "SmartHospital Central Hospital",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 104,
      name: "Dr. Anil Verma",
      spec: "Neurology & Spine Specialist",
      exp: "14 Years Exp",
      rating: 4.92,
      hospital: "SmartHospital Neuro Institute",
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
      
      {/* Exact Match Apollo/SmartHospital Style Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005B73] via-[#004B5F] to-[#003848] text-white p-6 sm:p-10 lg:p-12 shadow-2xl">
        
        {/* Top Right Call Us Button Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-[#005B73] flex items-center justify-center font-black text-xl shadow-lg">
              🏥
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white">SmartHospital <span className="text-[#FFC107]">AI</span></span>
              <p className="text-[10px] text-teal-200 font-semibold tracking-wider uppercase">Bangalore • Chennai • Hyderabad</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('emergency')}
            className="px-5 py-2 rounded-full bg-[#EAA400] hover:bg-amber-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Us 1800-200-2244</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Your health is in <span className="text-[#FFC107]">safe hands</span> at <br className="hidden sm:inline" />
              SmartHospital AI Bangalore
            </h1>

            <p className="text-teal-100 text-sm sm:text-base leading-relaxed max-w-lg">
              Share your details. We'll help you find the right doctor and support you till recovery.
            </p>

            {/* Same-Day Appointment Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-[#005B73] text-xs font-extrabold shadow-md border-2 border-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Same-Day Doctor Appointments | 24/7 Patient Support</span>
            </div>

            {/* Bottom 3 Feature Cards */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-4 rounded-2xl bg-white text-slate-800 text-center space-y-2 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#005B73] flex items-center justify-center mx-auto">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-xs font-extrabold leading-snug">Expert Team of Doctors</p>
              </div>

              <div className="p-4 rounded-2xl bg-white text-slate-800 text-center space-y-2 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#005B73] flex items-center justify-center mx-auto">
                  <Wrench className="w-5 h-5" />
                </div>
                <p className="text-xs font-extrabold leading-snug">Latest Medical Facilities</p>
              </div>

              <div className="p-4 rounded-2xl bg-white text-slate-800 text-center space-y-2 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-[#005B73] flex items-center justify-center mx-auto font-black text-sm">
                  ₹
                </div>
                <p className="text-xs font-extrabold leading-snug">Free Cost Estimate</p>
              </div>
            </div>

          </div>

          {/* Right Hero Booking Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-black text-slate-900 text-center">
                Book the Next Available Slot
              </h3>

              {bookingSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-700 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-base">Slot Reserved Successfully!</h4>
                  <p className="text-xs text-emerald-800">Redirecting to doctor matching and appointment scheduling...</p>
                </div>
              ) : (
                <form onSubmit={handleSlotFormSubmit} className="space-y-3.5">
                  <div>
                    <select 
                      value={slotForm.hospital}
                      onChange={e => setSlotForm({...slotForm, hospital: e.target.value})}
                      className="w-full p-3.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-800 font-semibold"
                    >
                      <option value="SmartHospital Bannerghatta, Bangalore">SmartHospital Bannerghatta, Bangalore</option>
                      <option value="SmartHospital Greams Road, Chennai">SmartHospital Greams Road, Chennai</option>
                      <option value="SmartHospital Jubilee Hills, Hyderabad">SmartHospital Jubilee Hills, Hyderabad</option>
                      <option value="SmartHospital Indraprastha, Delhi">SmartHospital Indraprastha, Delhi</option>
                    </select>
                  </div>

                  <div>
                    <input 
                      type="text" required
                      placeholder="Enter your name"
                      value={slotForm.name}
                      onChange={e => setSlotForm({...slotForm, name: e.target.value})}
                      className="w-full p-3.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <input 
                      type="text" required
                      placeholder="Phone Number"
                      value={slotForm.phone}
                      onChange={e => setSlotForm({...slotForm, phone: e.target.value})}
                      className="w-full p-3.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-800 font-medium"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full py-3 rounded-xl bg-[#007A99] hover:bg-[#00607A] text-white font-extrabold text-xs shadow-md transition-all"
                  >
                    {otpSent ? '✓ OTP Sent to Mobile' : 'Send OTP'}
                  </button>

                  <div>
                    <input 
                      type="text"
                      placeholder="Enter OTP (e.g. 123456)"
                      value={slotForm.otp}
                      onChange={e => setSlotForm({...slotForm, otp: e.target.value})}
                      className="w-full p-3.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-800 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#EAA400] hover:bg-[#D99600] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
                  >
                    Submit Now
                  </button>
                </form>
              )}
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
              Consult with SmartHospital AI's leading senior consultants and medical practitioners.
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
