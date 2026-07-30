from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routes import (
    auth_routes, patient_routes, medical_routes, doctor_routes, 
    appointment_routes, billing_routes, pharmacy_routes, notification_routes, 
    admin_routes, chat_routes, emergency_routes
)

# Automatically create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Hospital Assistant - OpenAI Swarm Multi-Agent Platform",
    description="Production-Ready Full-Stack Hospital Assistant using OpenAI Swarm Multi-Agent Architecture, FastAPI, SQLAlchemy & React",
    version="2.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register All API Routers
app.include_router(chat_routes.router)
app.include_router(auth_routes.router)
app.include_router(patient_routes.router)
app.include_router(doctor_routes.router)
app.include_router(appointment_routes.router)
app.include_router(medical_routes.router)
app.include_router(billing_routes.router)
app.include_router(pharmacy_routes.router)
app.include_router(emergency_routes.router)
app.include_router(notification_routes.router)
app.include_router(admin_routes.router)

@app.get("/")
def root():
    return {
        "app": "AI Hospital Assistant Backend",
        "swarm_engine": "OpenAI Swarm Multi-Agent Architecture Operational",
        "agents": [
            "Main Hospital Agent",
            "Appointment Agent",
            "Medical Records Agent",
            "Billing Agent",
            "Prescription Agent",
            "Emergency Agent",
            "Symptom Agent",
            "Hospital FAQ Agent"
        ],
        "docs_url": "/docs",
        "status": "online"
    }
