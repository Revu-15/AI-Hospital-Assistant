from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models.schemas import AppointmentModel, BookAppointmentSchema, DoctorModel
from app.utils.status_evaluator import evaluate_status, sync_appointments_in_db, parse_slot_time
from pydantic import BaseModel
from typing import Optional
import random

router = APIRouter(tags=["Appointments"])

class RescheduleSchema(BaseModel):
    appointment_id: int
    new_date: str
    new_slot: str

@router.post("/appointments/book")
@router.post("/api/v1/appointments/book")
@router.post("/appointments")
@router.post("/api/v1/appointments")
def book_appointment(payload: BookAppointmentSchema, db: Session = Depends(get_db)):
    now = datetime.now()
    today = now.date()

    # Rule 1: Validate date and time against current server datetime
    try:
        appt_date = datetime.strptime(payload.date.strip(), "%Y-%m-%d").date()
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid date format. Please select a valid appointment date."
        )

    appt_time = parse_slot_time(payload.slot)
    appt_datetime = datetime.combine(appt_date, appt_time)

    # Rule 2 & 3: Check if selected slot has already passed
    if appt_datetime <= now:
        raise HTTPException(
            status_code=400,
            detail="The selected appointment slot has already passed. Please choose another available time."
        )

    # Rule 8 & 9: Prevent duplicate active bookings for the same doctor, date, and time slot
    existing_booking = db.query(AppointmentModel).filter(
        AppointmentModel.doctor_id == payload.doctor_id,
        AppointmentModel.appointment_date == payload.date,
        AppointmentModel.appointment_time == payload.slot,
        AppointmentModel.status.notin_(["Cancelled", "Cancelled by Doctor"])
    ).first()

    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="This time slot is no longer available. Please choose another slot."
        )

    # All validations passed -> Save to database
    token = f"TK-CARD-{random.randint(100, 999)}"
    initial_status = "Upcoming" if appt_date == today else "Confirmed"
    
    appointment = AppointmentModel(
        patient_id=1,
        doctor_id=payload.doctor_id,
        appointment_date=payload.date,
        appointment_time=payload.slot,
        symptoms_summary=payload.symptoms_summary,
        triage_urgency=payload.urgency,
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
    
    # Initial sample appointments evaluated with real-time status rules
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
    today_str = now.strftime("%Y-%m-%d")
    target_date_str = date_str or today_str

    default_slots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
        "11:00 AM", "11:30 AM", "12:00 PM", "01:30 PM", 
        "02:00 PM", "03:00 PM", "04:00 PM", "04:30 PM", "05:00 PM"
    ]

    booked_slots = set()
    if doctor_id and target_date_str:
        db_appts = db.query(AppointmentModel).filter(
            AppointmentModel.doctor_id == doctor_id,
            AppointmentModel.appointment_date == target_date_str,
            AppointmentModel.status.notin_(["Cancelled", "Cancelled by Doctor"])
        ).all()
        booked_slots = {a.appointment_time for a in db_appts}

    slots_info = []
    for slot in default_slots:
        is_available = True
        reason = "available"

        # Check if slot passed (if target date is today or earlier)
        if target_date_str < today_str:
            is_available = False
            reason = "passed"
        elif target_date_str == today_str:
            slot_time = parse_slot_time(slot)
            slot_datetime = datetime.combine(now.date(), slot_time)
            if slot_datetime <= now:
                is_available = False
                reason = "passed"

        # Check if slot already booked
        if is_available and slot in booked_slots:
            is_available = False
            reason = "booked"

        slots_info.append({
            "slot": slot,
            "available": is_available,
            "reason": reason
        })

    available_only = [s["slot"] for s in slots_info if s["available"]]

    return {
        "status": "success",
        "date": target_date_str,
        "available_slots": available_only,
        "slots_detail": slots_info
    }
