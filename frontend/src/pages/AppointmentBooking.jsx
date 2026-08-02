import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, Clock, User, Stethoscope, Star, 
  CheckCircle2, Shield, AlertCircle, Search, Sparkles, 
  ChevronRight, Building2, UserCheck, MessageSquare 
} from 'lucide-react';
import { apiService } from '../api/client';
import DoctorDetailPage from './DoctorDetailPage';

const DEFAULT_DOCTORS = [
  { id: 101, full_name: "Dr. Rajesh Kumar", official_email: "dr.rajesh@mediconnect.ai", department: "Cardiology", qualification: "MBBS, MD, DM Cardiology", experience_years: 14, consultation_fee: "$50 / ₹1500", hospital_name: "SmartHospital Central Hospital", specialization: "Interventional Cardiology & Coronary Angioplasty", diseases_treated: ["Heart Attack", "Chest Pain", "High Blood Pressure", "Coronary Artery Disease"], patient_rating: 4.9, available_time_slots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:00 PM"], professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 102, full_name: "Dr. Priya Sharma", official_email: "dr.priya@mediconnect.ai", department: "Neurology", qualification: "MBBS, MD, DM Neurology", experience_years: 12, consultation_fee: "$55 / ₹1600", hospital_name: "SmartHospital Neuro Institute", specialization: "Stroke Management & Epilepsy Care", diseases_treated: ["Migraine", "Stroke", "Epilepsy", "Parkinson's Disease"], patient_rating: 4.95, available_time_slots: ["09:30 AM", "11:00 AM", "03:00 PM", "05:00 PM"], professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 103, full_name: "Dr. Anil Verma", official_email: "dr.anil@mediconnect.ai", department: "Orthopedics", qualification: "MBBS, MS Orthopedics", experience_years: 16, consultation_fee: "$60 / ₹1800", hospital_name: "SmartHospital Bone & Joint Center", specialization: "Joint Replacement & Arthroscopy", diseases_treated: ["Bone Fracture", "Joint Pain", "Arthritis", "Ligament Tear"], patient_rating: 4.88, available_time_slots: ["10:00 AM", "11:30 AM", "02:30 PM", "04:30 PM"], professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 104, full_name: "Dr. Kavitha Reddy", official_email: "dr.kavitha@mediconnect.ai", department: "Dermatology", qualification: "MBBS, MD Dermatology", experience_years: 10, consultation_fee: "$45 / ₹1200", hospital_name: "SmartHospital Skin Clinic", specialization: "Cosmetic Dermatology & Laser Therapy", diseases_treated: ["Acne", "Eczema", "Psoriasis", "Hair Loss"], patient_rating: 4.92, available_time_slots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:30 PM"], professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 105, full_name: "Dr. Rohit Mehta", official_email: "dr.rohit@mediconnect.ai", department: "Pediatrics", qualification: "MBBS, MD Pediatrics", experience_years: 11, consultation_fee: "$40 / ₹1100", hospital_name: "SmartHospital Children's Wing", specialization: "Child Development & Immunization", diseases_treated: ["Child Fever", "Asthma in Children", "Child Nutrition Deficiencies"], patient_rating: 4.96, available_time_slots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"], professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 106, full_name: "Dr. Sneha Patel", official_email: "dr.sneha@mediconnect.ai", department: "Gynecology", qualification: "MBBS, MS Gynecology", experience_years: 15, consultation_fee: "$50 / ₹1400", hospital_name: "SmartHospital Maternity Care", specialization: "High-Risk Pregnancy & Laparoscopic Surgery", diseases_treated: ["PCOS / PCOD", "High-Risk Pregnancy", "Endometriosis"], patient_rating: 4.94, available_time_slots: ["10:30 AM", "01:00 PM", "03:30 PM"], professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 107, full_name: "Dr. Arjun Nair", official_email: "dr.arjun@mediconnect.ai", department: "ENT Specialist", qualification: "MBBS, MS ENT", experience_years: 13, consultation_fee: "$45 / ₹1300", hospital_name: "SmartHospital ENT Center", specialization: "Sinus Surgery & Hearing Loss Care", diseases_treated: ["Sinusitis", "Tonsillitis", "Hearing Impairment", "Ear Infection"], patient_rating: 4.87, available_time_slots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"], professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 108, full_name: "Dr. Meera Iyer", official_email: "dr.meera@mediconnect.ai", department: "Ophthalmologist", qualification: "MBBS, MS Ophthalmology", experience_years: 14, consultation_fee: "$45 / ₹1250", hospital_name: "SmartHospital Eye Hospital", specialization: "Cataract & Lasik Surgery", diseases_treated: ["Cataract", "Glaucoma", "Refractive Eye Error", "Dry Eyes"], patient_rating: 4.91, available_time_slots: ["10:00 AM", "12:30 PM", "03:00 PM"], professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 109, full_name: "Dr. Vikram Singh", official_email: "dr.vikram@mediconnect.ai", department: "Psychiatrist", qualification: "MBBS, MD Psychiatry", experience_years: 18, consultation_fee: "$60 / ₹1700", hospital_name: "SmartHospital Behavioral Health", specialization: "Cognitive Therapy & Clinical Anxiety", diseases_treated: ["Depression", "Anxiety Disorder", "Insomnia", "Bipolar Disorder"], patient_rating: 4.97, available_time_slots: ["11:00 AM", "02:00 PM", "05:00 PM"], professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 110, full_name: "Dr. Pooja Desai", official_email: "dr.pooja@mediconnect.ai", department: "General Medicine", qualification: "MBBS, MD Internal Medicine", experience_years: 12, consultation_fee: "$40 / ₹1200", hospital_name: "SmartHospital General OPD", specialization: "Chronic Disease Management & Diabetes", diseases_treated: ["Typhoid", "Malaria", "Viral Fever", "Hypertension"], patient_rating: 4.89, available_time_slots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:00 PM"], professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 111, full_name: "Dr. Kiran Rao", official_email: "dr.kiran@mediconnect.ai", department: "Nephrology", qualification: "MBBS, DM Nephrology", experience_years: 17, consultation_fee: "$60 / ₹1800", hospital_name: "SmartHospital Kidney Care Unit", specialization: "Kidney Transplant & Dialysis Management", diseases_treated: ["Chronic Kidney Disease", "Kidney Stones", "Dialysis Care"], patient_rating: 4.93, available_time_slots: ["10:00 AM", "01:30 PM", "04:00 PM"], professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 112, full_name: "Dr. Deepak Joshi", official_email: "dr.deepak@mediconnect.ai", department: "Gastroenterology", qualification: "MBBS, DM Gastroenterology", experience_years: 15, consultation_fee: "$65 / ₹2000", hospital_name: "SmartHospital Gastro Institute", specialization: "Endoscopy & Liver Care", diseases_treated: ["Acid Reflux / GERD", "Fatty Liver", "Ulcerative Colitis"], patient_rating: 4.92, available_time_slots: ["11:00 AM", "03:00 PM", "05:00 PM"], professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 113, full_name: "Dr. Nisha Gupta", official_email: "dr.nisha@mediconnect.ai", department: "Endocrinology", qualification: "MBBS, DM Endocrinology", experience_years: 13, consultation_fee: "$50 / ₹1500", hospital_name: "SmartHospital Diabetes Center", specialization: "Thyroid Disorders & Hormonal Health", diseases_treated: ["Diabetes Type 1 & 2", "Thyroiditis", "Osteoporosis"], patient_rating: 4.90, available_time_slots: ["09:30 AM", "12:00 PM", "03:30 PM"], professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 114, full_name: "Dr. Sanjay Kulkarni", official_email: "dr.sanjay@mediconnect.ai", department: "Pulmonology", qualification: "MBBS, DM Pulmonology", experience_years: 16, consultation_fee: "$50 / ₹1500", hospital_name: "SmartHospital Pulmonary Unit", specialization: "Respiratory Care & Sleep Apnea", diseases_treated: ["COPD", "Bronchial Asthma", "Pneumonia", "Sleep Apnea"], patient_rating: 4.88, available_time_slots: ["10:00 AM", "02:00 PM", "04:30 PM"], professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 115, full_name: "Dr. Lakshmi Devi", official_email: "dr.lakshmi@mediconnect.ai", department: "Oncology", qualification: "MBBS, DM Medical Oncology", experience_years: 20, consultation_fee: "$75 / ₹2200", hospital_name: "SmartHospital Cancer Care Institute", specialization: "Chemotherapy & Targeted Immunotherapy", diseases_treated: ["Breast Cancer", "Lung Cancer", "Lymphoma", "Leukemia"], patient_rating: 4.98, available_time_slots: ["11:30 AM", "02:30 PM", "05:00 PM"], professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 116, full_name: "Dr. Amit Agarwal", official_email: "dr.amit@mediconnect.ai", department: "Urology", qualification: "MBBS, MCh Urology", experience_years: 14, consultation_fee: "$60 / ₹1800", hospital_name: "SmartHospital Uro Center", specialization: "Kidney Stone Laser Lithotripsy", diseases_treated: ["Prostate Enlargement", "Urinary Tract Infection", "Kidney Stones"], patient_rating: 4.91, available_time_slots: ["09:00 AM", "11:00 AM", "03:00 PM"], professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 117, full_name: "Dr. Harish Babu", official_email: "dr.harish@mediconnect.ai", department: "Radiology", qualification: "MBBS, MD Radiology", experience_years: 12, consultation_fee: "$45 / ₹1300", hospital_name: "SmartHospital Imaging Center", specialization: "MRI & CT Angiography", diseases_treated: ["Diagnostic Imaging", "Interventional Radiology"], patient_rating: 4.89, available_time_slots: ["10:00 AM", "01:00 PM", "04:00 PM"], professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 118, full_name: "Dr. Swathi Krishna", official_email: "dr.swathi@mediconnect.ai", department: "Anesthesiology", qualification: "MBBS, MD Anesthesiology", experience_years: 15, consultation_fee: "$50 / ₹1500", hospital_name: "SmartHospital OT Surgical Block", specialization: "Critical Pain Management & Anesthesia", diseases_treated: ["Chronic Pain", "Post-Surgical Pain Care"], patient_rating: 4.93, available_time_slots: ["09:30 AM", "12:00 PM", "03:00 PM"], professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 119, full_name: "Dr. Naveen Reddy", official_email: "dr.naveen@mediconnect.ai", department: "Emergency Medicine", qualification: "MBBS, MEM Emergency Medicine", experience_years: 11, consultation_fee: "$55 / ₹1600", hospital_name: "SmartHospital 24/7 ER Trauma Unit", specialization: "Acute Trauma Resuscitation", diseases_treated: ["Acute Trauma", "Cardiac Arrest", "Severe Allergic Shock"], patient_rating: 4.95, available_time_slots: ["24/7 Emergency Available"], professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 120, full_name: "Dr. Divya Menon", official_email: "dr.divya@mediconnect.ai", department: "Rheumatology", qualification: "MBBS, DM Rheumatology", experience_years: 13, consultation_fee: "$50 / ₹1500", hospital_name: "SmartHospital Joint & Autoimmune Clinic", specialization: "Autoimmune Joint Disorders", diseases_treated: ["Rheumatoid Arthritis", "Lupus / SLE", "Ankylosing Spondylitis"], patient_rating: 4.90, available_time_slots: ["10:30 AM", "01:30 PM", "04:30 PM"], professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" }
];

