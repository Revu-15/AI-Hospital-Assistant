import React, { useState } from 'react';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import MedicalRecords from './pages/MedicalRecords';
import PrescriptionsPage from './pages/PrescriptionsPage';
import BillingPage from './pages/BillingPage';
import EmergencyPage from './pages/EmergencyPage';
import AIChatPage from './pages/AIChatPage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import FloatingAIChatWidget from './components/FloatingAIChatWidget';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
          <div className="max-w-md w-full medical-card p-8 text-center space-y-4 bg-slate-800 border border-slate-700">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
              ⚠️
            </div>
            <h2 className="text-xl font-extrabold">View Recovery Triggered</h2>
            <p className="text-xs text-slate-300">
              An unexpected UI error occurred while rendering. Click below to refresh the workspace.
            </p>
            <p className="text-[10px] text-slate-400 font-mono p-2 bg-slate-900 rounded-lg break-all">
              {this.state.error?.toString()}
            </p>
            <button 
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-apolloBlue hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const GUEST_PATIENT = {
    id: 9042,
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Patient'
  };

  const renderActivePage = () => {
    switch (activeRoute) {
      case 'home':
        return <LandingPage onNavigate={setActiveRoute} />;
      case 'auth':
        return <AuthPage onNavigate={setActiveRoute} setCurrentUser={setCurrentUser} />;
      case 'patient':
        return <PatientDashboard onNavigate={setActiveRoute} currentUser={currentUser || GUEST_PATIENT} />;
      case 'doctor':
        return <DoctorDashboard currentUser={currentUser} />;
      case 'admin':
        return currentUser?.role === 'Admin' 
          ? <AdminDashboard currentUser={currentUser} /> 
          : <AuthPage onNavigate={setActiveRoute} setCurrentUser={setCurrentUser} initialRole="Admin" />;
      case 'appointments':
        return <AppointmentBooking onNavigate={setActiveRoute} currentUser={currentUser} />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'prescriptions':
        return <PrescriptionsPage />;
      case 'billing':
        return <BillingPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'chat':
        return <AIChatPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage onNavigate={setActiveRoute} />;
    }
  };

  return (
    <ErrorBoundary>
      <AppLayout 
        activeRoute={activeRoute} 
        onNavigate={setActiveRoute}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      >
        {renderActivePage()}

        {/* Floating Chat Widget overlay when not on full chat page */}
        {activeRoute !== 'chat' && (
          <FloatingAIChatWidget onOpenFullChat={() => setActiveRoute('chat')} />
        )}
      </AppLayout>
    </ErrorBoundary>
  );
}
