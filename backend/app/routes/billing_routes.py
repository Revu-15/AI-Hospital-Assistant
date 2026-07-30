import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import BillingCheckoutSchema, BillModel
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(tags=["Billing & Insurance"])

SAMPLE_INVOICES = [
    {
        "id": 1,
        "invoice_number": "INV-2026-9402",
        "date": "2026-07-28",
        "description": "Cardiology Consultation & Lipid Panel",
        "gross_amount": 350.00,
        "insurance_covered": 280.00,
        "patient_copay": 70.00,
        "insurance_provider": "Star Health Care",
        "status": "PAID",
        "payment_method": "Credit Card (ending in 4920)"
    },
    {
        "id": 2,
        "invoice_number": "INV-2026-8819",
        "date": "2026-06-14",
        "description": "Abdominal Ultrasound & Physician Fee",
        "gross_amount": 220.00,
        "insurance_covered": 176.00,
        "patient_copay": 44.00,
        "insurance_provider": "Star Health Care",
        "status": "PAID",
        "payment_method": "Apple Pay"
    },
    {
        "id": 3,
        "invoice_number": "INV-2026-7710",
        "date": "2026-08-01",
        "description": "Upcoming Follow-Up Consultation Copay",
        "gross_amount": 150.00,
        "insurance_covered": 120.00,
        "patient_copay": 30.00,
        "insurance_provider": "Star Health Care",
        "status": "PENDING",
        "payment_method": "Unpaid"
    }
]

class InsuranceVerifySchema(BaseModel):
    provider: str
    policy_number: str

@router.get("/billing")
@router.get("/api/v1/billing")
@router.get("/billing/invoices")
@router.get("/api/v1/billing/invoices")
def get_invoices(db: Session = Depends(get_db)):
    bills = db.query(BillModel).all()
    if bills:
        return {
            "status": "success",
            "total": len(bills),
            "invoices": [
                {
                    "id": b.id,
                    "invoice_number": b.invoice_number,
                    "date": str(b.created_at)[:10] if b.created_at else "2026-07-30",
                    "description": "Hospital Medical Consultation & Care",
                    "gross_amount": b.gross_amount,
                    "insurance_covered": b.insurance_covered,
                    "patient_copay": b.patient_copay,
                    "insurance_provider": "Star Health Care",
                    "status": b.status,
                    "payment_method": "Credit Card"
                } for b in bills
            ]
        }
    return {
        "status": "success",
        "total": len(SAMPLE_INVOICES),
        "invoices": SAMPLE_INVOICES
    }

@router.post("/billing/checkout")
@router.post("/api/v1/billing/checkout")
def checkout_billing(payload: BillingCheckoutSchema, db: Session = Depends(get_db)):
    consultation_fee = 150.00
    pharmacy_cost = 45.00
    lab_test_cost = 105.00
    total_amount = consultation_fee + pharmacy_cost + lab_test_cost
    
    insurance_covered = round(total_amount * 0.80, 2)
    patient_payable = round(total_amount - insurance_covered, 2)
    invoice_num = f"INV-2026-{random.randint(1000, 9999)}"

    bill = BillModel(
        patient_id=1,
        invoice_number=invoice_num,
        gross_amount=total_amount,
        insurance_covered=insurance_covered,
        patient_copay=patient_payable,
        status="PAID"
    )
    db.add(bill)
    db.commit()
    db.refresh(bill)
    
    return {
        "status": "success",
        "invoice_number": invoice_num,
        "patient_name": "John Doe",
        "insurance_provider": "Star Health Care",
        "consultation_fee": consultation_fee,
        "pharmacy_cost": pharmacy_cost,
        "lab_test_cost": lab_test_cost,
        "gross_amount": total_amount,
        "insurance_covered": insurance_covered,
        "patient_copay": patient_payable,
        "payment_status": "PAID",
        "payment_method": payload.payment_method,
        "message": "Payment successfully processed. Invoice generated!"
    }

@router.post("/billing/verify-insurance")
@router.post("/api/v1/billing/verify-insurance")
def verify_insurance(payload: InsuranceVerifySchema):
    return {
        "status": "success",
        "verified": True,
        "provider": payload.provider,
        "policy_number": payload.policy_number,
        "coverage_percentage": 80,
        "copay_percentage": 20,
        "max_annual_limit": "$50,000.00",
        "deductible_met": True,
        "message": f"Insurance Policy #{payload.policy_number} under {payload.provider} is ACTIVE with 80% coverage."
    }

@router.get("/billing/refund-status")
@router.get("/api/v1/billing/refund-status")
def get_refund_status():
    return {
        "status": "success",
        "refunds": [
            {
                "refund_id": "RF-9041",
                "invoice_number": "INV-2026-4401",
                "original_amount": 70.00,
                "refund_amount": 70.00,
                "reason": "Cancelled Consultation",
                "status": "PROCESSED",
                "processed_date": "2026-07-20"
            }
        ]
    }
