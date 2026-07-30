import React, { useState } from 'react';
import { 
  Activity, UserPlus, LogIn, MessageSquare, Brain, Building2, UserCheck, CalendarCheck, 
  UploadCloud, Search, QrCode, Stethoscope, Pill, CreditCard, BarChart3, FileText, Bell, 
  ChevronRight, CheckCircle2, ShieldAlert, Cpu, Sparkles, Terminal, Database, ArrowRight,
  Clock, Star, MapPin, Heart, AlertTriangle, FileSpreadsheet, Send, Zap, RefreshCw
} from 'lucide-react';

import Step1_Landing from './steps/Step1_Landing';
import Step2_Registration from './steps/Step2_Registration';
import Step3_Login from './steps/Step3_Login';
import Step4_AIChat from './steps/Step4_AIChat';
import Step5_SymptomAnalysis from './steps/Step5_SymptomAnalysis';
import Step6_DeptRecommendation from './steps/Step6_DeptRecommendation';
import Step7_DoctorRecommendation from './steps/Step7_DoctorRecommendation';
import Step8_AppointmentBooking from './steps/Step8_AppointmentBooking';
import Step9_ReportUpload from './steps/Step9_ReportUpload';
import Step10_RAGAgent from './steps/Step10_RAGAgent';
import Step11_KioskCheckin from './steps/Step11_KioskCheckin';
import Step12_DoctorConsultation from './steps/Step12_DoctorConsultation';
import Step13_PharmacyAgent from './steps/Step13_PharmacyAgent';
import Step14_BillingAgent from './steps/Step14_BillingAgent';
import Step15_AdminDashboard from './steps/Step15_AdminDashboard';
import Step16_DischargeSummary from './steps/Step16_DischargeSummary';
import Step17_FollowupAgent from './steps/Step17_FollowupAgent';

const STEPS = [
  { id: 1, title: "App Launch", category: "Onboarding", icon: Activity, agent: "Router Node", node: "health_check_node", desc: "Detects platform environment and checks system health." },
  { id: 2, title: "Patient Registration", category: "Onboarding", icon: UserPlus, agent: "Profile Agent", node: "auth_node", desc: "Secure account setup with insurance & medical background." },
  { id: 3, title: "JWT Login", category: "Authentication", icon: LogIn, agent: "Security Agent", node: "jwt_node", desc: "Issues signed bearer token for session security." },
  { id: 4, title: "AI Chat Triage", category: "Intake", icon: MessageSquare, agent: "Intake Agent", node: "intake_agent_node", desc: "Conversational symptom acquisition and risk evaluation." },
  { id: 5, title: "Symptom Analysis", category: "AI Triage", icon: Brain, agent: "Triage Agent", node: "symptom_analysis_node", desc: "LLM urgency classification (Emergency / Urgent / Routine)." },
  { id: 6, title: "Dept Routing", category: "AI Triage", icon: Building2, agent: "Dept Agent", node: "department_recommendation_node", desc: "Maps clinical symptoms to specialized hospital department." },
  { id: 7, title: "Doctor Match", category: "Scheduling", icon: UserCheck, agent: "Match Agent", node: "doctor_recommendation_node", desc: "Queries specialist availability, ratings & experience." },
  { id: 8, title: "Appt Booking", category: "Scheduling", icon: CalendarCheck, agent: "Booking Agent", node: "appointment_booking_node", desc: "Reserves slot and issues unique digital ticket token." },
  { id: 9, title: "Report Upload", category: "RAG Pipeline", icon: UploadCloud, agent: "PDF Parser", node: "pdf_ingestion_node", desc: "PyPDF text extraction & MiniLM-L6-v2 vector embedding." },
  { id: 10, title: "RAG Vector Agent", category: "RAG Pipeline", icon: Search, agent: "FAISS Agent", node: "rag_query_node", desc: "FAISS similarity search & context-augmented synthesis." },
  { id: 11, title: "Kiosk Check-in", category: "Hospital Arrival", icon: QrCode, agent: "Queue Agent", node: "checkin_node", desc: "Scans QR code at entrance, updates status to Checked-In." },
  { id: 12, title: "Doctor EHR", category: "Consultation", icon: Stethoscope, agent: "EHR Agent", node: "consultation_node", desc: "Doctor inputs diagnosis, lab orders, and e-prescriptions." },
  { id: 13, title: "Pharmacy Safety", category: "Pharmacy", icon: Pill, agent: "Drug Safety Agent", node: "pharmacy_agent_node", desc: "Screens prescribed drugs for interactions and side-effects." },
  { id: 14, title: "Billing & Co-Pay", category: "Finance", icon: CreditCard, agent: "Finance Agent", node: "billing_agent_node", desc: "Calculates itemized bill, 80% insurance coverage & co-pay." },
  { id: 15, title: "Admin Analytics", category: "Administration", icon: BarChart3, agent: "Analytics Agent", node: "analytics_node", desc: "Real-time hospital capacity, revenue & AI accuracy metrics." },
  { id: 16, title: "Discharge Summary", category: "Discharge", icon: FileText, agent: "Discharge Agent", node: "discharge_summary_node", desc: "Generates formal AI clinical summary & recovery instructions." },
  { id: 17, title: "Follow-up Care", category: "Post-Care", icon: Bell, agent: "Care Agent", node: "followup_agent_node", desc: "Schedules automated SMS & email reminders for patient." }
];

