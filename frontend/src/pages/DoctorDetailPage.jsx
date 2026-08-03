import React, { useState } from 'react';
import { 
  UserCheck, MapPin, Calendar, Clock, DollarSign, Star, 
  MessageSquare, ChevronLeft, ShieldCheck, Stethoscope, 
  Award, Globe, Phone, Mail, CheckCircle2 
} from 'lucide-react';
import { apiService } from '../api/client';

export default function DoctorDetailPage({ doctor, onBack, onBookAppointment, onChatWithAI }) {
  const [selectedSlot, setSelectedSlot] = useState(doctor?.available_time_slots?.[0] || '');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!doctor) return null;

  const handleBook = () => {
    if (onBookAppointment) {
      onBookAppointment(doctor, selectedSlot);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-apolloBlue transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Doctors Directory</span>
        </button>

        <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
          doctor.status === 'Available' 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{doctor.status || 'Available'}</span>
        </span>
      </div>

      {/* Main Hero Doctor Card */}
      <div className="medical-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          
          {/* Doctor Professional Photo */}
          <div className="relative shrink-0 mx-auto sm:mx-0">
            <img 
              src={doctor.professional_photo || doctor.image} 
              alt={doctor.full_name} 
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-4 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/10"
            />
            <div className="absolute -bottom-2 -right-2 bg-apolloBlue text-white p-2 rounded-2xl shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Core Doctor Header Details */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div>
              <span className="px-3 py-1 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300 text-xs font-extrabold tracking-wider uppercase">
                {doctor.department}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-2">
                {doctor.full_name}
              </h1>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {doctor.qualification} • {doctor.specialization}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-xl">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-extrabold text-slate-900 dark:text-slate-100">{doctor.patient_rating || 4.9}</span>
                <span className="text-slate-400">({doctor.reviews_count || 150}+ Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-xl">
                <Award className="w-4 h-4 text-apolloBlue" />
                <span>{doctor.experience_years} Years Experience</span>
              </div>

              <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-xl">
                <MapPin className="w-4 h-4" />
                <span>{doctor.room_number || 'OPD Wing'}</span>
              </div>
            </div>

            {/* Official Contact Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-mono text-apolloBlue">
                <Mail className="w-3.5 h-3.5" />
                {doctor.official_email || `dr.${doctor.full_name.split(' ')[1]?.toLowerCase()}@mediconnect.ai`}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5" />
                {doctor.phone || '+91 98765 43210'}
              </span>
              <span>Reg No: {doctor.registration_number || 'MCI-84920'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => onChatWithAI && onChatWithAI(doctor)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with AI About This Doctor</span>
          </button>
        </div>
      </div>

      {/* Grid: Doctor Info & Diseases Treated / Booking Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Biography, Diseases Treated & Languages */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Biography */}
          <div className="medical-card p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-apolloBlue" />
              <span>Doctor Biography & Clinical Expertise</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {doctor.biography || `${doctor.full_name} is a highly accomplished specialist in ${doctor.department} with over ${doctor.experience_years} years of experience diagnosing and treating complex conditions.`}
            </p>
          </div>

          {/* Diseases Treated (Highlight Component) */}
          <div className="medical-card p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Diseases & Conditions Treated</span>
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {(doctor.diseases_treated || [
                "Heart Attack", "Chest Pain", "High Blood Pressure", "Coronary Artery Disease", "Heart Failure"
              ]).map((disease, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{disease}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Hospital */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="medical-card p-5 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-apolloBlue" />
                <span>Languages Spoken</span>
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {(doctor.languages_spoken || ["English", "Hindi"]).join(", ")}
              </p>
            </div>

            <div className="medical-card p-5 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Primary Hospital</span>
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {doctor.hospital_name || doctor.hospital || "SmartHospital Central Hospital"}
              </p>
            </div>
          </div>

          {/* Patient Reviews List */}
          <div className="medical-card p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Verified Patient Reviews ({doctor.reviews_count || 120})</span>
            </h3>

            <div className="space-y-3">
              {(doctor.patient_reviews || [
                {
                  reviewer: "Anand V.",
                  rating: 5,
                  date: "2 days ago",
                  comment: "Dr. Rajesh diagnosed my cardiac blockage accurately and explained the treatment procedure very clearly."
                },
                {
                  reviewer: "Meena S.",
                  rating: 5,
                  date: "1 week ago",
                  comment: "Highly skilled doctor. My condition has been well under control thanks to his treatment."
                }
              ]).map((rev, rIdx) => (
                <div key={rIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800 dark:text-slate-100">{rev.reviewer}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{rev.rating}.0</span>
                      <span className="text-slate-400 text-[10px] ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Appointment Booking Panel */}
        <div className="medical-card p-6 space-y-5 h-fit sticky top-6">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              Schedule Consultation
            </h3>
            <p className="text-xs text-slate-500">Select an available slot today or upcoming days</p>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">In-Person Consultation:</span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{doctor.consultation_fee || "$50 / ₹1500"}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 dark:border-slate-700">
              <span className="font-semibold text-slate-500">Online Video Consultation:</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">{doctor.online_consultation_fee || "$35 / ₹1000"}</span>
            </div>
          </div>

          {/* Available Slots */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-apolloBlue" />
              <span>Available Time Slots Today</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {(doctor.available_time_slots || ["09:00 AM", "10:30 AM", "02:30 PM", "04:00 PM"]).map((slot, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedSlot === slot
                      ? 'bg-apolloBlue text-white border-apolloBlue shadow-md shadow-apolloBlue/20 scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-apolloBlue'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Confirmation Box */}
          {bookingSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-extrabold text-sm text-emerald-900 dark:text-emerald-200">Appointment Scheduled!</h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                Confirmed with {doctor.full_name} for today at {selectedSlot}. Token #APT-9042 generated.
              </p>
            </div>
          ) : (
            <button 
              onClick={handleBook}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-xl shadow-apolloBlue/25 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{loading ? 'Confirming Appointment...' : `Book Appointment (${selectedSlot})`}</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
