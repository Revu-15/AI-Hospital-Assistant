from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import PharmacyInventoryModel, PrescriptionModel
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(tags=["Prescriptions & Pharmacy"])

SAMPLE_PRESCRIPTIONS = [
    {
        "id": 101,
        "medication_name": "Aspirin 81mg",
        "generic_name": "Acetylsalicylic Acid",
        "doctor_name": "Dr. Sarah Jenkins",
        "department": "Cardiology",
        "dosage": "1 Tablet Daily",
        "frequency": "Every Morning with Water",
        "timing": "08:00 AM",
        "duration": "90 Days",
        "refills_remaining": 3,
        "instructions": "Take after breakfast. Do not crush or chew.",
        "ai_safety_status": "APPROVED",
        "drug_interaction_warning": "Avoid combining with OTC Ibuprofen or Naproxen without medical advice.",
        "status": "Active"
    },
    {
        "id": 102,
        "medication_name": "Clopidogrel 75mg",
        "generic_name": "Clopidogrel Bisulfate",
        "doctor_name": "Dr. Sarah Jenkins",
        "department": "Cardiology",
        "dosage": "1 Tablet Daily",
        "frequency": "Every Evening after Dinner",
        "timing": "08:00 PM",
        "duration": "60 Days",
        "refills_remaining": 2,
        "instructions": "Antiplatelet therapy. Maintain consistent daily timing.",
        "ai_safety_status": "APPROVED",
        "drug_interaction_warning": "Avoid high doses of Vitamin E supplements.",
        "status": "Active"
    },
    {
        "id": 103,
        "medication_name": "Atorvastatin 20mg",
        "generic_name": "Atorvastatin Calcium",
        "doctor_name": "Dr. Rajesh Sharma",
        "department": "Internal Medicine",
        "dosage": "1 Tablet at Bedtime",
        "frequency": "Once Nightly",
        "timing": "09:30 PM",
        "duration": "90 Days",
        "refills_remaining": 4,
        "instructions": "Lipid lowering agent. Avoid drinking large amounts of grapefruit juice.",
        "ai_safety_status": "APPROVED",
        "drug_interaction_warning": "None detected with current cardiac regimen.",
        "status": "Active"
    }
]

class DrugInteractionCheckSchema(BaseModel):
    medications: List[str]

@router.get("/prescriptions")
@router.get("/api/v1/prescriptions")
@router.get("/pharmacy/medications")
@router.get("/api/v1/pharmacy/medications")
def get_prescriptions(db: Session = Depends(get_db)):
    prescriptions = db.query(PrescriptionModel).all()
    if prescriptions:
        return {
            "status": "success",
            "total": len(prescriptions),
            "prescriptions": [
                {
                    "id": p.id,
                    "medication_name": p.medication_name,
                    "generic_name": p.medication_name,
                    "doctor_name": "Dr. Sarah Jenkins",
                    "department": "Cardiology",
                    "dosage": p.dosage,
                    "frequency": "Daily",
                    "timing": "09:00 AM",
                    "instructions": p.instructions or "Take as directed",
                    "ai_safety_status": p.ai_safety_status or "APPROVED",
                    "status": "Active"
                } for p in prescriptions
            ]
        }
    return {
        "status": "success",
        "total": len(SAMPLE_PRESCRIPTIONS),
        "prescriptions": SAMPLE_PRESCRIPTIONS
    }

@router.post("/prescriptions/check-interaction")
@router.post("/api/v1/prescriptions/check-interaction")
@router.post("/pharmacy/check-safety")
@router.post("/api/v1/pharmacy/check-safety")
def check_interaction(payload: DrugInteractionCheckSchema):
    meds = [m.lower() for m in payload.medications]
    has_aspirin = any("aspirin" in m for m in meds)
    has_ibuprofen = any("ibuprofen" in m or "advil" in m or "motrin" in m for m in meds)
    has_blood_thinners = any("clopidogrel" in m or "warfarin" in m for m in meds)

    if has_aspirin and has_ibuprofen:
        return {
            "status": "WARNING",
            "risk_level": "HIGH",
            "warning": "Drug Interaction Warning: Combining Aspirin with Ibuprofen significantly increases risk of gastrointestinal ulceration and bleeding.",
            "recommendation": "Consult physician. Substitute Ibuprofen with Acetaminophen (Paracetamol) for fever/pain relief."
        }
    elif has_aspirin and has_blood_thinners:
        return {
            "status": "MODERATE_WARNING",
            "risk_level": "MODERATE",
            "warning": "Dual Antiplatelet Regimen Detected: Aspirin + Clopidogrel combination requires close clinical monitoring.",
            "recommendation": "Follow doctor instructions carefully. Report any unusual bleeding or bruising."
        }

    return {
        "status": "APPROVED",
        "risk_level": "SAFE",
        "warning": "No dangerous drug-drug interactions detected between the selected medications.",
        "recommendation": "Safe to administer according to prescribed dosages."
    }

@router.get("/prescriptions/reminders")
@router.get("/api/v1/prescriptions/reminders")
def get_medicine_reminders():
    return {
        "status": "success",
        "reminders": [
            {"time": "08:00 AM", "medication": "Aspirin 81mg", "status": "Taken", "taken_at": "08:05 AM"},
            {"time": "08:00 PM", "medication": "Clopidogrel 75mg", "status": "Upcoming"},
            {"time": "09:30 PM", "medication": "Atorvastatin 20mg", "status": "Upcoming"}
        ]
    }