export default function HospitalWorkflowApp() {
  const [activeStep, setActiveStep] = useState(1);
  const currentStep = STEPS.find(s => s.id === activeStep);
  const progressPercent = Math.round((activeStep / 17) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-500 p-0.5 shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-400 animate-pulse" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                Hospital Agentic AI Platform
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase tracking-widest">
                Production v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center space-x-2">
              <span>End-to-End Autonomous Patient Triage & Clinical Journey</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium flex items-center">
                <Cpu className="w-3 h-3 mr-1" /> LangGraph Active
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-xl flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active LLM Model</span>
              <span className="text-teal-300 font-mono font-bold">Meta Llama-3 8B Instruct</span>
            </div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-xl flex items-center space-x-2.5">
            <Database className="w-4 h-4 text-cyan-400" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vector Index</span>
              <span className="text-cyan-300 font-mono font-bold">FAISS + MiniLM-L6-v2</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Header Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 w-full max-w-xl">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            Workflow Progress: <strong className="text-teal-400 font-bold">{progressPercent}%</strong>
          </span>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
            <div 
              className="bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm shadow-teal-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-slate-200 transition"
          >
            ← Previous Step
          </button>
          <button 
            onClick={() => setActiveStep(prev => Math.min(17, prev + 1))}
            disabled={activeStep === 17}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 shadow-lg shadow-teal-500/20 font-bold transition flex items-center"
          >
            Next Step <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Steps Navigation */}
        <aside className="w-80 bg-slate-900/40 border-r border-slate-800/80 p-3.5 overflow-y-auto space-y-1.5">
          <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Patient Flow Steps (17)</span>
            <span className="text-teal-400 font-mono">Step {activeStep}/17</span>
          </div>

          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            const isCompleted = step.id < activeStep;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-transparent border border-teal-500/40 text-white shadow-lg shadow-teal-500/5'
                    : isCompleted
                    ? 'text-slate-300 hover:bg-slate-800/40'
                    : 'text-slate-500 hover:bg-slate-800/30 hover:text-slate-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/30'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800/80 text-slate-500 border border-slate-700/50'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-semibold ${isActive ? 'text-teal-400' : 'text-slate-500'}`}>
                      STEP {step.id}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/40">
                      {step.category}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </p>
                </div>

                {isActive && <ChevronRight className="w-4 h-4 text-teal-400 flex-shrink-0 animate-pulse" />}
              </button>
            );
          })}
        </aside>

        {/* Center & Right Main Content Panels */}
        <main className="flex-1 flex overflow-hidden p-6 gap-6 bg-slate-950">
          {/* Column 1: Live Interactive User Screen Mockup */}
          <div className="flex-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                  {React.createElement(currentStep.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">User Interface Screen</span>
                  <h2 className="text-xl font-bold text-white tracking-tight">{currentStep.title}</h2>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-teal-400" /> Real-Time Live Render
              </span>
            </div>

            {/* Render Modular Step Content */}
            <div className="flex-1">
              <InteractiveScreenContent stepId={activeStep} onNavigate={setActiveStep} />
            </div>
          </div>

          {/* Column 2: Agent Telemetry & Technical Inspector */}
          <div className="w-[480px] flex flex-col gap-5 overflow-y-auto">
            {/* LangGraph & Agent Execution Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">LangGraph Telemetry</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  NODE: {currentStep.node}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Target Agent</span>
                  <span className="text-teal-300 font-bold">{currentStep.agent}</span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Model Provider</span>
                  <span className="text-slate-200 font-bold">HF Llama-3 8B</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                {currentStep.desc}
              </p>
            </div>

            {/* Technical Snippets Inspector */}
            <TechnicalDetailsInspector stepId={activeStep} />
          </div>
        </main>
      </div>
    </div>
  );
}

