from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, date
from app.database import get_db
from app.models.schemas import AppointmentModel, BookAppointmentSchema, DoctorModel
from app.utils.status_evaluator import evaluate_status, sync_appointments_in_db, parse_slot_time
from app.utils.schedule_generator import generate_slots_for_date, DEFAULT_SCHEDULE_CONFIG
from pydantic import BaseModel
from typing import Optional, List
import random

router = APIRouter(tags=["Appointments & Dynamic Scheduling"])

GLOBAL_SCHEDULE_CONFIG = dict(DEFAULT_SCHEDULE_CONFIG)

class RescheduleSchema(BaseModel):
    appointment_id: int
    new_date: str
    new_slot: str

class ScheduleConfigSchema(BaseModel):
    work_days: List[str]
    slot_duration_minutes: int
    mon_fri_start: str
    mon_fri_end: str
    sat_start: str
    sat_end: str
    lunch_start: str
    lunch_end: str
    sun_holiday: bool

def parse_incoming_date(date_str: str) -> date:
    if not date_str:
        return datetime.now().date()
    clean = date_str.strip()

    sep = "-" if "-" in clean else ("/" if "/" in clean else ".")
    parts = clean.split(sep)

    if len(parts) == 3:
        try:
            p0, p1, p2 = int(parts[0]), int(parts[1]), int(parts[2])
            if p0 > 1000:
                # YYYY-MM-DD (e.g. 2026-08-03)
                return date(p0, p1, p2)
            elif p2 > 1000:
                # DD-MM-YYYY (e.g. 03-08-2026) -> p2 is Year (2026), p1 is Month (8), p0 is Day (3)
                return date(p2, p1, p0)
        except Exception:
            pass

    # Standard strptime fallback
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%Y/%m/%d"):
        try:
            return datetime.strptime(clean, fmt).date()
        except Exception:
            pass

    return datetime.now().date()

