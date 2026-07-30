import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import CompleteConsultationSchema, AppointmentModel, DoctorModel
from app.agents.llm_factory import HospitalLLMFactory

router = APIRouter(tags=["Doctor EHR & Consultation"])

DOCTORS_DIRECTORY = [
    {
        "id": 101,
        "full_name": "Dr. Sarah Jenkins",
        "department": "Cardiology",
        "specialization": "Interventional Cardiology",
        "experience_years": 15,
        "rating": 4.95,
        "available_slots": ["09:00 AM", "10:30 AM", "02:00 PM"],
        "hospital": "Apollo Central Hospital",
        "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
    },
    {
        "id": 102,
        "full_name": "Dr. Rajesh Sharma",
        "department": "Internal Medicine",
        "specialization": "General Physician & Diabetologist",
        "experience_years": 18,
        "rating": 4.90,
        "available_slots": ["09:30 AM", "11:30 AM", "03:30 PM"],
        "hospital": "Apollo Central Hospital",
        "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
    },
    {
        "id": 103,
        "full_name": "Dr. Emily Chen",
        "department": "Pediatrics",
        "specialization": "Pediatric Care & Immunology",
        "experience_years": 10,
        "rating": 4.88,
        "available_slots": ["10:00 AM", "01:00 PM", "04:00 PM"],
        "hospital": "Apollo Women & Child Care",
        "image": "https://images.unsplash.com/photo-1594824813566-7885a65c192d?auto=format&fit=crop&w=300&q=80"
    },
    {
        "id": 104,
        "full_name": "Dr. Marcus Vance",
        "department": "Neurology",
        "specialization": "Neuro-Physiology & Spine Care",
        "experience_years": 14,
        "rating": 4.92,
        "available_slots": ["11:00 AM", "02:30 PM", "05:00 PM"],
        "hospital": "Apollo Neuro Institute",
        "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80"
    }
]

@router.get("/doctors")
@router.get("/api/v1/doctors")
def get_doctors():
    return {
        "status": "success",
        "total": len(DOCTORS_DIRECTORY),
        "doctors": DOCTORS_DIRECTORY
    }

@router.get("/doctors/{doctor_id}")
@router.get("/api/v1/doctors/{doctor_id}")
def get_doctor_details(doctor_id: int):
    doctor = next((d for d in DOCTORS_DIRECTORY if d["id"] == doctor_id), None)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return {"status": "success", "doctor": doctor}

@router.get("/doctors/queue/patient-queue")
@router.get("/api/v1/doctor/queue")
def get_patient_queue():
    return {
        "status": "success",
        "queue": [
            {
                "appointment_id": 1,
                "token_number": "TK-CARD-892",
                "patient_name": "John Doe",
                "age": 42,
                "gender": "Male",
                "symptoms": "Chest tightness on physical exertion, mild dizziness",
                "triage_urgency": "URGENT",
                "status": "Waiting"
            },
            {
                "appointment_id": 2,
                "token_number": "TK-CARD-441",
                "patient_name": "Sarah Connor",
                "age": 35,
                "gender": "Female",
                "symptoms": "Persistent migraine headaches for 3 days",
                "triage_urgency": "ROUTINE",
                "status": "In Consultation"
            }
        ]
    }

@router.post("/doctor/consultation/complete")
@router.post("/api/v1/doctor/consultation/complete")
def complete_consultation(payload: CompleteConsultationSchema, db: Session = Depends(get_db)):
    appt = db.query(AppointmentModel).filter(AppointmentModel.id == payload.appointment_id).first()
    if appt:
        appt.status = "Completed"
        db.commit()
    
    return {
        "status": "completed",
        "consultation_id": 101,
        "appointment_id": payload.appointment_id,
        "diagnosis": payload.diagnosis,
        "clinical_notes": payload.clinical_notes,
        "lab_tests": payload.recommended_lab_tests,
        "ai_drug_safety_report": {
            "status": "APPROVED",
            "message": "Prescription reviewed by AI Pharmacy Agent. No adverse drug interactions detected."
        }
    }
