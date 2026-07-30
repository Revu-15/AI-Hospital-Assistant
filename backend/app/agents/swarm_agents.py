from typing import Dict, Any, List
from app.agents.swarm_engine import Agent, Result

# ================= 8 OpenAI Swarm Agent Definitions =================

def transfer_to_appointment_agent() -> Agent:
    """Transfer the user conversation to the Appointment Agent for scheduling, canceling, or checking doctor slots."""
    return appointment_agent

def transfer_to_medical_agent() -> Agent:
    """Transfer the user conversation to the Medical Records Agent to view reports, summarize medical history, or search documents."""
    return medical_agent

def transfer_to_billing_agent() -> Agent:
    """Transfer the user conversation to the Billing Agent to check invoices, payment status, insurance coverage, or refunds."""
    return billing_agent

def transfer_to_prescription_agent() -> Agent:
    """Transfer the user conversation to the Prescription Agent for drug explanations, medicine reminders, dosage guidance, and interaction warnings."""
    return prescription_agent

def transfer_to_emergency_agent() -> Agent:
    """Transfer the user conversation immediately to the Emergency Agent for urgent medical guidance, ambulance dispatch, and ER location."""
    return emergency_agent

def transfer_to_symptom_agent() -> Agent:
    """Transfer the user conversation to the Symptom Checker Agent for initial symptom triage, condition suggestions, and specialist matching."""
    return symptom_agent

def transfer_to_faq_agent() -> Agent:
    """Transfer the user conversation to the Hospital FAQ Agent for visiting hours, hospital locations, departments, and general inquiries."""
    return faq_agent

def transfer_to_main_agent() -> Agent:
    """Transfer back to the Main Hospital Agent coordinator."""
    return main_agent


# ================= Specialized Agent Functions / Tools =================

def book_appointment_tool(doctor_name: str, date: str, slot: str) -> str:
    """Book a new doctor appointment."""
    return f"Appointment successfully scheduled with {doctor_name} on {date} at {slot}. Token #APT-9042 generated."

def cancel_appointment_tool(appointment_id: str) -> str:
    """Cancel an existing appointment by ID."""
    return f"Appointment {appointment_id} has been cancelled. Confirmation SMS sent."

def check_doctor_availability_tool(department: str) -> str:
    """Check doctor availability by department."""
    return f"Available doctors in {department}: Dr. Sarah Jenkins (09:00 AM, 10:30 AM), Dr. Marcus Vance (11:00 AM, 02:00 PM)."

def get_patient_records_tool(patient_id: int) -> str:
    """Retrieve patient health records and latest lab summary."""
    return "Patient Records: Blood Pressure 120/80 mmHg, HbA1c 5.7%, Lipid Panel: Normal, No known severe drug allergies."

def summarize_medical_report_tool(report_text: str) -> str:
    """Summarize a medical report text."""
    return f"AI Report Summary: The submitted report shows normal cardiac biomarkers and stable respiratory metrics. Key note: Follow up in 30 days."

def check_insurance_coverage_tool(provider: str, policy_number: str) -> str:
    """Verify insurance coverage and co-pay policy."""
    return f"Insurance Status: Verified ACTIVE under {provider} (#{policy_number}). Co-pay coverage: 80% OPD, 100% IPD emergency."

def check_drug_interaction_tool(medication_a: str, medication_b: str) -> str:
    """Check for drug interactions between two medications."""
    return f"Interaction Alert: Combining {medication_a} and {medication_b} presents MODERATE BLEEDING RISK. Monitor co-administration closely."

def get_emergency_guidance_tool(symptom: str) -> str:
    """Get instant first aid emergency instructions."""
    return f"EMERGENCY INSTRUCTIONS for {symptom}: Keep patient calm, position upright, loosen tight clothing, and call ER Hotline +1 (800) 555-9111 immediately."

def get_hospital_info_tool(query: str) -> str:
    """Search hospital directory, timings, and department info."""
    return "Apollo Central Hospital: Open 24/7. OPD Hours: 08:00 AM - 08:00 PM. Emergency & ICU: 24 Hours. Location: 4th Block Main Road."


# ================= Agent Instances =================