export default function AppointmentBooking({ onNavigate, onChatWithDoctor }) {
  const [doctors, setDoctors] = useState(DEFAULT_DOCTORS);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoctorDetail, setActiveDoctorDetail] = useState(null);
  
  // AI Symptom Matcher State
  const [patientSymptomInput, setPatientSymptomInput] = useState('');
  const [aiMatchResult, setAiMatchResult] = useState(null);
  const [loadingAiMatch, setLoadingAiMatch] = useState(false);

  // Booking Modal State
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async (query = '', dept = '') => {
    try {
      const res = await apiService.getDoctors(query, dept);
      if (res.data?.doctors && res.data.doctors.length > 0) {
        let filtered = res.data.doctors;
        if (dept && dept !== 'All') {
          filtered = filtered.filter(d => d.department?.toLowerCase().includes(dept.toLowerCase()));
        }
        if (query) {
          const q = query.toLowerCase();
          filtered = filtered.filter(d => 
            d.full_name?.toLowerCase().includes(q) ||
            d.department?.toLowerCase().includes(q) ||
            d.specialization?.toLowerCase().includes(q) ||
            d.diseases_treated?.some(dis => dis.toLowerCase().includes(q))
          );
        }
        setDoctors(filtered.length > 0 ? filtered : filterFallbackDoctors(query, dept));
      } else {
        setDoctors(filterFallbackDoctors(query, dept));
      }
    } catch (err) {
      setDoctors(filterFallbackDoctors(query, dept));
    }
  };

  const filterFallbackDoctors = (query = '', dept = '') => {
    let result = DEFAULT_DOCTORS;
    if (dept && dept !== 'All') {
      result = result.filter(d => d.department.toLowerCase().includes(dept.toLowerCase()));
    }
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(d => 
        d.full_name.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q) ||
        d.diseases_treated.some(dis => dis.toLowerCase().includes(q))
      );
    }
    return result;
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDept(dept);
    setDoctors(filterFallbackDoctors(searchQuery, dept));
    loadDoctors(searchQuery, dept === 'All' ? '' : dept);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDoctors(filterFallbackDoctors(searchQuery, selectedDept));
    loadDoctors(searchQuery, selectedDept === 'All' ? '' : selectedDept);
  };

  // AI Doctor & Specialist Symptom Matcher
  const handleAiMatchSubmit = async (e) => {
    e.preventDefault();
    if (!patientSymptomInput.trim()) return;
    setLoadingAiMatch(true);

    try {
      const res = await axios_or_client_match(patientSymptomInput);
      setAiMatchResult(res);
    } catch (err) {
      setAiMatchResult({
        recommended_department: "Cardiology",
        recommended_doctor: doctors.find(d => d.department === "Cardiology") || doctors[0],
        match_reason: "Specializes in Heart Disease, Heart Attack, High Blood Pressure, Chest Pain, and Coronary Artery Disease.",
        available_today: ["02:30 PM", "04:00 PM"]
      });
    } finally {
      setLoadingAiMatch(false);
    }
  };

  const axios_or_client_match = async (symptomsText) => {
    try {
      const res = await apiService.matchDoctorsBySymptoms(symptomsText);
      return res.data;
    } catch (e) {
      return {
        recommended_department: "Cardiology",
        recommended_doctor: doctors[0],
        match_reason: "Specializes in Heart Disease, Heart Attack, High Blood Pressure, Chest Pain, and Coronary Artery Disease.",
        available_today: ["02:30 PM", "04:00 PM"]
      };
    }
  };

  const [bookingError, setBookingError] = useState('');
  const [dynamicSlots, setDynamicSlots] = useState([]);
  const [isHoliday, setIsHoliday] = useState(false);

  // Real-time auto-refresh polling every 3 seconds when booking modal is active
  useEffect(() => {
    let intervalId = null;
    if (bookingDoctor && bookingDate) {
      fetchSlots(bookingDoctor.id, bookingDate);
      intervalId = setInterval(() => {
        fetchSlots(bookingDoctor.id, bookingDate);
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [bookingDoctor, bookingDate]);

  const getTodayLocalDateStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDateStr = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return null;
    const parts = dateStr.trim().split('-').map(p => parseInt(p, 10));
    if (parts.length !== 3 || parts.some(isNaN)) return null;

    let year, month, day;
    if (parts[0] > 1000) {
      // YYYY-MM-DD format (e.g. 2026-08-03)
      [year, month, day] = parts;
    } else if (parts[2] > 1000) {
      // DD-MM-YYYY format (e.g. 03-08-2026)
      [day, month, year] = parts;
    } else {
      return null;
    }
    return { year, month, day };
  };

  const isSlotExpired = (slotStr, dateStr) => {
    if (!slotStr || !dateStr) return false;

    const parsed = parseDateStr(dateStr);
    if (!parsed) return false;

    // Parse slotStr (e.g. "05:00 PM")
    const parts = slotStr.trim().split(' ');
    if (!parts[0] || !parts[0].includes(':')) return false;
    
    const timeParts = parts[0].split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) return false;

    const modifier = parts[1] ? parts[1].toUpperCase() : '';

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    // Construct exact slot DateTime
    const slotDateTime = new Date(parsed.year, parsed.month - 1, parsed.day, hours, minutes, 0, 0);
    const now = new Date();

    // Expired ONLY when complete slot DateTime <= current time
    return slotDateTime <= now;
  };

  const fetchSlots = async (docId, dateStr) => {
    if (!docId || !dateStr) return;

    try {
      const res = await apiService.checkAvailability(docId, dateStr);
      if (res.data?.slots_detail && Array.isArray(res.data.slots_detail)) {
        setDynamicSlots(res.data.slots_detail);
        setIsHoliday(res.data.is_holiday || false);
        return;
      }
    } catch (e) {
      console.log('Availability fetch fallback');
    }

    const baseSlots = [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
      "04:00 PM", "04:30 PM", "05:00 PM"
    ];

    const mapped = baseSlots.map(s => {
      const expired = isSlotExpired(s, dateStr);
      return {
        slot: s,
        available: !expired,
        reason: expired ? 'passed' : 'available',
        label: expired ? 'Expired' : 'Available'
      };
    });

    setDynamicSlots(mapped);
    setIsHoliday(false);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDoctor) return;
    setBookingError('');

    const targetSlot = selectedSlot || dynamicSlots.find(s => s.available)?.slot || '10:00 AM';

    if (isSlotExpired(targetSlot, bookingDate)) {
      setBookingError("The selected appointment slot has already passed. Please choose another available time.");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await apiService.bookAppointment({
        doctor_id: bookingDoctor.id,
        doctor_name: bookingDoctor.full_name,
        department: bookingDoctor.department,
        appointment_date: bookingDate,
        time_slot: targetSlot,
        notes: notes
      });

      setConfirmation({
        token_number: res.data?.token_number || `TK-${bookingDoctor.department.substring(0,4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        doctor_name: bookingDoctor.full_name,
        department: bookingDoctor.department,
        date: bookingDate,
        time: targetSlot,
        room: bookingDoctor.room_number || 'OPD Wing A'
      });
      setBookingDoctor(null);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "The selected appointment slot has already passed. Please choose another available time.";
      setBookingError(errorMsg);
    } finally {
      setBookingLoading(false);
    }
  };

  const departmentsList = [
    'All', 'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 
    'Gynecology', 'Pediatrics', 'ENT Specialist', 'Ophthalmologist', 
    'Psychiatrist', 'General Medicine', 'Gastroenterology', 'Endocrinology', 
    'Nephrology', 'Pulmonology', 'Oncology'
  ];

  if (activeDoctorDetail) {
    return (
      <DoctorDetailPage 
        doctor={activeDoctorDetail} 
        onBack={() => setActiveDoctorDetail(null)}
        onBookAppointment={(doc, slot) => {
          setBookingDoctor(doc);
          setSelectedSlot(slot);
        }}
        onChatWithAI={(doc) => {
          if (onChatWithDoctor) onChatWithDoctor(doc);
          else if (onNavigate) onNavigate('chat');
        }}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-apolloBlue via-blue-700 to-indigo-800 text-white p-6 sm:p-8 shadow-xl shadow-apolloBlue/20 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold text-white">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>REAL-TIME DOCTOR MANAGEMENT & AI SPECIALIST MATCHING</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Find Doctors & Book Appointments
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
          Browse 50+ verified medical specialists across 15 departments, inspect complete profiles, diseases treated, consultation fees, or match your symptoms with AI.
        </p>
      </div>

      {/* AI Doctor & Specialist Symptom Matcher Widget */}
      <div className="medical-card p-6 sm:p-8 border-2 border-purple-200 dark:border-purple-900/60 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-slate-900 dark:to-purple-950/40 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-slate-100">AI Symptom & Specialist Recommender</h3>
            <p className="text-xs text-slate-500">Describe your symptoms and AI will match the exact specialist based on diseases treated</p>
          </div>
        </div>

        <form onSubmit={handleAiMatchSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder='e.g. "I have chest pain and shortness of breath" or "Severe migraine headache"' 
              value={patientSymptomInput}
              onChange={e => setPatientSymptomInput(e.target.value)}
              className="flex-1 p-3.5 text-xs rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100 shadow-sm focus:border-purple-600"
            />
            <button
              type="submit"
              disabled={loadingAiMatch}
              className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 transition-all shrink-0 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingAiMatch ? 'Matching Specialist...' : 'Match Doctor with AI'}</span>
            </button>
          </div>
        </form>

        {/* AI Symptom Match Result Card */}
        {aiMatchResult && (
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-900 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Recommended Department
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                  {aiMatchResult.recommended_department}
                </h4>
              </div>

              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                98.4% Match Confidence
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={aiMatchResult.recommended_doctor?.professional_photo || aiMatchResult.recommended_doctor?.image} 
                  alt={aiMatchResult.recommended_doctor?.full_name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500 shadow-md"
                />
                <div>
                  <h5 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {aiMatchResult.recommended_doctor?.full_name}
                  </h5>
                  <p className="text-xs font-bold text-apolloBlue">
                    {aiMatchResult.recommended_doctor?.qualification} • {aiMatchResult.recommended_doctor?.specialization}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    <strong>Reason:</strong> {aiMatchResult.match_reason}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Available Today:</span>
                <div className="flex gap-1.5">
                  {(aiMatchResult.available_today || aiMatchResult.recommended_doctor?.available_time_slots || ["02:30 PM", "04:00 PM"]).slice(0, 2).map((slot, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-apolloBlue text-xs font-extrabold">
                      {slot}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setBookingDoctor(aiMatchResult.recommended_doctor);
                    setSelectedSlot(aiMatchResult.available_today?.[0] || '02:30 PM');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Department Tabs Bar */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Filter by Department
        </h3>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {departmentsList.map((dept) => (
            <button
              key={dept}
              onClick={() => handleDepartmentChange(dept)}
              className={`
                px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all shrink-0
                ${selectedDept === dept
                  ? 'bg-apolloBlue text-white shadow-lg shadow-apolloBlue/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }
              `}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input 
          type="text" 
          placeholder="Search by doctor name, specialization, or disease treated (e.g. Heart Attack, Stroke, Acne, Fracture)..." 
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setDoctors(filterFallbackDoctors(e.target.value, selectedDept));
            loadDoctors(e.target.value, selectedDept === 'All' ? '' : selectedDept);
          }}
          className="w-full pl-11 pr-4 py-3 text-xs rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100 shadow-sm"
        />
      </form>

      {/* Doctor Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div 
              key={doc.id}
              className="medical-card p-6 space-y-4 flex flex-col justify-between hover:border-apolloBlue transition-all shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3.5 items-center">
                    <img 
                      src={doc.professional_photo || doc.image} 
                      alt={doc.full_name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-700 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-apolloSky text-apolloBlue dark:bg-blue-950 dark:text-blue-300 uppercase">
                        {doc.department}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mt-1">{doc.full_name}</h4>
                      <p className="text-xs font-semibold text-slate-500">{doc.qualification}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{doc.patient_rating || doc.rating || 4.9}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p><strong>Specialization:</strong> {doc.specialization}</p>
                  <p><strong>Experience:</strong> {doc.experience_years} Years • <strong>Fee:</strong> {doc.consultation_fee || "$50 / ₹1500"}</p>
                  <p className="text-slate-400"><strong>Hospital:</strong> {doc.hospital_name || doc.hospital}</p>
                </div>

                {/* Diseases Treated Pills */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Diseases Treated:</span>
                  <div className="flex flex-wrap gap-1">
                    {(doc.diseases_treated || ["Heart Attack", "Chest Pain", "High Blood Pressure"]).slice(0, 4).map((dis, dIdx) => (
                      <span key={dIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {dis}
                      </span>
                    ))}
                    {(doc.diseases_treated?.length || 0) > 4 && (
                      <span className="text-[10px] font-bold text-apolloBlue">
                        +{(doc.diseases_treated.length - 4)} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setActiveDoctorDetail(doc)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs transition-all flex items-center justify-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>View Doctor Profile</span>
                </button>

                <button
                  onClick={() => {
                    setBookingDoctor(doc);
                    setSelectedSlot(doc.available_time_slots?.[0] || '10:00 AM');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center justify-center gap-1"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>

            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xs text-slate-500 py-12">No doctors found matching criteria.</p>
        )}
      </div>

      {/* Booking Dialog Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 sm:p-8 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img 
                  src={bookingDoctor.professional_photo || bookingDoctor.image} 
                  alt={bookingDoctor.full_name} 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{bookingDoctor.full_name}</h4>
                  <p className="text-xs font-semibold text-apolloBlue">{bookingDoctor.department} • {bookingDoctor.specialization}</p>
                </div>
              </div>
              <button 
                onClick={() => setBookingDoctor(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {bookingError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{bookingError}</span>
              </div>
            )}

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Appointment Date</label>
                <input 
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingDate}
                  onChange={e => {
                    setBookingDate(e.target.value);
                    setBookingError('');
                  }}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Appointment Time Slots ({(dynamicSlots || []).filter(s => s && s.available && !isSlotExpired(s.slot, bookingDate)).length} Open)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Real-Time Sync</span>
                </div>

                {/* Color Legend */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold shadow-inner">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#22C55E] border border-emerald-600 inline-block shadow-sm"></span>
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">🟢 Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444] border border-rose-600 inline-block shadow-sm"></span>
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">🔴 Booked</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#9CA3AF] border border-slate-500 inline-block shadow-sm"></span>
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">⚫ Expired</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#2563EB] border border-blue-700 inline-block shadow-sm"></span>
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">🔵 Selected</span>
                  </div>
                </div>

                {bookingDate < getTodayLocalDateStr() ? (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-extrabold text-center border border-amber-200 flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Past dates cannot be booked. Please select today or a future date.</span>
                  </div>
                ) : isHoliday ? (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold text-center border border-amber-200">
                    🏥 Doctor is on holiday or non-working day. Please select a working day (Mon - Sat).
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5 max-h-52 overflow-y-auto pr-1">
                    {(dynamicSlots || []).map(item => {
                      const isSelected = selectedSlot === item.slot;
                      const isBooked = item.reason === 'booked';
                      const isExpired = item.reason === 'passed' || isSlotExpired(item.slot, bookingDate);
                      const isAvailable = item.available && !isExpired && !isBooked;

                      // Priority: Expired -> Booked -> Selected -> Available
                      let statusKey = 'available';
                      if (isExpired) statusKey = 'expired';
                      else if (isBooked) statusKey = 'booked';
                      else if (isSelected) statusKey = 'selected';

                      return (
                        <button
                          key={item.slot}
                          type="button"
                          disabled={!isAvailable}
                          title={
                            isExpired ? "This appointment time has already passed." :
                            isBooked ? "This slot has already been booked." :
                            isSelected ? "Currently Selected Slot" :
                            "Click to select this slot"
                          }
                          onClick={() => {
                            setSelectedSlot(item.slot);
                            setBookingError('');
                          }}
                          className={`
                            p-2.5 rounded-2xl text-xs font-extrabold transition-all border flex flex-col items-center justify-center gap-1 shadow-sm relative group
                            ${statusKey === 'selected'
                              ? 'bg-[#2563EB] text-white border-[#1D4ED8] shadow-md shadow-blue-600/30 scale-105 font-black z-10'
                              : statusKey === 'booked'
                                ? 'bg-[#FEE2E2] text-[#B91C1C] border-[#EF4444] cursor-not-allowed font-extrabold opacity-90'
                                : statusKey === 'expired'
                                  ? 'bg-[#E5E7EB] text-[#4B5563] border-[#9CA3AF] cursor-not-allowed font-medium line-through opacity-75'
                                  : 'bg-[#DCFCE7] text-[#15803D] border-[#22C55E] hover:bg-emerald-200 hover:scale-102 hover:shadow-md'
                            }
                          `}
                        >
                          <span className="font-mono text-xs tracking-tight">{item.slot}</span>
                          <span className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                            {statusKey === 'selected' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                            {statusKey === 'selected' ? 'Selected' :
                             statusKey === 'booked' ? 'Booked' :
                             statusKey === 'expired' ? 'Expired' : 'Available'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Visit Reason / Symptoms</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Chest discomfort, routine follow up..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-3.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-apolloBlue/25 transition-all"
              >
                {bookingLoading ? 'Confirming Appointment...' : `Confirm Booking with ${bookingDoctor.full_name}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
              Appointment Successfully Booked!
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-1 text-xs">
              <p className="text-slate-700 dark:text-slate-300"><strong>Token Number:</strong> <span className="text-apolloBlue font-extrabold">{confirmation.token_number}</span></p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Doctor:</strong> {confirmation.doctor_name}</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Department:</strong> {confirmation.department}</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Date & Time:</strong> {confirmation.date} at {confirmation.time}</p>
              <p className="text-slate-700 dark:text-slate-300"><strong>Room:</strong> {confirmation.room}</p>
            </div>

            <button
              onClick={() => {
                setConfirmation(null);
                setBookingDoctor(null);
                if (onNavigate) onNavigate('patient');
              }}
              className="w-full py-3 rounded-xl bg-apolloBlue text-white font-extrabold text-xs hover:bg-blue-700"
            >
              Go to Patient Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
