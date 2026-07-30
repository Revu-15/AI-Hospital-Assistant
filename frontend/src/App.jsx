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

export default function App() {
  const [activeRoute, setActiveRoute] = useState('home'); // home, auth, patient, doctor, admin, appointments, medical-records, prescriptions, billing, emergency, chat, settings
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const renderActivePage = () => {
    switch (activeRoute) {
      case 'home':
        return <LandingPage onNavigate={setActiveRoute} />;
      case 'auth':
        return <AuthPage onNavigate={setActiveRoute} setCurrentUser={setCurrentUser} />;
      case 'patient':
        return <PatientDashboard onNavigate={setActiveRoute} currentUser={currentUser} />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'admin':
        return <AdminDashboard currentUser={currentUser} />;
      case 'appointments':
        return <AppointmentBooking onNavigate={setActiveRoute} />;
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
  );
}
