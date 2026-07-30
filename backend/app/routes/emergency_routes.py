from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(tags=["Emergency Services & Triage"])

class EmergencyTriageSchema(BaseModel):
    symptom_description: str

NEAREST_HOSPITALS = [
    {
        "id": 1,
        "name": "Apollo Central Super-Specialty Hospital",
        "distance_miles": "1.2 miles",
        "address": "4th Block Main Road, Healthcare Square",
        "er_hotline": "+1 (800) 555-9111",
        "ambulance_contact": "911 / 108",
        "trauma_center_level": "Level 1 Trauma & Cardiac ICU",
        "open_hours": "24/7 ER Available",
        "latitude": 37.7749,
        "longitude": -122.4194
    },
    {
        "id": 2,
        "name": "Apollo Emergency & Trauma Care Clinic",
        "distance_miles": "2.8 miles",
        "address": "88 North Avenue, Westside Medical Park",
        "er_hotline": "+1 (800) 555-9222",
        "ambulance_contact": "911 / 108",
        "trauma_center_level": "Level 2 ER & Pediatric ICU",
        "open_hours": "24/7 ER Available",
        "latitude": 37.7833,
        "longitude": -122.4167
    }
]

FIRST_AID_GUIDELINES = [
    {
        "condition": "Chest Pain / Suspected Cardiac Event",
        "steps": [
            "Call 911 / Emergency Ambulance Hotline (+1 800 555-9111) immediately.",
            "Sit or lie down in a comfortable position, slightly elevated.",
            "Loosen tight clothing around chest and neck.",
            "Chew one adult Aspirin (325mg) if advised by emergency responder and not allergic."
        ],
        "urgency": "CRITICAL EMERGENCY"
    },
    {
        "condition": "Severe Bleeding / Trauma",
        "steps": [
            "Apply direct firm pressure to the wound with a clean cloth or bandage.",
            "Elevate the injured limb above heart level if possible.",
            "Do not remove embedded objects; apply padding around them.",
            "Keep patient warm with a blanket until emergency paramedics arrive."
        ],
        "urgency": "URGENT EMERGENCY"
    },
    {
        "condition": "Shortness of Breath / Asthma Attack",
        "steps": [
            "Help the person sit upright and remain calm.",
            "Assist with using their quick-relief rescue inhaler (Albuterol) - 2 puffs.",
            "Ensure room is ventilated and free of smoke or cold air draft.",
            "Call emergency services if breathing does not ease within 5 minutes."
        ],
        "urgency": "HIGH URGENCY"
    }
]

@router.get("/emergency")
@router.get("/api/v1/emergency")
@router.get("/emergency/hospitals")
@router.get("/api/v1/emergency/hospitals")
def get_emergency_services():
    return {
        "status": "success",
        "ambulance_hotline": "+1 (800) 555-9111",
        "national_emergency_code": "911 / 108",
        "nearest_hospitals": NEAREST_HOSPITALS,
        "first_aid_guidelines": FIRST_AID_GUIDELINES
    }

@router.post("/emergency/triage")
@router.post("/api/v1/emergency/triage")
def triage_emergency_symptoms(payload: EmergencyTriageSchema):
    desc = payload.symptom_description.lower()
    if any(k in desc for k in ["chest", "heart", "breath", "faint", "unconscious", "stroke", "paralysis", "bleeding"]):
        return {
            "status": "EMERGENCY_CRITICAL",
            "urgency": "CRITICAL",
            "action_required": "IMMEDIATE EMERGENCY SERVICES REQUIRED",
            "instructions": "Call 911 or dispatch ambulance immediately (+1 800 555-9111). Do not attempt to drive.",
            "nearest_er": NEAREST_HOSPITALS[0]
        }
    return {
        "status": "URGENT_EVALUATION",
        "urgency": "HIGH",
        "action_required": "Visit Nearest Emergency Room or Urgent Care",
        "instructions": "Symptoms warrant medical evaluation within 1-2 hours. Proceed to nearest ER.",
        "nearest_er": NEAREST_HOSPITALS[0]
    }
