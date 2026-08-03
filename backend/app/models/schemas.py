from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Enum, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from app.database import Base

# ================= SQLAlchemy ORM Models =================

class DepartmentModel(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    code = Column(String(20), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    floor_location = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    doctors = relationship("DoctorModel", back_populates="department")


class PatientModel(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(20), nullable=False)
    phone = Column(String(20), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    address = Column(Text, nullable=True)
    insurance_provider = Column(String(100), nullable=True)
    insurance_policy_number = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    appointments = relationship("AppointmentModel", back_populates="patient")
    reports = relationship("MedicalReportModel", back_populates="patient")


class DoctorModel(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    specialization = Column(String(100), nullable=False)
    experience_years = Column(Integer, nullable=False)
    rating = Column(Float, default=5.0)
    available_slots = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    department = relationship("DepartmentModel", back_populates="doctors")
    appointments = relationship("AppointmentModel", back_populates="doctor")


class AppointmentModel(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    patient_name = Column(String(100), nullable=True, default="John Doe")
    appointment_date = Column(String(20), nullable=False)
    appointment_time = Column(String(20), nullable=False)
    status = Column(String(20), default="Scheduled")
    symptoms_summary = Column(Text, nullable=True)
    triage_urgency = Column(String(20), nullable=True)
    token_number = Column(String(20), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("PatientModel", back_populates="appointments")
    doctor = relationship("DoctorModel", back_populates="appointments")


class MedicalReportModel(Base):
    __tablename__ = "medical_reports"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(255), nullable=False)
    vector_index_id = Column(String(100), nullable=True)
    summary = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("PatientModel", back_populates="reports")


class NotificationModel(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    title = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    channel = Column(String(20), default="SMS")
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class PharmacyInventoryModel(Base):
    __tablename__ = "pharmacy_inventory"

    id = Column(Integer, primary_key=True, index=True)
    drug_name = Column(String(100), unique=True, nullable=False)
    generic_name = Column(String(100), nullable=False)
    stock_quantity = Column(Integer, default=100)
    unit_price = Column(Float, nullable=False)
    requires_prescription = Column(Boolean, default=True)


class PrescriptionModel(Base):
    __tablename__ = "prescriptions"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    medication_name = Column(String(100), nullable=False)
    dosage = Column(String(50), nullable=False)
    instructions = Column(Text, nullable=True)
    ai_safety_status = Column(String(50), default="APPROVED")
    issued_at = Column(DateTime, default=datetime.utcnow)


class BillModel(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    invoice_number = Column(String(50), unique=True, nullable=False)
    gross_amount = Column(Float, nullable=False)
    insurance_covered = Column(Float, default=0.0)
    patient_copay = Column(Float, nullable=False)
    status = Column(String(20), default="PAID")
    created_at = Column(DateTime, default=datetime.utcnow)

class PatientRegisterSchema(BaseModel):
    full_name: str
    age: int
    gender: str
    phone: str
    email: EmailStr
    password: str
    address: Optional[str] = None
    insurance_provider: Optional[str] = None
    insurance_policy_number: Optional[str] = None

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordSchema(BaseModel):
    email: EmailStr

class VerifyOTPSchema(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

class TriageRequestSchema(BaseModel):
    user_query: str

class BookAppointmentSchema(BaseModel):
    doctor_id: int
    patient_name: Optional[str] = "John Doe"
    date: Optional[str] = None
    slot: Optional[str] = None
    appointment_date: Optional[str] = None
    time_slot: Optional[str] = None
    symptoms_summary: Optional[str] = None
    notes: Optional[str] = None
    urgency: Optional[str] = "ROUTINE"

class RAGQuerySchema(BaseModel):
    question: str

class CheckinSchema(BaseModel):
    token_number: str

class CompleteConsultationSchema(BaseModel):
    appointment_id: int
    diagnosis: str
    clinical_notes: str
    recommended_lab_tests: List[str]
    medicines: List[dict]

class BillingCheckoutSchema(BaseModel):
    consultation_id: int
    payment_method: str