main_agent = Agent(
    name="Main Hospital Agent",
    instructions=(
        "You are the Main AI Hospital Coordinator for Apollo Healthcare System. "
        "Your primary job is to greet users warmly, analyze their intent, and route them to the specialized agent best suited for their query. "
        "Available Agents: Appointment Agent, Medical Records Agent, Billing Agent, Prescription Agent, Emergency Agent, Symptom Agent, FAQ Agent. "
        "Always prioritize urgent medical symptoms by transferring to the Emergency Agent immediately."
    ),
    functions=[
        transfer_to_appointment_agent,
        transfer_to_medical_agent,
        transfer_to_billing_agent,
        transfer_to_prescription_agent,
        transfer_to_emergency_agent,
        transfer_to_symptom_agent,
        transfer_to_faq_agent
    ]
)

appointment_agent = Agent(
    name="Appointment Agent",
    instructions=(
        "You are the specialized Appointment Booking Agent for Apollo Healthcare. "
        "You manage scheduling, rescheduling, cancellation of doctor appointments, and checking doctor slot availability. "
        "Provide clear appointment dates, times, token numbers, and doctor details."
    ),
    functions=[
        book_appointment_tool,
        cancel_appointment_tool,
        check_doctor_availability_tool,
        transfer_to_main_agent,
        transfer_to_symptom_agent
    ]
)

medical_agent = Agent(
    name="Medical Records Agent",
    instructions=(
        "You are the Medical Records & Health Data Agent. "
        "You help patients retrieve medical history, summarize lab reports, analyze clinical documents, and search diagnostic records. "
        "Maintain absolute patient privacy and present medical information in easy-to-understand terms."
    ),
    functions=[
        get_patient_records_tool,
        summarize_medical_report_tool,
        transfer_to_prescription_agent,
        transfer_to_main_agent
    ]
)

billing_agent = Agent(
    name="Billing & Insurance Agent",
    instructions=(
        "You are the Billing, Insurance & Invoice Agent for the hospital. "
        "You assist patients with generating invoices, checking payment status, calculating insurance co-pays, processing refunds, and providing download links."
    ),
    functions=[
        check_insurance_coverage_tool,
        transfer_to_main_agent
    ]
)

prescription_agent = Agent(
    name="Prescription Agent",
    instructions=(
        "You are the Pharmacy & Prescription AI Specialist. "
        "You explain prescribed medications, dosage timings, potential side effects, and check for severe drug-drug interactions. "
        "Always include safety disclaimers to consult a licensed pharmacist or doctor."
    ),
    functions=[
        check_drug_interaction_tool,
        transfer_to_medical_agent,
        transfer_to_main_agent
    ]
)

emergency_agent = Agent(
    name="Emergency Triage Agent",
    instructions=(
        "You are the ER & Emergency Guidance Agent. "
        "You provide immediate, high-priority instructions for acute symptoms, first aid suggestions, ambulance contact numbers, and nearest hospital ER locations. "
        "Emphasize calling 911 / 108 immediately for life-threatening situations."
    ),
    functions=[
        get_emergency_guidance_tool,
        transfer_to_main_agent
    ]
)

symptom_agent = Agent(
    name="Symptom Checker Agent",
    instructions=(
        "You are the Symptom Checker & Clinical Triage Agent. "
        "You collect patient symptoms, evaluate potential medical conditions, recommend appropriate hospital departments and specialists, and offer safe home-care advice. "
        "Always include a medical disclaimer that AI triage does not replace professional medical evaluation."
    ),
    functions=[
        check_doctor_availability_tool,
        transfer_to_appointment_agent,
        transfer_to_emergency_agent,
        transfer_to_main_agent
    ]
)

faq_agent = Agent(
    name="Hospital FAQ Agent",
    instructions=(
        "You are the Hospital Information & FAQ Agent. "
        "You answer questions regarding hospital visiting hours, department locations, doctors list, insurance panels, parking, and general hospital facilities."
    ),
    functions=[
        get_hospital_info_tool,
        transfer_to_main_agent
    ]
)

# Agent Registry lookup map
AGENT_REGISTRY = {
    "main": main_agent,
    "appointment": appointment_agent,
    "medical": medical_agent,
    "billing": billing_agent,
    "prescription": prescription_agent,
    "emergency": emergency_agent,
    "symptom": symptom_agent,
    "faq": faq_agent
}
