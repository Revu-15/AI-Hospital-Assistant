import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, Stethoscope, Calendar, DollarSign, Activity, 
  Bot, Lock, CheckCircle2, AlertTriangle, Cpu, HardDrive, RefreshCw, Star,
  Plus, Edit, Trash2, Key, Eye, UserPlus, FileText, CheckCircle
} from 'lucide-react';
import { apiService } from '../api/client';

const FALLBACK_DOCTORS = [
  { id: 101, full_name: "Dr. Rajesh Kumar", official_email: "dr.rajesh@mediconnect.ai", department: "Cardiology", qualification: "MBBS, MD, DM Cardiology", consultation_fee: "$50 / ₹1500", room_number: "Room 201, OPD Wing A", status: "Available", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 102, full_name: "Dr. Priya Sharma", official_email: "dr.priya@mediconnect.ai", department: "Neurology", qualification: "MBBS, MD, DM Neurology", consultation_fee: "$55 / ₹1600", room_number: "Room 304, Neuro Tower B", status: "Available", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 103, full_name: "Dr. Anil Verma", official_email: "dr.anil@mediconnect.ai", department: "Orthopedics", qualification: "MBBS, MS Orthopedics", consultation_fee: "$60 / ₹1800", room_number: "Room 108, Bone & Joint Wing", status: "Available", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 104, full_name: "Dr. Kavitha Reddy", official_email: "dr.kavitha@mediconnect.ai", department: "Dermatology", qualification: "MBBS, MD Dermatology", consultation_fee: "$45 / ₹1200", room_number: "Room 104, Skin Clinic", status: "Available", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 105, full_name: "Dr. Rohit Mehta", official_email: "dr.rohit@mediconnect.ai", department: "Pediatrics", qualification: "MBBS, MD Pediatrics", consultation_fee: "$40 / ₹1100", room_number: "Room 102, Child OPD", status: "Available", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 106, full_name: "Dr. Sneha Patel", official_email: "dr.sneha@mediconnect.ai", department: "Gynecology", qualification: "MBBS, MS Gynecology", consultation_fee: "$50 / ₹1400", room_number: "Room 205, Maternity Wing", status: "Available", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 107, full_name: "Dr. Arjun Nair", official_email: "dr.arjun@mediconnect.ai", department: "ENT Specialist", qualification: "MBBS, MS ENT", consultation_fee: "$45 / ₹1300", room_number: "Room 112, ENT Wing", status: "Available", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 108, full_name: "Dr. Meera Iyer", official_email: "dr.meera@mediconnect.ai", department: "Ophthalmologist", qualification: "MBBS, MS Ophthalmology", consultation_fee: "$45 / ₹1250", room_number: "Room 101, Eye Clinic", status: "Available", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 109, full_name: "Dr. Vikram Singh", official_email: "dr.vikram@mediconnect.ai", department: "Psychiatrist", qualification: "MBBS, MD Psychiatry", consultation_fee: "$60 / ₹1700", room_number: "Room 402, Wellness Wing", status: "Available", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 110, full_name: "Dr. Pooja Desai", official_email: "dr.pooja@mediconnect.ai", department: "General Medicine", qualification: "MBBS, MD Internal Medicine", consultation_fee: "$40 / ₹1200", room_number: "Room 105, General OPD", status: "Available", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 111, full_name: "Dr. Kiran Rao", official_email: "dr.kiran@mediconnect.ai", department: "Nephrology", qualification: "MBBS, DM Nephrology", consultation_fee: "$60 / ₹1800", room_number: "Room 401, Kidney Unit", status: "Available", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 112, full_name: "Dr. Deepak Joshi", official_email: "dr.deepak@mediconnect.ai", department: "Gastroenterology", qualification: "MBBS, DM Gastroenterology", consultation_fee: "$65 / ₹2000", room_number: "Room 302, Gastro Wing", status: "Available", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 113, full_name: "Dr. Nisha Gupta", official_email: "dr.nisha@mediconnect.ai", department: "Endocrinology", qualification: "MBBS, DM Endocrinology", consultation_fee: "$50 / ₹1500", room_number: "Room 208, Hormone OPD", status: "Available", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 114, full_name: "Dr. Sanjay Kulkarni", official_email: "dr.sanjay@mediconnect.ai", department: "Pulmonology", qualification: "MBBS, DM Pulmonology", consultation_fee: "$50 / ₹1500", room_number: "Room 106, Lung Care OPD", status: "Available", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 115, full_name: "Dr. Lakshmi Devi", official_email: "dr.lakshmi@mediconnect.ai", department: "Oncology", qualification: "MBBS, DM Medical Oncology", consultation_fee: "$75 / ₹2200", room_number: "Room 501, Oncology Wing", status: "Available", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
  { id: 116, full_name: "Dr. Amit Agarwal", official_email: "dr.amit@mediconnect.ai", department: "Urology", qualification: "MBBS, MCh Urology", consultation_fee: "$60 / ₹1800", room_number: "Room 305, Urology OPD", status: "Available", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 117, full_name: "Dr. Harish Babu", official_email: "dr.harish@mediconnect.ai", department: "Radiology", qualification: "MBBS, MD Radiology", consultation_fee: "$45 / ₹1300", room_number: "Room 102, Imaging Center", status: "Available", professional_photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
  { id: 118, full_name: "Dr. Swathi Krishna", official_email: "dr.swathi@mediconnect.ai", department: "Anesthesiology", qualification: "MBBS, MD Anesthesiology", consultation_fee: "$50 / ₹1500", room_number: "Room 201, OT Block", status: "Available", professional_photo: "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=400&q=80" },
  { id: 119, full_name: "Dr. Naveen Reddy", official_email: "dr.naveen@mediconnect.ai", department: "Emergency Medicine", qualification: "MBBS, MEM Emergency Medicine", consultation_fee: "$55 / ₹1600", room_number: "Trauma Care ER 1", status: "Available", professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
  { id: 120, full_name: "Dr. Divya Menon", official_email: "dr.divya@mediconnect.ai", department: "Rheumatology", qualification: "MBBS, DM Rheumatology", consultation_fee: "$50 / ₹1500", room_number: "Room 206, Joint Clinic", status: "Available", professional_photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" }
];

export default function AdminDashboard({ currentUser }) {
  const [activeTab, setActiveTab] = useState('doctors'); // default to doctors tab as requested
  const [doctorsList, setDoctorsList] = useState(FALLBACK_DOCTORS);
  const [patientsList, setPatientsList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);

  // Add Doctor Form State
  const [addDoctorModalOpen, setAddDoctorModalOpen] = useState(false);
  const [newDoctorForm, setNewDoctorForm] = useState({
    full_name: '',
    email: '',
    password: '',
    department: 'Cardiology',
    specialization: '',
    qualification: 'MBBS, MD',
    experience_years: 10,
    consultation_fee: '$50 / ₹1500',
    room_number: 'Room 201'
  });
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [docRes, apptRes] = await Promise.allSettled([
        apiService.getDoctors(),
        apiService.getAppointments()
      ]);

      if (docRes.status === 'fulfilled' && docRes.value.data?.doctors?.length > 0) {
        setDoctorsList(docRes.value.data.doctors);
      } else {
        setDoctorsList(FALLBACK_DOCTORS);
      }

      if (apptRes.status === 'fulfilled' && apptRes.value.data?.appointments?.length > 0) {
        setAppointmentsList(apptRes.value.data.appointments);
      }
    } catch (e) {
      setDoctorsList(FALLBACK_DOCTORS);
    }

    setPatientsList([
      { id: 1, full_name: "Rahul Verma", email: "rahul.verma@example.com", phone: "+91 98765 11001", insurance: "Star Health", appointments_cnt: 3, total_billed: "$450" },
      { id: 2, full_name: "Sarah Connor", email: "sarah.c@example.com", phone: "+91 98765 11002", insurance: "Apollo Munich", appointments_cnt: 2, total_billed: "$300" },
      { id: 3, full_name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 98765 11003", insurance: "Max Bupa", appointments_cnt: 5, total_billed: "$920" }
    ]);
  };

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    const docObj = {
      id: Date.now(),
      full_name: newDoctorForm.full_name,
      official_email: newDoctorForm.email,
      department: newDoctorForm.department,
      specialization: newDoctorForm.specialization || `${newDoctorForm.department} Specialist`,
      qualification: newDoctorForm.qualification,
      experience_years: newDoctorForm.experience_years,
      consultation_fee: newDoctorForm.consultation_fee,
      room_number: newDoctorForm.room_number,
      status: "Available",
      patient_rating: 4.9,
      reviews_count: 1,
      professional_photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
    };

    setDoctorsList([docObj, ...doctorsList]);
    setActionSuccess(`Doctor ${newDoctorForm.full_name} successfully registered into Hospital System!`);

    setTimeout(() => {
      setAddDoctorModalOpen(false);
      setActionSuccess('');
      setNewDoctorForm({
        full_name: '', email: '', password: '', department: 'Cardiology',
        specialization: '', qualification: 'MBBS, MD', experience_years: 10,
        consultation_fee: '$50 / ₹1500', room_number: 'Room 201'
      });
    }, 1500);
  };

  const handleToggleSuspendDoctor = (docId) => {
    setDoctorsList(doctorsList.map(d => {
      if (d.id === docId) {
        const nextStatus = d.status === 'Suspended' ? 'Available' : 'Suspended';
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const handleResetPassword = (docName) => {
    alert(`Temporary password reset email sent to ${docName}'s official email!`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Admin Header Banner */}
      <div className="medical-card p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-900/50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-apolloBlue to-teal-400 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-apolloBlue/30">
            SA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{currentUser?.full_name || 'System Administrator'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Root Administrator
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Authorized Email: <span className="font-mono text-teal-300">{currentUser?.email || 'admin@smarthospital.ai'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 text-xs">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition-all ${activeTab === 'analytics' ? 'bg-apolloBlue text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Analytics
          </button>
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition-all ${activeTab === 'doctors' ? 'bg-apolloBlue text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Doctors ({doctorsList.length})
          </button>
          <button 
            onClick={() => setActiveTab('patients')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition-all ${activeTab === 'patients' ? 'bg-apolloBlue text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Patients
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition-all ${activeTab === 'appointments' ? 'bg-apolloBlue text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Appointments
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition-all ${activeTab === 'schedule' ? 'bg-apolloBlue text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Schedule Config
          </button>
        </div>
      </div>

      {/* Analytics Overview Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="medical-card p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Total Patients</span>
                <Users className="w-4 h-4 text-apolloBlue" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">142</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+12% this month</span>
            </div>

            <div className="medical-card p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Active Doctors</span>
                <Stethoscope className="w-4 h-4 text-teal-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{doctorsList.length}</p>
              <span className="text-[10px] text-slate-500">Across 15 Departments</span>
            </div>

            <div className="medical-card p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Appointments</span>
                <Calendar className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">89</p>
              <span className="text-[10px] text-emerald-600 font-semibold">76 Completed</span>
            </div>

            <div className="medical-card p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Gross Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">$42,850</p>
              <span className="text-[10px] text-emerald-600 font-semibold">80% Insurance Copay</span>
            </div>

            <div className="medical-card p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">Bed Occupancy</span>
                <Activity className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">78%</p>
              <span className="text-[10px] text-amber-600 font-semibold">22% ER Beds Free</span>
            </div>

            <div className="medical-card p-4 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase">AI Accuracy</span>
                <Cpu className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">96.4%</p>
              <span className="text-[10px] text-purple-600 font-semibold">Swarm Triage Matrix</span>
            </div>
          </div>
        </div>
      )}

      {/* Doctors Management Tab */}
      {activeTab === 'doctors' && (
        <div className="medical-card p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">Doctor Directory & RBAC Management</h3>
              <p className="text-xs text-slate-500">Add, edit, suspend doctors, or reset credentials</p>
            </div>
            <button 
              onClick={() => setAddDoctorModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-apolloBlue/20 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
              <thead className="text-[10px] font-extrabold uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Official Email</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Consultation Fee</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {doctorsList.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 flex items-center gap-3">
                      <img src={doc.professional_photo || doc.image} alt={doc.full_name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-slate-100">{doc.full_name}</p>
                        <p className="text-[10px] text-slate-400">{doc.qualification}</p>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-apolloBlue">{doc.official_email || `dr.${doc.full_name.split(' ')[1]?.toLowerCase()}@mediconnect.ai`}</td>
                    <td className="p-3">{doc.department}</td>
                    <td className="p-3">{doc.consultation_fee || '$50 / ₹1500'}</td>
                    <td className="p-3">{doc.room_number || 'OPD Wing A'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Suspended' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {doc.status || 'Available'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button 
                        onClick={() => handleResetPassword(doc.full_name)}
                        title="Reset Password"
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-apolloBlue"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleToggleSuspendDoctor(doc.id)}
                        title="Toggle Suspend"
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                      >
                        <Lock className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Patients Management Tab */}
      {activeTab === 'patients' && (
        <div className="medical-card p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            Registered Patients Registry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
              <thead className="text-[10px] font-extrabold uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Insurance</th>
                  <th className="p-3">Appointments</th>
                  <th className="p-3">Billed Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {patientsList.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{p.full_name}</td>
                    <td className="p-3 font-mono">{p.email}</td>
                    <td className="p-3">{p.phone}</td>
                    <td className="p-3 font-bold text-teal-600">{p.insurance}</td>
                    <td className="p-3">{p.appointments_cnt} Bookings</td>
                    <td className="p-3 font-bold text-emerald-600">{p.total_billed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Master Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="medical-card p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            Master Hospital Appointments Record
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300">
              <thead className="text-[10px] font-extrabold uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Appt ID</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {appointmentsList.map((a) => (
                  <tr key={a.id}>
                    <td className="p-3 font-mono text-apolloBlue font-extrabold">{a.id}</td>
                    <td className="p-3 text-slate-900 dark:text-slate-100">{a.patient_name}</td>
                    <td className="p-3 text-slate-900 dark:text-slate-100">{a.doctor_name}</td>
                    <td className="p-3">{a.department}</td>
                    <td className="p-3">{a.date} at {a.time}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        a.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' :
                        a.status === 'Upcoming' ? 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300' :
                        a.status === 'Confirmed' ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300' :
                        a.status === 'Missed' ? 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300' :
                        a.status === 'Cancelled by Doctor' ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300' :
                        'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {a.status || 'Confirmed'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-emerald-600">{a.payment_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {addDoctorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="medical-card p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">Register New Doctor</h3>
              <button onClick={() => setAddDoctorModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            {actionSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs text-center">
                {actionSuccess}
              </div>
            ) : (
              <form onSubmit={handleAddDoctorSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Doctor Full Name *</label>
                  <input 
                    type="text" required placeholder="e.g. Dr. Rajesh Kumar"
                    value={newDoctorForm.full_name}
                    onChange={e => setNewDoctorForm({...newDoctorForm, full_name: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Official Email *</label>
                  <input 
                    type="email" required placeholder="dr.rajesh@mediconnect.ai"
                    value={newDoctorForm.email}
                    onChange={e => setNewDoctorForm({...newDoctorForm, email: e.target.value})}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                    <select 
                      value={newDoctorForm.department}
                      onChange={e => setNewDoctorForm({...newDoctorForm, department: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-bold"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Gynecology">Gynecology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="ENT Specialist">ENT Specialist</option>
                      <option value="Ophthalmologist">Ophthalmologist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Consultation Fee</label>
                    <input 
                      type="text" placeholder="$50 / ₹1500"
                      value={newDoctorForm.consultation_fee}
                      onChange={e => setNewDoctorForm({...newDoctorForm, consultation_fee: e.target.value})}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-apolloBlue text-white font-extrabold text-xs hover:bg-blue-700 shadow-md">
                  Confirm Doctor Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Schedule Config Tab */}
      {activeTab === 'schedule' && (
        <div className="medical-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                Doctor Dynamic Schedule & Working Hours Configuration
              </h3>
              <p className="text-xs text-slate-500">Configure doctor working days, daily hours, slot duration interval, and lunch breaks</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
              Live Engine Operational
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Doctor Schedule Configuration updated successfully across all hospital services!"); }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Working Days */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-apolloBlue uppercase tracking-wider">Hospital Working Days</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-apolloBlue" /> Monday - Friday
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-apolloBlue" /> Saturday (Half-Day)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-apolloBlue" /> Sunday (Holiday / Off)
                  </label>
                </div>
              </div>

              {/* Slot Duration */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-apolloBlue uppercase tracking-wider">Slot Duration Interval</h4>
                <select className="w-full p-3 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                  <option value="30">30 Minutes (Recommended Standard)</option>
                  <option value="15">15 Minutes (Express Consultations)</option>
                  <option value="20">20 Minutes</option>
                  <option value="60">60 Minutes (Deep Evaluation)</option>
                </select>
              </div>

              {/* Mon - Fri Working Hours */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-apolloBlue uppercase tracking-wider">Mon - Fri Working Hours</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium mb-1">Start Time</label>
                    <input type="text" defaultValue="09:00 AM" className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border font-mono font-bold" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium mb-1">End Time</label>
                    <input type="text" defaultValue="05:00 PM" className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border font-mono font-bold" />
                  </div>
                </div>
              </div>

              {/* Sat & Lunch Break */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-apolloBlue uppercase tracking-wider">Lunch Break & Saturday Hours</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium mb-1">Saturday Hours</label>
                    <input type="text" defaultValue="09:00 AM - 01:00 PM" className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border font-mono font-bold" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium mb-1">Daily Lunch Break</label>
                    <input type="text" defaultValue="01:00 PM - 02:00 PM" className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border font-mono font-bold" />
                  </div>
                </div>
              </div>

            </div>

            <button type="submit" className="px-8 py-3.5 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-apolloBlue/20">
              Save Schedule Settings
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
