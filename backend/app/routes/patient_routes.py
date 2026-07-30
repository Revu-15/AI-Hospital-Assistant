import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import PatientModel

router = APIRouter(tags=["Patients & Health Timeline"])

SAMPLE_PATIENT_PROFILE = {
    "id": 1,
    "full_name": "John Doe",
    "email": "patient@hospital.com",
    "phone": "+1 (555) 234-5678",
    "age": 42,
    "gender": "Male",
    "blood_group": "O+",
    "height_cm": 178,
    "weight_kg": 76,
    "insurance_provider": "Star Health Care",
    "insurance_policy_number": "POL-9842019",
    "address": "452 Healthcare Blvd, Metro City",
    "allergies": ["Penicillin", "Peanuts"],
    "chronic_conditions": ["Hypertension (Mild)"]
}

SAMPLE_HEALTH_TIMELINE = [
    {
        "id": 1,
        "date": "2026-07-25",
        "title": "Cardiology Follow-up & Lipid Profile",
        "doctor": "Dr. Sarah Jenkins",
        "department": "Cardiology",
        "summary": "Blood pressure stabilized at 120/80. Total cholesterol 195 mg/dL.",
        "type": "Consultation",
        "status": "Completed"
    },
    {
        "id": 2,
        "date": "2026-06-10",
        "title": "Comprehensive Blood & Diabetes Panel",
        "doctor": "Dr. Rajesh Sharma",
        "department": "Internal Medicine",
        "summary": "HbA1c: 5.7% (Normal). Fasting Blood Glucose: 95 mg/dL.",
        "type": "Lab Diagnostic",
        "status": "Completed"
    },
    {
        "id": 3,
        "date": "2026-04-15",
        "title": "Annual Health Checkup & Chest X-Ray",
        "doctor": "Dr. Marcus Vance",
        "department": "Pulmonology",
        "summary": "Clear lung fields, normal heart size, zero active infiltrates.",
        "type": "Radiology",
        "status": "Completed"
    }
]

@router.get("/patients/me")
@router.get("/api/v1/patients/me")
@router.get("/patients/profile")
@router.get("/api/v1/patients/profile")
def get_patient_profile(db: Session = Depends(get_db)):
    patient = db.query(PatientModel).first()
    if patient:
        return {
            "status": "success",
            "patient": {
                "id": patient.id,
                "full_name": patient.full_name,
                "email": patient.email,
                "phone": patient.phone,
                "age": patient.age,
                "gender": patient.gender,
                "blood_group": "O+",
                "height_cm": 178,
                "weight_kg": 76,
                "insurance_provider": patient.insurance_provider or "Star Health Care",
                "insurance_policy_number": patient.insurance_policy_number or "POL-9842019",
                "address": patient.address or "452 Healthcare Blvd",
                "allergies": ["Penicillin"],
                "chronic_conditions": ["Hypertension"]
            }
        }
    return {"status": "success", "patient": SAMPLE_PATIENT_PROFILE}

@router.get("/patients/timeline")
@router.get("/api/v1/patients/timeline")
def get_health_timeline():
    return {
        "status": "success",
        "timeline": SAMPLE_HEALTH_TIMELINE
    }
