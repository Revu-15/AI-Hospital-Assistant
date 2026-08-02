import React, { useState } from 'react';
import { 
  Heart, Calendar, FileText, Pill, CreditCard, AlertTriangle, 
  Bot, ShieldCheck, Stethoscope, Clock, MapPin, Star, ChevronRight, 
  Sparkles, CheckCircle2, UserCheck, PhoneCall, ArrowRight, Zap,
  User, Phone, Award, Wrench, IndianRupee, Shield, Headphones, ChevronDown
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

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

  const faqList = [
    {
      q: "1. Are same day or emergency consultations available?",
      a: "Yes, SmartHospital AI provides same-day outpatient consultations across 15+ specialty departments as well as 24/7 round-the-clock emergency triage support."
    },
    {
      q: "2. Does SmartHospital AI Bangalore offer advanced diagnostic services?",
      a: "Yes, we house state-of-the-art MRI (3T), 128-slice CT Scanning, High-resolution Ultrasound, Automated Pathology Labs, and Robotic Surgical suites."
    },
    {
      q: "3. Is cashless treatment available at SmartHospital AI Bangalore?",
      a: "Yes, we partner with 40+ leading health insurance providers (Star Health, Apollo Munich, Max Bupa, ICICI Lombard) for instant cashless claim settlement."
    },
    {
      q: "4. Is financial counselling available?",
      a: "Yes, our dedicated billing and financial counseling office assists with treatment cost estimations, insurance co-pay calculations, and zero-cost EMI plans."
    },
    {
      q: "5. Are minimally invasive and robotic surgeries available?",
      a: "Yes, our senior surgeons specialize in minimally invasive laparoscopic and da Vinci robotic procedures for faster recovery and minimal scarring."
    }
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

      {/* SECTION: How to Skip the Wait Time at SmartHospital AI */}
      <section className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            How to Skip the Wait Time at <span className="text-[#007A99]">SmartHospital AI Bangalore</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Finding the right care is easy at SmartHospital AI Bangalore. From booking an appointment to meeting the right doctor, our team guides you at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Card 01 */}
          <div className="medical-card p-6 space-y-4 relative border border-slate-200/80 dark:border-slate-800">
            <span className="absolute top-4 right-6 text-slate-300 dark:text-slate-600 font-mono text-xs font-bold">01</span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                Share your details or Give us Call
              </h3>
            </div>
          </div>

          {/* Card 02 */}
          <div className="medical-card p-6 space-y-2 relative border border-slate-200/80 dark:border-slate-800">
            <span className="absolute top-4 right-6 text-slate-300 dark:text-slate-600 font-mono text-xs font-bold">02</span>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/30">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Our healthcare team will connect with you instantly
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Get personalized assistance from our dedicated healthcare experts
                </p>
              </div>
            </div>
          </div>

          {/* Card 03 */}
          <div className="medical-card p-6 space-y-2 relative border border-slate-200/80 dark:border-slate-800">
            <span className="absolute top-4 right-6 text-slate-300 dark:text-slate-600 font-mono text-xs font-bold">03</span>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Choose the doctor and appointment time that works for you
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select from available slots that fit your schedule
                </p>
              </div>
            </div>
          </div>

          {/* Card 04 */}
          <div className="medical-card p-6 space-y-2 relative border border-slate-200/80 dark:border-slate-800">
            <span className="absolute top-4 right-6 text-slate-300 dark:text-slate-600 font-mono text-xs font-bold">04</span>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Reach the hospital just 10 minutes before your appointment slot
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  No more long waiting times - we value your time
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <div className="text-center pt-2">
          <button 
            onClick={() => onNavigate('appointments')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00A896] hover:opacity-95 text-white font-extrabold text-xs shadow-xl shadow-blue-500/20 inline-flex items-center gap-2 transition-all"
          >
            <span>Start Your Recovery Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION: Frequently Asked Questions (Accordion) */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 dark:text-slate-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 max-w-4xl mx-auto">
          {faqList.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="medical-card overflow-hidden transition-all border border-slate-200/80 dark:border-slate-800"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-apolloSky text-apolloBlue' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Bar */}
      <footer className="py-4 px-6 bg-[#005B73] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
        <div>© 2026 SmartHospital AI. All rights reserved.</div>
        <div className="flex gap-4 text-teal-200 font-semibold">
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
        </div>
      </footer>

    </div>
  );
}