function InteractiveScreenContent({ stepId, onNavigate }) {
  switch (stepId) {
    case 1: return <Step1_Landing onNavigate={onNavigate} />;
    case 2: return <Step2_Registration onNavigate={onNavigate} />;
    case 3: return <Step3_Login onNavigate={onNavigate} />;
    case 4: return <Step4_AIChat onNavigate={onNavigate} />;
    case 5: return <Step5_SymptomAnalysis onNavigate={onNavigate} />;
    case 6: return <Step6_DeptRecommendation onNavigate={onNavigate} />;
    case 7: return <Step7_DoctorRecommendation onNavigate={onNavigate} />;
    case 8: return <Step8_AppointmentBooking onNavigate={onNavigate} />;
    case 9: return <Step9_ReportUpload onNavigate={onNavigate} />;
    case 10: return <Step10_RAGAgent onNavigate={onNavigate} />;
    case 11: return <Step11_KioskCheckin onNavigate={onNavigate} />;
    case 12: return <Step12_DoctorConsultation onNavigate={onNavigate} />;
    case 13: return <Step13_PharmacyAgent onNavigate={onNavigate} />;
    case 14: return <Step14_BillingAgent onNavigate={onNavigate} />;
    case 15: return <Step15_AdminDashboard onNavigate={onNavigate} />;
    case 16: return <Step16_DischargeSummary onNavigate={onNavigate} />;
    case 17: return <Step17_FollowupAgent onNavigate={onNavigate} />;
    default: return <Step1_Landing onNavigate={onNavigate} />;
  }
}

function TechnicalDetailsInspector({ stepId }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">Developer Inspector</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          FastAPI + MySQL + FAISS
        </span>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Database Query (SQL)</span>
        <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-teal-300 overflow-x-auto">
{stepId === 2 
  ? `INSERT INTO patients (full_name, age, phone, email)\nVALUES ('Jane Doe', 34, '+1987654321', 'jane.doe@example.com');`
  : stepId === 7 
  ? `SELECT * FROM doctors WHERE department_id = 2 AND rating >= 4.5;`
  : stepId === 8
  ? `INSERT INTO appointments (patient_id, doctor_id, token_number)\nVALUES (1, 101, 'TK-CARD-884');`
  : `SELECT * FROM system_logs WHERE step_id = ${stepId};`}
        </pre>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Backend Response Payload</span>
        <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{stepId === 5 
  ? `{\n  "urgency": "EMERGENCY",\n  "department": "Cardiology",\n  "confidence": 0.964\n}`
  : stepId === 14
  ? `{\n  "total": 395.00,\n  "insurance_paid": 316.00,\n  "patient_payable": 79.00\n}`
  : `{\n  "status": "200 OK",\n  "step_id": ${stepId}\n}`}
        </pre>
      </div>
    </div>
  );
}
