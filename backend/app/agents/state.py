from typing import TypedDict, List, Dict, Any, Optional

class HospitalAgentState(TypedDict):
    patient_id: Optional[int]
    user_query: str
    symptoms: List[str]
    urgency_level: str
    confidence_score: float
    recommended_department: str
    recommended_doctors: List[Dict[str, Any]]
    selected_doctor: Optional[Dict[str, Any]]
    appointment_details: Optional[Dict[str, Any]]
    rag_context: List[str]
    rag_answer: Optional[str]
    pharmacy_safety_report: Optional[Dict[str, Any]]
    billing_summary: Optional[Dict[str, Any]]
    discharge_summary: Optional[str]
    followup_instructions: Optional[List[str]]
    medical_disclaimer: str
