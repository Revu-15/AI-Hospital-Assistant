from datetime import datetime, date, time, timedelta

DEFAULT_SCHEDULE_CONFIG = {
    "work_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "mon_fri_hours": {"start": "09:00 AM", "end": "05:00 PM"},
    "sat_hours": {"start": "09:00 AM", "end": "01:00 PM"},
    "sun_holiday": True,
    "slot_duration_minutes": 30,
    "lunch_break": {"start": "01:00 PM", "end": "02:00 PM"},
    "holidays": []
}

def parse_time_str(t_str: str) -> time:
    if not t_str:
        return time(9, 0)
    try:
        t_clean = t_str.strip().upper()
        if "AM" in t_clean or "PM" in t_clean:
            return datetime.strptime(t_clean, "%I:%M %p").time()
        return datetime.strptime(t_clean, "%H:%M").time()
    except Exception:
        return time(9, 0)

def generate_slots_for_date(date_obj: date, config: dict = None) -> list:
    cfg = config or DEFAULT_SCHEDULE_CONFIG
    day_name = date_obj.strftime("%A")

    # Check Sunday / Holiday
    if day_name == "Sunday" and cfg.get("sun_holiday", True):
        return []
    if date_obj.strftime("%Y-%m-%d") in cfg.get("holidays", []):
        return []
    if day_name not in cfg.get("work_days", []):
        return []

    # Get start & end hours
    if day_name == "Saturday":
        h_start = parse_time_str(cfg["sat_hours"]["start"])
        h_end = parse_time_str(cfg["sat_hours"]["end"])
    else:
        h_start = parse_time_str(cfg["mon_fri_hours"]["start"])
        h_end = parse_time_str(cfg["mon_fri_hours"]["end"])

    lunch_start = parse_time_str(cfg["lunch_break"]["start"])
    lunch_end = parse_time_str(cfg["lunch_break"]["end"])
    slot_min = cfg.get("slot_duration_minutes", 30)

    curr_dt = datetime.combine(date_obj, h_start)
    end_dt = datetime.combine(date_obj, h_end)

    slots = []
    while curr_dt < end_dt:
        t_slot = curr_dt.time()
        # Exclude lunch time
        if not (lunch_start <= t_slot < lunch_end):
            # Format nicely e.g. "09:00 AM"
            slots.append(curr_dt.strftime("%I:%M %p"))
        curr_dt += timedelta(minutes=slot_min)

    return slots
