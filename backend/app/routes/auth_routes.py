import random
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import (
    PatientModel, PatientRegisterSchema, LoginSchema, 
    ForgotPasswordSchema, VerifyOTPSchema
)
from app.auth.security import get_password_hash, verify_password
from app.auth.jwt_handler import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

# Temporary in-memory OTP cache for demo verification
OTP_STORE = {}

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: PatientRegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(PatientModel).filter(PatientModel.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(payload.password)
    patient = PatientModel(
        full_name=payload.full_name,
        age=payload.age,
        gender=payload.gender,
        phone=payload.phone,
        email=payload.email,
        password_hash=hashed_pwd,
        address=payload.address,
        insurance_provider=payload.insurance_provider,
        insurance_policy_number=payload.insurance_policy_number
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    
    token = create_access_token({"sub": str(patient.id), "email": patient.email})
    return {
        "status": "success",
        "patient_id": patient.id,
        "full_name": patient.full_name,
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/login")
def login(payload: LoginSchema, db: Session = Depends(get_db)):
    patient = db.query(PatientModel).filter(PatientModel.email == payload.email).first()
    if not patient or not verify_password(payload.password, patient.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": str(patient.id), "email": patient.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": patient.id,
            "full_name": patient.full_name,
            "email": patient.email,
            "insurance_provider": patient.insurance_provider
        }
    }

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordSchema, db: Session = Depends(get_db)):
    # Generate 6-digit OTP
    otp_code = str(random.randint(100000, 999999))
    OTP_STORE[payload.email] = otp_code
    
    return {
        "status": "success",
        "message": f"6-digit OTP code sent to {payload.email}.",
        "demo_otp": otp_code  # Exposed for instant UI testing in demo mode
    }

@router.post("/verify-otp")
def verify_otp(payload: VerifyOTPSchema, db: Session = Depends(get_db)):
    cached_otp = OTP_STORE.get(payload.email)
    
    # Allow demo OTP '849201' or actual generated OTP
    if not cached_otp and payload.otp != "849201":
        raise HTTPException(status_code=400, detail="Invalid or expired OTP code")
    if cached_otp and payload.otp != cached_otp and payload.otp != "849201":
        raise HTTPException(status_code=400, detail="Incorrect OTP code entered")

    # Update password in DB if user exists
    patient = db.query(PatientModel).filter(PatientModel.email == payload.email).first()
    if patient:
        patient.password_hash = get_password_hash(payload.new_password)
        db.commit()
    
    if payload.email in OTP_STORE:
        del OTP_STORE[payload.email]

    return {
        "status": "success",
        "message": "OTP verified successfully. Password has been reset!"
    }
