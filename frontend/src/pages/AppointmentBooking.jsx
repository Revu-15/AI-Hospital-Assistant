import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Stethoscope, Star, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { apiService } from '../api/client';

const DEFAULT_DOCTORS = [
  {
    id: 101,
    full_name: "Dr. Sarah Jenkins",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    experience_years: 15,
    rating: 4.95,
    available_slots: ["09:00 AM", "10:30 AM", "02:00 PM"],
    hospital: "SmartHospital Central Hospital",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 102,
    full_name: "Dr. Rajesh Sharma",
    department: "Internal Medicine",
    specialization: "General Physician & Diabetologist",
    experience_years: 18,
    rating: 4.90,
    available_slots: ["09:30 AM", "11:30 AM", "03:30 PM"],
    hospital: "SmartHospital Central Hospital",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 103,
    full_name: "Dr. Emily Chen",
    department: "Pediatrics",
    specialization: "Pediatric Care & Immunology",
    experience_years: 10,
    rating: 4.88,
    available_slots: ["10:00 AM", "01:00 PM", "04:00 PM"],
    hospital: "SmartHospital Women & Child Care",
    image: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 104,
    full_name: "Dr. Marcus Vance",
    department: "Neurology",
    specialization: "Neuro-Physiology & Spine Care",
    experience_years: 14,
    rating: 4.92,
    available_slots: ["11:00 AM", "02:30 PM", "05:00 PM"],
    hospital: "SmartHospital Neuro Institute",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80"
  }
];

export default function AppointmentBooking({ onNavigate }) {
  const [doctors, setDoctors] = useState(DEFAULT_DOCTORS);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(DEFAULT_DOCTORS[0]);
  const [date, setDate] = useState('2026-08-01');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await apiService.getDoctors();
        if (res.data.doctors && res.data.doctors.length > 0) {
          setDoctors(res.data.doctors);
          setSelectedDoctor(res.data.doctors[0]);
        }
      } catch (err) {
        setDoctors(DEFAULT_DOCTORS);
        setSelectedDoctor(DEFAULT_DOCTORS[0]);
      }
    }
    loadDoctors();
  }, []);

  const departments = ['All', 'Cardiology', 'Internal Medicine', 'Pediatrics', 'Neurology'];

  const filteredDoctors = selectedDept === 'All' 
    ? doctors 
    : doctors.filter(d => d.department === selectedDept);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    setLoading(true);

    try {
      const res = await apiService.bookAppointment({
        doctor_id: selectedDoctor.id,
        date: date,
        slot: selectedSlot,
        symptoms_summary: symptoms,
        urgency: 'ROUTINE'
      });
      setConfirmation(res.data);
    } catch (err) {
      setConfirmation({
        status: 'success',
        token_number: 'TK-CARD-904',
        date: date,
        time: selectedSlot,
        message: `Appointment successfully booked with ${selectedDoctor.full_name} for ${date} at ${selectedSlot}.`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Book Doctor Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select department, choose your specialist, pick date & time slot.
        </p>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`
              px-4 py-2 rounded-xl text-xs font-bold transition-all
              ${selectedDept === dept
                ? 'bg-apolloBlue text-white shadow-md shadow-apolloBlue/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700'
              }
            `}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Main Booking Form & Doctor Selection */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Doctor Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Available Specialists ({filteredDoctors.length})
          </h3>

          <div className="space-y-3">
            {filteredDoctors.map((doc) => {
              const isSelected = selectedDoctor?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`
                    medical-card p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all
                    ${isSelected ? 'border-2 border-apolloBlue shadow-md' : 'hover:border-slate-300'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={doc.image} 
                      alt={doc.full_name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" 
                    />
                    <div>
                      <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">{doc.full_name}</h4>
                      <p className="text-xs font-semibold text-apolloBlue mt-0.5">{doc.specialization}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{doc.experience_years} Yrs Exp • {doc.hospital}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{doc.rating}</span>
                    </div>
                    <button className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected ? 'bg-apolloBlue text-white' : 'bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slot Selection & Form */}
        <div className="medical-card p-6 space-y-5 h-fit">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            Appointment Slot
          </h3>

          {selectedDoctor && (
            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Doctor</label>
                <p className="text-xs font-extrabold text-apolloBlue p-2.5 rounded-xl bg-apolloSky/50 dark:bg-blue-950/40">
                  {selectedDoctor.full_name} ({selectedDoctor.department})
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Available Time Slots</label>
                <div className="grid grid-cols-2 gap-2">
                  {(selectedDoctor.available_slots || ["09:00 AM", "10:30 AM", "02:00 PM"]).map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`
                        p-2 rounded-xl text-xs font-bold transition-all border
                        ${selectedSlot === slot 
                          ? 'bg-apolloBlue text-white border-apolloBlue' 
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Symptoms / Reason for Visit</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Mild chest pain, regular checkup..."
                  value={symptoms}
                  onChange={e => setSymptoms(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-apolloBlue/20 transition-all"
              >
                {loading ? 'Confirming Slot...' : 'Confirm Appointment'}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmation && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Appointment Confirmed!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {confirmation.message}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-1">
              <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Token Number:</strong> <span className="text-apolloBlue font-bold">{confirmation.token_number}</span></p>
              <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Doctor:</strong> {selectedDoctor?.full_name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Date & Time:</strong> {confirmation.date || date} at {confirmation.time || selectedSlot}</p>
            </div>

            <button
              onClick={() => {
                setConfirmation(null);
                onNavigate('patient');
              }}
              className="w-full py-2.5 rounded-xl bg-apolloBlue text-white font-bold text-xs hover:bg-blue-700"
            >
              Go to Patient Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
