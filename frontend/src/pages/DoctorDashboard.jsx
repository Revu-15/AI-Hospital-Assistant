import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, User, FileText, Pill, CheckCircle2, Clock, 
  Bot, AlertCircle, Calendar, Search, ShieldCheck, ArrowLeft,
  ChevronRight, Activity, Eye, Filter, Check, X, Shield, Award, MapPin
} from 'lucide-react';
import { apiService } from '../api/client';

const MASTER_DOCTORS = [
  { id: 101, full_name: "Dr. Rajesh Kumar", official_email: "dr.rajesh@mediconnect.ai", department: "Cardiology", qualification: "MBBS, MD, DM Cardiology", experience_years: 15, consultation_fee: "$50 / ₹1500", room_number: "Room 201, OPD Wing A", specialization: "Interventional Cardiology & Coronary Angioplasty", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 102, full_name: "Dr. Priya Sharma", official_email: "dr.priya@mediconnect.ai", department: "Neurology", qualification: "MBBS, MD, DM Neurology", experience_years: 12, consultation_fee: "$55 / ₹1600", room_number: "Room 304, Neuro Tower B", specialization: "Stroke Management & Epilepsy Care", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 103, full_name: "Dr. Anil Verma", official_email: "dr.anil@mediconnect.ai", department: "Orthopedics", qualification: "MBBS, MS Orthopedics", experience_years: 16, consultation_fee: "$60 / ₹1800", room_number: "Room 108, Bone & Joint Wing", specialization: "Joint Replacement & Arthroscopy", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 104, full_name: "Dr. Kavitha Reddy", official_email: "dr.kavitha@mediconnect.ai", department: "Dermatology", qualification: "MBBS, MD Dermatology", experience_years: 10, consultation_fee: "$45 / ₹1200", room_number: "Room 104, Skin Clinic", specialization: "Cosmetic Dermatology & Laser Therapy", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 105, full_name: "Dr. Rohit Mehta", official_email: "dr.rohit@mediconnect.ai", department: "Pediatrics", qualification: "MBBS, MD Pediatrics", experience_years: 11, consultation_fee: "$40 / ₹1100", room_number: "Room 102, Child OPD", specialization: "Child Development & Immunization", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 106, full_name: "Dr. Sneha Patel", official_email: "dr.sneha@mediconnect.ai", department: "Gynecology", qualification: "MBBS, MS Gynecology", experience_years: 15, consultation_fee: "$50 / ₹1400", room_number: "Room 205, Maternity Wing", specialization: "High-Risk Pregnancy & Laparoscopic Surgery", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 107, full_name: "Dr. Arjun Nair", official_email: "dr.arjun@mediconnect.ai", department: "ENT Specialist", qualification: "MBBS, MS ENT", experience_years: 13, consultation_fee: "$45 / ₹1300", room_number: "Room 112, ENT Wing", specialization: "Sinus Surgery & Hearing Loss Care", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 108, full_name: "Dr. Meera Iyer", official_email: "dr.meera@mediconnect.ai", department: "Ophthalmologist", qualification: "MBBS, MS Ophthalmology", experience_years: 14, consultation_fee: "$45 / ₹1250", room_number: "Room 101, Eye Clinic", specialization: "Cataract & Lasik Surgery", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 109, full_name: "Dr. Vikram Singh", official_email: "dr.vikram@mediconnect.ai", department: "Psychiatrist", qualification: "MBBS, MD Psychiatry", experience_years: 18, consultation_fee: "$60 / ₹1700", room_number: "Room 402, Wellness Wing", specialization: "Cognitive Therapy & Clinical Anxiety", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 110, full_name: "Dr. Pooja Desai", official_email: "dr.pooja@mediconnect.ai", department: "General Medicine", qualification: "MBBS, MD Internal Medicine", experience_years: 12, consultation_fee: "$40 / ₹1200", room_number: "Room 105, General OPD", specialization: "Chronic Disease Management & Diabetes", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 111, full_name: "Dr. Kiran Rao", official_email: "dr.kiran@mediconnect.ai", department: "Nephrology", qualification: "MBBS, DM Nephrology", experience_years: 17, consultation_fee: "$60 / ₹1800", room_number: "Room 401, Kidney Unit", specialization: "Kidney Transplant & Dialysis Management", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 112, full_name: "Dr. Deepak Joshi", official_email: "dr.deepak@mediconnect.ai", department: "Gastroenterology", qualification: "MBBS, DM Gastroenterology", experience_years: 15, consultation_fee: "$65 / ₹2000", room_number: "Room 302, Gastro Wing", specialization: "Endoscopy & Liver Care", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 113, full_name: "Dr. Nisha Gupta", official_email: "dr.nisha@mediconnect.ai", department: "Endocrinology", qualification: "MBBS, DM Endocrinology", experience_years: 13, consultation_fee: "$50 / ₹1500", room_number: "Room 208, Hormone OPD", specialization: "Thyroid Disorders & Hormonal Health", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 114, full_name: "Dr. Sanjay Kulkarni", official_email: "dr.sanjay@mediconnect.ai", department: "Pulmonology", qualification: "MBBS, DM Pulmonology", experience_years: 16, consultation_fee: "$50 / ₹1500", room_number: "Room 106, Lung Care OPD", specialization: "Respiratory Care & Sleep Apnea", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 115, full_name: "Dr. Lakshmi Devi", official_email: "dr.lakshmi@mediconnect.ai", department: "Oncology", qualification: "MBBS, DM Medical Oncology", experience_years: 20, consultation_fee: "$75 / ₹2200", room_number: "Room 501, Oncology Wing", specialization: "Chemotherapy & Targeted Immunotherapy", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 116, full_name: "Dr. Amit Agarwal", official_email: "dr.amit@mediconnect.ai", department: "Urology", qualification: "MBBS, MCh Urology", experience_years: 14, consultation_fee: "$60 / ₹1800", room_number: "Room 305, Urology OPD", specialization: "Kidney Stone Laser Lithotripsy", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 117, full_name: "Dr. Harish Babu", official_email: "dr.harish@mediconnect.ai", department: "Radiology", qualification: "MBBS, MD Radiology", experience_years: 12, consultation_fee: "$45 / ₹1300", room_number: "Room 102, Imaging Center", specialization: "MRI & CT Angiography", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 118, full_name: "Dr. Swathi Krishna", official_email: "dr.swathi@mediconnect.ai", department: "Anesthesiology", qualification: "MBBS, MD Anesthesiology", experience_years: 15, consultation_fee: "$50 / ₹1500", room_number: "Room 201, OT Block", specialization: "Critical Pain Management & Anesthesia", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 119, full_name: "Dr. Naveen Reddy", official_email: "dr.naveen@mediconnect.ai", department: "Emergency Medicine", qualification: "MBBS, MEM Emergency Medicine", experience_years: 11, consultation_fee: "$55 / ₹1600", room_number: "Trauma Care ER 1", specialization: "Acute Trauma Resuscitation", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 120, full_name: "Dr. Divya Menon", official_email: "dr.divya@mediconnect.ai", department: "Rheumatology", qualification: "MBBS, DM Rheumatology", experience_years: 13, consultation_fee: "$50 / ₹1500", room_number: "Room 206, Joint Clinic", specialization: "Autoimmune Joint Disorders", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" }
];

const MASTER_APPOINTMENTS_STORE = [
  {
    id: "APT-801",
    patient_id: "PAT-1001",
    patient_name: "Rahul Verma",
    doctor_id: 101,
    doctor_name: "Dr. Rajesh Kumar",
    department: "Cardiology",
    date: "2026-08-02",
    time: "10:30 AM",
    symptoms: "Chest tightness on physical exertion & shortness of breath",
    status: "Upcoming",
    payment_status: "Paid",
    medical_report: "ECG Baseline & Blood Pressure Report Attached"
  },
  {
    id: "APT-802",
    patient_id: "PAT-1002",
    patient_name: "Sarah Connor",
    doctor_id: 102,
    doctor_name: "Dr. Priya Sharma",
    department: "Neurology",
    date: "2026-08-02",
    time: "11:30 AM",
    symptoms: "Persistent throbbing migraine headaches for 3 days",
    status: "Confirmed",
    payment_status: "Paid",
    medical_report: "Brain MRI Scan & Neurological Examination Summary"
  },
  {
    id: "APT-803",
    patient_id: "PAT-1003",
    patient_name: "Vikram Singh",
    doctor_id: 103,
    doctor_name: "Dr. Anil Verma",
    department: "Orthopedics",
    date: "2026-08-02",
    time: "02:00 PM",
    symptoms: "Severe knee joint stiffness and chronic swelling",
    status: "Upcoming",
    payment_status: "Pending",
    medical_report: "Right Knee X-Ray & Joint Fluid Analysis Report"
  },
  {
    id: "APT-804",
    patient_id: "PAT-1004",
    patient_name: "Ananya Roy",
    doctor_id: 101,
    doctor_name: "Dr. Rajesh Kumar",
    department: "Cardiology",
    date: "2026-08-02",
    time: "03:30 PM",
    symptoms: "High blood pressure & palpitations during work stress",
    status: "Confirmed",
    payment_status: "Paid",
    medical_report: "24-Hour Holter Monitor Report & Lipid Profile"
  },
  {
    id: "APT-805",
    patient_id: "PAT-1005",
    patient_name: "Karan Johar",
    doctor_id: 104,
    doctor_name: "Dr. Kavitha Reddy",
    department: "Dermatology",
    date: "2026-08-02",
    time: "04:30 PM",
    symptoms: "Acne flare-ups and facial skin inflammation",
    status: "Confirmed",
    payment_status: "Paid",
    medical_report: "Skin Biopsy & Allergy Panel Summary"
  }
];

export default function DoctorDashboard({ currentUser }) {
  const [doctorsList, setDoctorsList] = useState(MASTER_DOCTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Selected Doctor for Scoped Appointments View
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState(MASTER_APPOINTMENTS_STORE);

  // Consultation Modal State
  const [consultingAppt, setConsultingAppt] = useState(null);
  const [consultForm, setConsultForm] = useState({
    diagnosis: '',
    prescription: '',
    dosage: '',
    medical_advice: '',
    notes: ''
  });
  const [consultSuccess, setConsultSuccess] = useState('');

  useEffect(() => {
    loadDoctors();
    loadAppointments();
    const interval = setInterval(loadAppointments, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await apiService.getDoctors();
      if (res.data?.doctors && res.data.doctors.length > 0) {
        setDoctorsList(res.data.doctors);
      }
    } catch (e) {
      setDoctorsList(MASTER_DOCTORS);
    }
  };

  const loadAppointments = async () => {
    let combined = [];

    // 1. Load local appointments stored during booking
    try {
      const saved = JSON.parse(localStorage.getItem('user_appointments') || '[]');
      if (Array.isArray(saved)) {
        combined = [...saved];
      }
    } catch (e) {}

    // 2. Load backend appointments
    try {
      const res = await apiService.getAppointments();
      if (res.data?.appointments && Array.isArray(res.data.appointments)) {
        const existingIds = new Set(combined.map(a => String(a.id)));
        res.data.appointments.forEach(a => {
          if (!existingIds.has(String(a.id))) {
            combined.push(a);
          }
        });
      }
    } catch (e) {
      console.log('Appointments fetch fallback');
    }

    // 3. Fallback to master mock appointments
    const existingIds = new Set(combined.map(a => String(a.id)));
    MASTER_APPOINTMENTS_STORE.forEach(a => {
      if (!existingIds.has(String(a.id))) {
        combined.push(a);
      }
    });

    setAppointments(combined);
  };

  const departments = [
    'All', 'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 
    'Gynecology', 'Pediatrics', 'ENT Specialist', 'Ophthalmologist', 
    'Psychiatrist', 'General Medicine', 'Gastroenterology', 'Endocrinology', 
    'Nephrology', 'Pulmonology', 'Oncology'
  ];

  // Filtering doctors for the master grid
  const filteredDoctors = doctorsList.filter(d => {
    const matchesDept = (selectedDept === 'All') || (d.department?.toLowerCase() === selectedDept.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || (
      d.full_name?.toLowerCase().includes(q) ||
      d.department?.toLowerCase().includes(q) ||
      d.specialization?.toLowerCase().includes(q)
    );
    return matchesDept && matchesQuery;
  });

  // Calculate doctor appointment count
  const getDoctorAppointmentCount = (doc) => {
    return appointments.filter(a => 
      a.doctor_id === doc.id || a.doctor_name?.toLowerCase() === doc.full_name?.toLowerCase()
    ).length;
  };

  const handleOpenConsultation = (appt) => {
    setConsultingAppt(appt);
    setConsultForm({
      diagnosis: '',
      prescription: '',
      dosage: '',
      medical_advice: '',
      notes: ''
    });
    setConsultSuccess('');
  };

  const handleCompleteConsultationSubmit = async (e) => {
    e.preventDefault();
    if (!consultingAppt) return;

    try {
      await apiService.completeConsultation({
        appointment_id: consultingAppt.id,
        diagnosis: consultForm.diagnosis,
        clinical_notes: consultForm.notes,
        recommended_lab_tests: [consultForm.prescription]
      });
    } catch (e) {
      console.log('Consultation complete fallback');
    }

    // Update appointment status in local state
    setAppointments(prev => prev.map(a => 
      a.id === consultingAppt.id ? { ...a, status: "Completed", diagnosis: consultForm.diagnosis } : a
    ));

    setConsultSuccess(`Consultation for ${consultingAppt.patient_name} marked as COMPLETED! Prescription issued.`);
    
    setTimeout(() => {
      setConsultingAppt(null);
      setConsultSuccess('');
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Logged in Doctor Portal Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-apolloBlue flex items-center justify-center text-white font-black text-2xl shadow-lg">
            🩺
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full bg-apolloBlue text-white">
                Master Doctor Portal
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Authorized Login: doctor@mediconnect.ai
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black mt-1">SmartHospital AI • Doctor Portal</h1>
            <p className="text-xs text-slate-300">
              Logged in as Master Consultant • Access all 20 doctor appointment queues & EHR records
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-center">
            <p className="text-[10px] text-slate-400">Master Doctor Email</p>
            <p className="font-mono text-apolloBlue font-extrabold">doctor@mediconnect.ai</p>
          </div>
        </div>
      </div>

      {/* Top Doctor Statistics Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="medical-card p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Total Hospital Doctors</span>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{doctorsList.length} Doctors</p>
          <p className="text-[10px] font-bold text-emerald-600">Across 15 Departments</p>
        </div>

        <div className="medical-card p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Today's Appointments</span>
          <p className="text-2xl font-black text-apolloBlue">{appointments.length} Bookings</p>
          <p className="text-[10px] font-bold text-apolloBlue">Real-Time Patient Queue</p>
        </div>

        <div className="medical-card p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Completed Consultations</span>
          <p className="text-2xl font-black text-emerald-600">
            {appointments.filter(a => a.status === 'Completed').length} Visits
          </p>
          <p className="text-[10px] font-bold text-emerald-600">Prescriptions Issued</p>
        </div>

        <div className="medical-card p-4 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active OPD Rooms</span>
          <p className="text-2xl font-black text-purple-600">20 Rooms</p>
          <p className="text-[10px] font-bold text-purple-600">Fully Staffed & Operational</p>
        </div>
      </div>

      {/* CONDITIONAL VIEW: ALL DOCTORS GRID VS SELECTED DOCTOR APPOINTMENTS */}
      {!selectedDoctor ? (
        
        /* VIEW 1: ALL DOCTORS CARDS GRID */
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Hospital Doctors Directory ({filteredDoctors.length})
              </h2>
              <p className="text-xs text-slate-500">
                Select any doctor to view their dedicated patient appointment list and start consultations.
              </p>
            </div>

            {/* Controls: Search & Department Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search doctor or specialization..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full sm:w-48 p-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100 font-semibold"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doc => {
              const apptCnt = getDoctorAppointmentCount(doc);
              return (
                <div key={doc.id} className="medical-card p-6 space-y-4 flex flex-col justify-between hover:border-apolloBlue transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <img 
                        src={doc.professional_photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"} 
                        alt={doc.full_name} 
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300">
                          {doc.department}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 leading-tight">
                          {doc.full_name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {doc.qualification || 'MBBS, MD'} • {doc.experience_years || 12} Yrs Exp
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      <strong>Specialization:</strong> {doc.specialization || `${doc.department} Care`}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 font-medium">OPD Room:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{doc.room_number || 'Room 201'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Today's Appointments:</span>
                      <span className="px-2.5 py-0.5 rounded-full font-black bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {apptCnt > 0 ? `${apptCnt} Bookings` : '1 Scheduled'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="w-full py-3 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Appointments</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      ) : (

        /* VIEW 2: DEDICATED APPOINTMENTS VIEW FOR SELECTED DOCTOR */
        <div className="space-y-6 animate-in fade-in">
          
          {/* Header Bar with Back Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-apolloBlue hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Doctors</span>
              </button>

              <div className="flex items-center gap-3">
                <img 
                  src={selectedDoctor.professional_photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"} 
                  alt={selectedDoctor.full_name} 
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                    Appointments for {selectedDoctor.full_name}
                  </h2>
                  <p className="text-xs text-apolloBlue font-semibold">
                    {selectedDoctor.department} • {selectedDoctor.specialization} • {selectedDoctor.room_number || 'Room 201'}
                  </p>
                </div>
              </div>
            </div>

            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-extrabold text-xs self-start sm:self-center">
              Showing Only {selectedDoctor.full_name}'s Patients
            </span>
          </div>

          {/* Scoped Doctor Appointments Table */}
          <div className="medical-card p-6 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              Active Patient Consultations & EHR List
            </h3>

            {/* Filter appointments strictly for selected doctor */}
            {(() => {
              const docAppts = appointments.filter(a => 
                a.doctor_id === selectedDoctor.id || a.doctor_name?.toLowerCase() === selectedDoctor.full_name?.toLowerCase()
              );

              const todayStr = new Date().toISOString().split('T')[0];

              // Categorize doctor appointments
              const displayAppts = docAppts.length > 0 ? docAppts : [];

              if (displayAppts.length === 0) {
                return (
                  <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">No active appointments found for {selectedDoctor.full_name}.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Appointments booked for this doctor will appear here in real-time.</p>
                  </div>
                );
              }

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
                    <thead className="text-[10px] font-extrabold uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3">Patient Name & ID</th>
                        <th className="p-3">Appt Date & Time</th>
                        <th className="p-3">Symptoms Summary</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Medical Reports</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                      {displayAppts.map(a => (
                        <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3">
                            <p className="font-extrabold text-slate-900 dark:text-slate-100">{a.patient_name}</p>
                            <p className="text-[10px] font-mono text-apolloBlue">{a.patient_id || 'PAT-1001'}</p>
                          </td>

                          <td className="p-3 whitespace-nowrap">
                            <p className="font-bold">{a.date}</p>
                            <p className="text-slate-500 text-[11px]">{a.time}</p>
                          </td>

                          <td className="p-3 max-w-xs">
                            <p className="line-clamp-2 text-slate-600 dark:text-slate-300">"{a.symptoms}"</p>
                          </td>

                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              a.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' :
                              a.status === 'Upcoming' ? 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300' :
                              a.status === 'Confirmed' ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300' :
                              a.status === 'Missed' ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300' :
                              'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
                            }`}>
                              {a.status || 'Confirmed'}
                            </span>
                          </td>

                          <td className="p-3">
                            <span className={`font-bold ${a.payment_status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {a.payment_status || 'Paid'}
                            </span>
                          </td>

                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 text-[11px] text-apolloBlue hover:underline cursor-pointer">
                              <FileText className="w-3.5 h-3.5" />
                              <span>{a.medical_report || 'View OCR Report'}</span>
                            </span>
                          </td>

                          <td className="p-3">
                            {a.status === 'Completed' ? (
                              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Consulted</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleOpenConsultation(a)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all flex items-center gap-1 shrink-0"
                              >
                                <Stethoscope className="w-3.5 h-3.5" />
                                <span>Start Consultation</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>

        </div>

      )}

      {/* Consultation Modal */}
      {consultingAppt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 sm:p-8 max-w-xl w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Consultation Record for {consultingAppt.patient_name}
                </h3>
                <p className="text-xs text-slate-500">Doctor: {selectedDoctor?.full_name || consultingAppt.doctor_name}</p>
              </div>
              <button onClick={() => setConsultingAppt(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            {consultSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-200 font-extrabold text-xs text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <p>{consultSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleCompleteConsultationSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Diagnosis *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Essential Hypertension / Angina"
                    value={consultForm.diagnosis}
                    onChange={e => setConsultForm({...consultForm, diagnosis: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Prescribed Medication *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Amlodipine 5mg"
                      value={consultForm.prescription}
                      onChange={e => setConsultForm({...consultForm, prescription: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Dosage & Frequency</label>
                    <input 
                      type="text"
                      placeholder="e.g. 1 Tablet daily after breakfast"
                      value={consultForm.dosage}
                      onChange={e => setConsultForm({...consultForm, dosage: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Medical Advice for Patient</label>
                  <input 
                    type="text"
                    placeholder="e.g. Maintain low sodium diet, follow up in 2 weeks"
                    value={consultForm.medical_advice}
                    onChange={e => setConsultForm({...consultForm, medical_advice: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Notes (Internal)</label>
                  <textarea 
                    rows={2}
                    placeholder="Internal progress notes..."
                    value={consultForm.notes}
                    onChange={e => setConsultForm({...consultForm, notes: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setConsultingAppt(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                  >
                    Complete & Issue Prescription
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
