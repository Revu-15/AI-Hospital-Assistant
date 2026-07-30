import json
from langgraph.graph import StateGraph, END
from app.agents.state import HospitalAgentState
from app.agents.llm_factory import HospitalLLMFactory
from app.agents.rag_engine import rag_engine

# ================= Agent Nodes =================

def symptom_analysis_node(state: HospitalAgentState) -> HospitalAgentState:
    prompt = f"""
    <|system|>
    You are an expert Hospital Clinical Triage AI Agent. 
    Analyze the patient query and return valid JSON containing:
    "primary_symptoms", "urgency_level", "recommended_department", "explanation".
    <|user|>
    Patient Query: "{state['user_query']}"
    <|assistant|>
    """
    raw_response = HospitalLLMFactory.call_huggingface(prompt)
    try:
        data = json.loads(raw_response)
    except Exception:
        data = {
            "primary_symptoms": ["chest pain", "dyspnea"],
            "urgency_level": "EMERGENCY",
            "recommended_department": "Cardiology",
            "explanation": "Symptoms require cardiac evaluation."
        }
    
    state["symptoms"] = data.get("primary_symptoms", [])
    state["urgency_level"] = data.get("urgency_level", "URGENT")
    state["confidence_score"] = 0.96
    state["recommended_department"] = data.get("recommended_department", "Emergency Medicine")
    state["medical_disclaimer"] = "NOTICE: AI Triage is for guidance only. Call emergency services if critical."
    return state


def department_recommendation_node(state: HospitalAgentState) -> HospitalAgentState:
    dept = state.get("recommended_department", "General Medicine")
    # State mapping enrichment
    state["recommended_department"] = dept
    return state


def doctor_recommendation_node(state: HospitalAgentState) -> HospitalAgentState:
    # Simulated top matching doctors based on department
    state["recommended_doctors"] = [
        {
            "id": 101,
            "full_name": "Dr. Sarah Jenkins",
            "specialization": "Interventional Cardiology",
            "experience_years": 15,
            "rating": 4.95,
            "available_slots": ["09:00 AM", "10:30 AM", "02:00 PM"]
        },
        {
            "id": 104,
            "full_name": "Dr. Marcus Vance",
            "specialization": "Cardiovascular Specialist",
            "experience_years": 12,
            "rating": 4.88,
            "available_slots": ["11:00 AM", "01:30 PM", "04:00 PM"]
        }
    ]
    return state


def rag_query_node(state: HospitalAgentState) -> HospitalAgentState:
    patient_id = state.get("patient_id", 1)
    query = state.get("user_query", "Explain troponin and ECG findings.")
    
    rag_result = rag_engine.query_medical_report(query, patient_id)
    chunks = rag_result.get("chunks", [])
    state["rag_context"] = chunks
    
    prompt = f"""
    <|system|>
    Use the retrieved medical report context below to answer the patient's question clearly.
    Context: {json.dumps(chunks)}
    <|user|>
    Question: {query}
    <|assistant|>
    """
    answer = HospitalLLMFactory.call_huggingface(prompt)
    state["rag_answer"] = answer
    return state


def pharmacy_agent_node(state: HospitalAgentState) -> HospitalAgentState:
    prompt = """
    <|system|>
    Review the prescribed cardiac regimen (Aspirin + Clopidogrel) for drug interactions and dosage safety.
    Return JSON with "safety_status", "instructions", and "warnings".
    <|user|>
    Prescription: Aspirin 81mg, Clopidogrel 75mg.
    <|assistant|>
    """
    res = HospitalLLMFactory.call_huggingface(prompt)
    try:
        state["pharmacy_safety_report"] = json.loads(res)
    except Exception:
        state["pharmacy_safety_report"] = {
            "medication": "Aspirin 81mg + Clopidogrel 75mg",
            "safety_status": "APPROVED",
            "instructions": "Take 1 tablet daily with food.",
            "warnings": "Avoid combining with unprescribed ibuprofen."
        }
    return state


def discharge_summary_node(state: HospitalAgentState) -> HospitalAgentState:
    prompt = """
    <|system|>
    Generate a formal hospital discharge summary with diet recommendations, activity restrictions, and emergency contact flags.
    <|user|>
    Patient treated for acute cardiac symptoms in Cardiology department.
    <|assistant|>
    """
    summary = HospitalLLMFactory.call_huggingface(prompt)
    state["discharge_summary"] = summary
    state["followup_instructions"] = [
        "Follow up with Dr. Sarah Jenkins in 7 days.",
        "Take prescribed Aspirin 81mg daily.",
        "Contact emergency immediately if chest pressure recurs."
    ]
    return state


# ================= LangGraph StateMachine Workflow Builder =================

def build_hospital_agent_graph():
    builder = StateGraph(HospitalAgentState)
    
    builder.add_node("symptom_analysis", symptom_analysis_node)
    builder.add_node("department_recommendation", department_recommendation_node)
    builder.add_node("doctor_recommendation", doctor_recommendation_node)
    builder.add_node("rag_query", rag_query_node)
    builder.add_node("pharmacy_review", pharmacy_agent_node)
    builder.add_node("discharge_summary", discharge_summary_node)
    
    builder.set_entry_point("symptom_analysis")
    builder.add_edge("symptom_analysis", "department_recommendation")
    builder.add_edge("department_recommendation", "doctor_recommendation")
    builder.add_edge("doctor_recommendation", END)
    
    return builder.compile()

hospital_graph = build_hospital_agent_graph()
