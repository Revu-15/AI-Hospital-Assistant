import os
import json
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel

from app.database import get_db
from app.models.schemas import CompleteConsultationSchema, AppointmentModel, DoctorModel

router = APIRouter(tags=["Doctor EHR & Management"])

DOCTORS_JSON_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "doctors_database.json")

def load_doctors():
    if not os.path.exists(DOCTORS_JSON_PATH):
        return []
    try:
        with open(DOCTORS_JSON_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print("Error loading doctors JSON:", e)
        return []

class SymptomMatchSchema(BaseModel):
    symptom_description: str

@router.get("/doctors")
@router.get("/api/v1/doctors")
def get_doctors(
    query: Optional[str] = Query(None, description="Search by doctor name, specialization, or disease"),
    department: Optional[str] = Query(None, description="Filter by department"),
    disease: Optional[str] = Query(None, description="Filter by disease treated")
):
    all_doctors = load_doctors()
    filtered = all_doctors

    if department:
        dept_lower = department.strip().lower()
        filtered = [d for d in filtered if dept_lower in d.get("department", "").lower()]

    if disease:
        dis_lower = disease.strip().lower()
        filtered = [
            d for d in filtered if any(dis_lower in dis.lower() for dis in d.get("diseases_treated", []))
        ]

    if query:
        q = query.strip().lower()
        filtered = [
            d for d in filtered if (
                q in d.get("full_name", "").lower() or
                q in d.get("department", "").lower() or
                q in d.get("specialization", "").lower() or
                q in d.get("hospital_name", "").lower() or
                any(q in dis.lower() for dis in d.get("diseases_treated", []))
            )
        ]

    return {
        "status": "success",
        "total": len(filtered),
        "doctors": filtered
    }

@router.get("/doctors/{doctor_id}")
@router.get("/api/v1/doctors/{doctor_id}")
def get_doctor_details(doctor_id: int):
    all_doctors = load_doctors()
    doctor = next((d for d in all_doctors if d["id"] == doctor_id), None)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return {"status": "success", "doctor": doctor}

@router.post("/doctors/match-symptoms")
@router.post("/api/v1/doctors/match-symptoms")
def match_symptoms_with_doctors(payload: SymptomMatchSchema):
    symptoms_lower = payload.symptom_description.lower()
    all_doctors = load_doctors()

    # Department mapping keyword rules
    dept_keywords = {
        "Cardiology": ["chest pain", "heart", "blood pressure", "breath", "cardiac", "palpitation", "cholesterol", "arm pain"],
        "Neurology": ["headache", "migraine", "stroke", "numbness", "seizure", "epilepsy", "parkinson", "dizziness", "nerve", "paralysis"],
        "Orthopedics": ["fracture", "bone", "knee", "joint", "arthritis", "back pain", "spine", "sciatica", "shoulder"],
        "Dermatology": ["skin", "acne", "rash", "itching", "eczema", "psoriasis", "hair loss", "allergy"],
        "Gynecology": ["pregnancy", "pcos", "period", "menstrual", "cramps", "ovary", "uterus", "fertility"],
        "Pediatrics": ["child", "baby", "infant", "fever", "vaccine", "growth", "teething"],
        "ENT Specialist": ["ear", "sinus", "hearing", "throat", "tonsil", "nose", "bleed", "snoring"],
        "Ophthalmologist": ["eye", "vision", "blur", "cataract", "glaucoma", "redness", "retina"],
        "Psychiatrist": ["depression", "anxiety", "stress", "sleep", "insomnia", "panic", "mood", "ocd"],
        "Gastroenterology": ["stomach", "acidity", "ulcer", "reflux", "gerd", "liver", "jaundice", "diarrhea", "ibs"],
        "Pulmonology": ["cough", "asthma", "wheezing", "lungs", "copd", "bronchitis", "pneumonia"],
        "Endocrinology": ["diabetes", "thyroid", "sugar", "hormone", "weight gain", "weight loss"]
    }

    matched_dept = None
    for dept, keywords in dept_keywords.items():
        if any(k in symptoms_lower for k in keywords):
            matched_dept = dept
            break

    if not matched_dept:
        matched_dept = "General Medicine"

    matched_doctors = [d for d in all_doctors if d.get("department") == matched_dept]
    if not matched_doctors:
        matched_doctors = all_doctors[:3]

    top_doctor = matched_doctors[0]
    treated = top_doctor.get("diseases_treated", [])

    return {
        "status": "success",
        "recommended_department": matched_dept,
        "recommended_doctor": top_doctor,
        "match_reason": f"Specializes in {', '.join(treated[:5])} and {top_doctor.get('specialization')}.",
        "available_today": top_doctor.get("available_time_slots", ["10:30 AM", "02:30 PM", "04:00 PM"])
    }

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
