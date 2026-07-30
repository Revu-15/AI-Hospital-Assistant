import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const apiService = {
  // Swarm Chat API
  sendSwarmChat: (message, agentName = 'main', chatHistory = [], context = {}) =>
    apiClient.post('/chat', { message, agent_name: agentName, chat_history: chatHistory, context_variables: context }),

  // Auth API
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (patientData) => apiClient.post('/auth/register', patientData),

  // Doctors API
  getDoctors: () => apiClient.get('/doctors'),
  getDoctorById: (id) => apiClient.get(`/doctors/${id}`),
  getDoctorQueue: () => apiClient.get('/doctors/queue/patient-queue'),

  // Appointments API
  getAppointments: () => apiClient.get('/appointments'),
  bookAppointment: (payload) => apiClient.post('/appointments/book', payload),
  cancelAppointment: (id) => apiClient.post(`/appointments/cancel/${id}`),
  rescheduleAppointment: (payload) => apiClient.post('/appointments/reschedule', payload),

  // Patient Profile & Timeline
  getPatientProfile: () => apiClient.get('/patients/profile'),
  getHealthTimeline: () => apiClient.get('/patients/timeline'),

  // Medical Records & OCR API
  getMedicalRecords: () => apiClient.get('/medical-records'),
  uploadMedicalRecord: (formData) => apiClient.post('/medical-records/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  summarizeReport: (reportText) => apiClient.post('/medical-records/summarize', { report_text: reportText }),

  // Prescriptions & Drug Safety
  getPrescriptions: () => apiClient.get('/prescriptions'),
  checkDrugInteraction: (medications) => apiClient.post('/prescriptions/check-interaction', { medications }),
  getMedicineReminders: () => apiClient.get('/prescriptions/reminders'),

  // Billing & Insurance API
  getInvoices: () => apiClient.get('/billing/invoices'),
  checkoutBill: (consultationId, paymentMethod) => apiClient.post('/billing/checkout', { consultation_id: consultationId, payment_method: paymentMethod }),
  verifyInsurance: (provider, policyNumber) => apiClient.post('/billing/verify-insurance', { provider, policy_number: policyNumber }),
  getRefundStatus: () => apiClient.get('/billing/refund-status'),

  // Emergency API
  getEmergencyData: () => apiClient.get('/emergency'),
  triageSymptoms: (symptomDescription) => apiClient.post('/emergency/triage', { symptom_description: symptomDescription })
};

export default apiClient;
