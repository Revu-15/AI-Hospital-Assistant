from datetime import datetime, date, time

def parse_slot_time(time_str: str) -> time:
    """Parses time strings like '10:30 AM', '02:00 PM', '14:30' into datetime.time object."""
    if not time_str:
        return time(23, 59)
    try:
        t_clean = time_str.strip().upper()
        if "AM" in t_clean or "PM" in t_clean:
            return datetime.strptime(t_clean, "%I:%M %p").time()
        else:
            return datetime.strptime(t_clean, "%H:%M").time()
    except Exception:
        return time(23, 59)

def evaluate_status(appt_date_str: str, time_slot_str: str, current_status: str) -> str:
    """
    Server-side validation & evaluation for appointment statuses:
    - Future appointment -> Confirmed
    - Today's upcoming appointment -> Upcoming
    - Completed consultation -> Completed
    - Past appointment without consultation -> Missed
    - Cancelled by patient -> Cancelled
    - Cancelled by doctor -> Cancelled by Doctor
    """
    if not current_status:
        current_status = "Confirmed"

    status_lower = current_status.strip().lower()
    
    # Completed or Cancelled statuses remain immutable
    if "completed" in status_lower:
        return "Completed"
    if "cancelled by doctor" in status_lower or "canceled by doctor" in status_lower:
        return "Cancelled by Doctor"
    if "cancelled" in status_lower or "canceled" in status_lower:
        return "Cancelled"

    now = datetime.now()
    today = now.date()

    try:
        appt_date = datetime.strptime(appt_date_str.strip(), "%Y-%m-%d").date()
    except Exception:
        return current_status

    appt_time = parse_slot_time(time_slot_str)
    appt_datetime = datetime.combine(appt_date, appt_time)

    if appt_datetime > now:
        if appt_date == today:
            return "Upcoming"
        else:
            return "Confirmed"
    else:
        # Date & time are in the past and consultation was not marked Completed
        return "Missed"

def sync_appointments_in_db(db_session):
    """Iterates through all database appointments and updates past uncompleted appointments to 'Missed' or 'Upcoming'/'Confirmed'."""
    try:
        from app.models.schemas import AppointmentModel
        appointments = db_session.query(AppointmentModel).all()
        updated_count = 0
        for appt in appointments:
            new_status = evaluate_status(appt.appointment_date, appt.appointment_time, appt.status)
            if appt.status != new_status:
                appt.status = new_status
                updated_count += 1
        if updated_count > 0:
            db_session.commit()
    except Exception as err:
        print("Status sync error:", err)