@router.post("/appointments/book")
@router.post("/api/v1/appointments/book")
@router.post("/appointments")
@router.post("/api/v1/appointments")
def book_appointment(payload: BookAppointmentSchema, db: Session = Depends(get_db)):
    now = datetime.now()
    today_date = now.date()

    target_date_str = payload.date or payload.appointment_date
    target_slot_str = payload.slot or payload.time_slot

    if not target_date_str or not target_slot_str:
        raise HTTPException(
            status_code=400,
            detail="Appointment date and time slot are required."
        )

    target_date_clean = target_date_str.strip()
    target_slot_clean = target_slot_str.strip()

    # Rule 1: Parse complete date
    try:
        appt_date = parse_incoming_date(target_date_clean)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid date format. Please select a valid appointment date."
        )

    # Rule 2: If selected_date > current_date -> Always allow booking (if slot falls in working hours & not booked)
    # Rule 4: If selected_date < current_date -> Reject booking
    # Rule 3: If selected_date == current_date -> Only compare selected time with current server time
    if appt_date < today_date:
        raise HTTPException(
            status_code=400,
            detail="The selected appointment slot has already passed. Please choose another available time."
        )
    elif appt_date == today_date:
        appt_time = parse_slot_time(target_slot_clean)
        appt_datetime = datetime.combine(today_date, appt_time)
        if appt_datetime <= now:
            raise HTTPException(
                status_code=400,
                detail="The selected appointment slot has already passed. Please choose another available time."
            )

    # Validate working days / holidays for doctor
    valid_slots = generate_slots_for_date(appt_date, GLOBAL_SCHEDULE_CONFIG)
    if not valid_slots:
        raise HTTPException(
            status_code=400,
            detail=f"Doctor is not available on {appt_date.strftime('%A')} ({target_date_clean}). Please select a working day."
        )

    # Prevent duplicate active bookings for the same doctor, date, and time slot
    formatted_date_db = appt_date.strftime("%Y-%m-%d")
    existing_booking = db.query(AppointmentModel).filter(
        AppointmentModel.doctor_id == payload.doctor_id,
        AppointmentModel.appointment_date == formatted_date_db,
        AppointmentModel.appointment_time == target_slot_clean,
        AppointmentModel.status.notin_(["Cancelled", "Cancelled by Doctor"])
    ).first()

    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="This time slot is no longer available. Please choose another slot."
        )

    # All validations passed -> Save to database
    token = f"TK-CARD-{random.randint(100, 999)}"
    initial_status = "Upcoming" if appt_date == today_date else "Confirmed"
    symptoms = payload.symptoms_summary or payload.notes or "General Consultation"
    
    appointment = AppointmentModel(
        patient_id=1,
        doctor_id=payload.doctor_id,
        appointment_date=formatted_date_db,
        appointment_time=target_slot_clean,
        symptoms_summary=symptoms,
        triage_urgency=payload.urgency or "ROUTINE",
        token_number=token,
        status=initial_status
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return {
        "status": "success",
        "appointment_id": appointment.id,
        "token_number": appointment.token_number,
        "date": appointment.appointment_date,
        "time": appointment.appointment_time,
        "status": appointment.status,
        "urgency": appointment.triage_urgency,
        "message": f"Appointment successfully booked ({appointment.status}) for {appointment.appointment_date} at {appointment.appointment_time}."
    }

@router.get("/appointments")
@router.get("/api/v1/appointments")
@router.get("/appointments/list")
@router.get("/api/v1/appointments/list")
def list_appointments(db: Session = Depends(get_db)):
    sync_appointments_in_db(db)
    appointments = db.query(AppointmentModel).all()
    
    raw_samples = [
        {
            "id": 1,
            "token_number": "TK-CARD-892",
            "doctor_id": 101,
            "doctor_name": "Dr. Rajesh Kumar",
            "department": "Cardiology",
            "date": "2026-08-01",
            "time": "10:30 AM",
            "raw_status": "Scheduled",
            "urgency": "ROUTINE"
        },
        {
            "id": 2,
            "token_number": "TK-CARD-441",
            "doctor_id": 104,
            "doctor_name": "Dr. Anil Verma",
            "department": "Orthopedics",
            "date": "2026-08-05",
            "time": "02:00 PM",
            "raw_status": "Scheduled",
            "urgency": "URGENT"
        }
    ]

    if not appointments:
        formatted_samples = []
        for s in raw_samples:
            eval_s = evaluate_status(s["date"], s["time"], s["raw_status"])
            s["status"] = eval_s
            del s["raw_status"]
            formatted_samples.append(s)
        return {
            "status": "success",
            "total": len(formatted_samples),
            "appointments": formatted_samples
        }

    out_appts = []
    for a in appointments:
        eval_st = evaluate_status(a.appointment_date, a.appointment_time, a.status)
        if a.status != eval_st:
            a.status = eval_st
            db.commit()
        out_appts.append({
            "id": a.id,
            "token_number": a.token_number,
            "doctor_id": a.doctor_id,
            "doctor_name": f"Dr. Specialist #{a.doctor_id}",
            "date": a.appointment_date,
            "time": a.appointment_time,
            "status": eval_st,
            "urgency": a.triage_urgency
        })

    return {
        "status": "success",
        "total": len(out_appts),
        "appointments": out_appts
    }

@router.post("/appointments/cancel/{appointment_id}")
@router.post("/api/v1/appointments/cancel/{appointment_id}")
def cancel_appointment(appointment_id: int, cancelled_by: Optional[str] = "patient", db: Session = Depends(get_db)):
    appointment = db.query(AppointmentModel).filter(AppointmentModel.id == appointment_id).first()
    status_label = "Cancelled by Doctor" if cancelled_by and "doctor" in cancelled_by.lower() else "Cancelled"
    if appointment:
        appointment.status = status_label
        db.commit()
    return {"status": "success", "message": f"Appointment {appointment_id} has been {status_label}."}

@router.post("/appointments/reschedule")
@router.post("/api/v1/appointments/reschedule")
def reschedule_appointment(payload: RescheduleSchema, db: Session = Depends(get_db)):
    now = datetime.now()
    try:
        new_d = datetime.strptime(payload.new_date.strip(), "%Y-%m-%d").date()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid date format.")
        
    new_t = parse_slot_time(payload.new_slot)
    if datetime.combine(new_d, new_t) <= now:
        raise HTTPException(
            status_code=400,
            detail="The selected appointment slot has already passed. Please choose another available time."
        )

    new_status = evaluate_status(payload.new_date, payload.new_slot, "Confirmed")
    appointment = db.query(AppointmentModel).filter(AppointmentModel.id == payload.appointment_id).first()
    if appointment:
        appointment.appointment_date = payload.new_date
        appointment.appointment_time = payload.new_slot
        appointment.status = new_status
        db.commit()
    return {
        "status": "success",
        "new_status": new_status,
        "message": f"Appointment rescheduled to {payload.new_date} at {payload.new_slot} ({new_status})."
    }

@router.get("/appointments/availability")
@router.get("/api/v1/appointments/availability")
def check_availability(
    doctor_id: Optional[int] = None, 
    date_str: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    now = datetime.now()
    today_date = now.date()

    target_date_obj = parse_incoming_date(date_str)
    iso_date_str = target_date_obj.strftime("%Y-%m-%d")
    alt_date_str = target_date_obj.strftime("%d-%m-%Y")

    # Generate dynamic slots based on doctor's schedule configuration
    all_generated_slots = generate_slots_for_date(target_date_obj, GLOBAL_SCHEDULE_CONFIG)

    # Seed sample booked appointments for Dr. Anil Verma (id=103) on 2026-08-03 if DB is empty
    if db.query(AppointmentModel).count() == 0:
        try:
            seed_appts = [
                AppointmentModel(patient_id=1, doctor_id=103, appointment_date="2026-08-03", appointment_time="09:00 AM", status="Confirmed", token_number="TK-CARD-901"),
                AppointmentModel(patient_id=1, doctor_id=103, appointment_date="2026-08-03", appointment_time="11:00 AM", status="Confirmed", token_number="TK-CARD-902"),
                AppointmentModel(patient_id=1, doctor_id=103, appointment_date="2026-08-03", appointment_time="12:00 PM", status="Confirmed", token_number="TK-CARD-903")
            ]
            db.add_all(seed_appts)
            db.commit()
        except Exception:
            db.rollback()

    booked_slots = set()
    if doctor_id:
        db_appts = db.query(AppointmentModel).filter(
            AppointmentModel.doctor_id == doctor_id,
            AppointmentModel.appointment_date.in_([iso_date_str, alt_date_str]),
            AppointmentModel.status.notin_(["Cancelled", "Cancelled by Doctor"])
        ).all()
        booked_slots = {a.appointment_time for a in db_appts}

    slots_info = []
    for slot in all_generated_slots:
        is_available = True
        reason = "available"
        label = "Available"

        # Check if slot passed using exact Date object comparison
        if target_date_obj < today_date:
            is_available = False
            reason = "passed"
            label = "Expired"
        elif target_date_obj == today_date:
            slot_time = parse_slot_time(slot)
            slot_datetime = datetime.combine(today_date, slot_time)
            if slot_datetime <= now:
                is_available = False
                reason = "passed"
                label = "Expired"

        # Check if slot already booked in database
        if is_available and slot in booked_slots:
            is_available = False
            reason = "booked"
            label = "Booked"

        slots_info.append({
            "slot": slot,
            "available": is_available,
            "reason": reason,
            "label": label
        })

    available_only = [s["slot"] for s in slots_info if s["available"]]

    return {
        "status": "success",
        "date": iso_date_str,
        "is_holiday": len(all_generated_slots) == 0,
        "available_slots": available_only,
        "slots_detail": slots_info
    }

# Admin API to view & update dynamic scheduling rules
@router.get("/admin/schedule-config")
@router.get("/api/v1/admin/schedule-config")
def get_schedule_config():
    return {
        "status": "success",
        "config": GLOBAL_SCHEDULE_CONFIG
    }

@router.post("/admin/schedule-config")
@router.post("/api/v1/admin/schedule-config")
def update_schedule_config(payload: ScheduleConfigSchema):
    GLOBAL_SCHEDULE_CONFIG["work_days"] = payload.work_days
    GLOBAL_SCHEDULE_CONFIG["slot_duration_minutes"] = payload.slot_duration_minutes
    GLOBAL_SCHEDULE_CONFIG["mon_fri_hours"] = {"start": payload.mon_fri_start, "end": payload.mon_fri_end}
    GLOBAL_SCHEDULE_CONFIG["sat_hours"] = {"start": payload.sat_start, "end": payload.sat_end}
    GLOBAL_SCHEDULE_CONFIG["lunch_break"] = {"start": payload.lunch_start, "end": payload.lunch_end}
    GLOBAL_SCHEDULE_CONFIG["sun_holiday"] = payload.sun_holiday

    return {
        "status": "success",
        "message": "Doctor schedule configuration updated successfully!",
        "config": GLOBAL_SCHEDULE_CONFIG
    }
