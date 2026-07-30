from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import NotificationModel

router = APIRouter(prefix="/api/v1/notifications", tags=["Notifications"])

@router.get("/my-notifications")
def get_my_notifications(db: Session = Depends(get_db)):
    notes = db.query(NotificationModel).filter(NotificationModel.patient_id == 1).all()
    if not notes:
        return {
            "status": "success",
            "notifications": [
                {
                    "id": 1,
                    "title": "Appointment Confirmation",
                    "message": "Your consultation with Dr. Sarah Jenkins (Cardiology) is confirmed for 10:30 AM Tomorrow. Token #TK-CARD-884.",
                    "channel": "SMS",
                    "created_at": "2026-07-26 10:00:00"
                },
                {
                    "id": 2,
                    "title": "Lab Report Ready",
                    "message": "Your Cardiac PDF lab report has been vectorized and summarized by AI.",
                    "channel": "PUSH",
                    "created_at": "2026-07-26 10:15:00"
                }
            ]
        }
    return {"status": "success", "notifications": notes}

@router.post("/send-sms-alert")
def send_sms_alert(payload: dict, db: Session = Depends(get_db)):
    phone = payload.get("phone", "+1987654321")
    msg = payload.get("message", "Appointment Alert")
    note = NotificationModel(patient_id=1, title="SMS Alert", message=msg, channel="SMS")
    db.add(note)
    db.commit()
    return {"status": "sent", "recipient": phone, "message": msg}
