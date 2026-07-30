# 🏥 Hospital Agentic AI System — Production-Ready Software Architecture & Blueprint

An end-to-end Agentic AI-powered Hospital Workflow Management System built with **React**, **FastAPI**, **LangGraph**, **LangChain**, **Hugging Face**, **FAISS**, and **MySQL**.

---

## 🌟 Overview

The **Hospital Agentic AI System** simulates a real-world, end-to-end patient journey from initial digital registration, AI-powered symptom triage, multi-agent consultation routing, medical report RAG analysis, kiosk check-in, doctor EHR integration, automated pharmacy drug-interaction screening, insurance billing, discharge summary generation, to automated follow-up care.

---

## 🏗️ Architecture Stack

| Layer | Technology / Tool | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Tailwind CSS, React Router v6, Axios, Lucide Icons | Responsive UI (Web, Mobile, Kiosk) |
| **Backend API** | FastAPI (Python 3.10+), Uvicorn | High-performance asynchronous API server |
| **Auth** | JWT (PyJWT), Passlib (bcrypt) | Secure token-based authentication & RBAC |
| **Database** | MySQL 8.0, SQLAlchemy Core/ORM | Relational data persistence & transactional integrity |
| **Agentic Framework** | LangGraph, LangChain Core | Multi-agent stateful workflow orchestration |
| **LLM Provider** | Hugging Face Inference API (`meta-llama/Meta-Llama-3-8B-Instruct`) | Clinical reasoning, triage, drug analysis, discharge |
| **Embedding Model** | `sentence-transformers/all-MiniLM-L6-v2` | Dense vector representation for RAG |
| **Vector DB** | FAISS (`faiss-cpu`) | High-performance local vector similarity search |
| **Document Processing** | PyPDF (LangChain PyPDFLoader) | Medical report parsing & text chunking |

---

## 📐 High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                   FRONTEND UI                                     |
|                      (React + Tailwind CSS + Lucide Icons)                        |
|                  [ Web App  |  Mobile View  |  Hospital Kiosk ]                   |
+----------------------------------------+------------------------------------------+
                                         | REST APIs (Axios / JWT)
                                         v
+-----------------------------------------------------------------------------------+
|                                  FASTAPI BACKEND                                  |
|  [ Auth Routes ]   [ Patient Routes ]   [ AI Agent Routes ]   [ Billing/Admin ]   |
+----------------------------------------+------------------------------------------+
                                         | Workflow State & Signals
                                         v
+-----------------------------------------------------------------------------------+
|                             LANGGRAPH MULTI-AGENT STATE                           |
|                                                                                   |
|  (Symptom Analysis) -> (Dept Routing) -> (Doctor Match) -> (Appointment Booking)  |
|                                                                                   |
|  (Report RAG)       -> (Pharmacy Review) -> (Billing Calc) -> (Discharge & Follow) |
+----+-----------------------------------+-------------------------------------+----+
     |                                   |                                     |
     v                                   v                                     v
+-----------------------+   +---------------------------+   +-----------------------+
|  HUGGING FACE API     |   |   FAISS VECTOR DATABASE   |   |     MYSQL DATABASE    |
| (Llama-3-8B-Instruct) |   | (all-MiniLM-L6-v2 Embed)  |   | (Relational Data &    |
| Triage & Clinical Text|   | Medical PDF Context Search|   | Patient EHR Records)  |
+-----------------------+   +---------------------------+   +-----------------------+
```

---

## 📁 Repository Directory Structure

```
Hospital Agent/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI Entrypoint
│   │   ├── config.py                   # Environment & App Config
│   │   ├── database.py                 # SQLAlchemy MySQL Connection Setup
│   │   ├── auth/
│   │   │   ├── __init__.py
│   │   │   ├── jwt_handler.py          # JWT Creation & Verification
│   │   │   └── security.py             # Password Hashing & Auth Dependency
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py              # Pydantic & SQLAlchemy Models
│   │   ├── agents/
│   │   │   ├── __init__.py
│   │   │   ├── state.py                # LangGraph State Schema
│   │   │   ├── workflow.py             # LangGraph Multi-Agent Graph Setup
│   │   │   ├── llm_factory.py          # Hugging Face LLM Wrapper & Chains
│   │   │   └── rag_engine.py           # PyPDF Loader + FAISS Vector Store Manager
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth_routes.py          # Registration & Login endpoints
│   │       ├── patient_routes.py       # Chat, Appointments, Checkin
│   │       ├── medical_routes.py       # PDF Upload & RAG Query
│   │       ├── doctor_routes.py        # Consultations, Prescriptions
│   │       ├── billing_routes.py       # Billing, Insurance & Checkout
│   │       └── admin_routes.py         # Hospital Analytics & Dashboard
│   ├── uploads/                        # Local Storage for Medical PDFs
│   ├── faiss_index/                    # Persisted FAISS Vector Store Files
│   ├── schema.sql                      # MySQL Database Table DDL Script
│   ├── requirements.txt                # Python Dependencies
│   └── Dockerfile                      # Backend Container Spec
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/                 # Shared Reusable UI Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StatCard.jsx
│   │   ├── pages/                      # 17 Screen Components
│   │   │   ├── Step1_Landing.jsx
│   │   │   ├── Step2_Registration.jsx
│   │   │   ├── Step3_Login.jsx
│   │   │   ├── Step4_AIChat.jsx
│   │   │   ├── Step5_SymptomAnalysis.jsx
│   │   │   ├── Step6_DeptRecommendation.jsx
│   │   │   ├── Step7_DoctorRecommendation.jsx
│   │   │   ├── Step8_AppointmentBooking.jsx
│   │   │   ├── Step9_ReportUpload.jsx
│   │   │   ├── Step10_RAGAgent.jsx
│   │   │   ├── Step11_KioskCheckin.jsx
│   │   │   ├── Step12_DoctorConsultation.jsx
│   │   │   ├── Step13_PharmacyAgent.jsx
│   │   │   ├── Step14_BillingAgent.jsx
│   │   │   ├── Step15_AdminDashboard.jsx
│   │   │   ├── Step16_DischargeSummary.jsx
│   │   │   └── Step17_FollowupAgent.jsx
│   │   ├── api/
│   │   │   └── client.js               # Axios Client Configuration
│   │   ├── App.jsx                     # React Router Routes Definition
│   │   ├── main.jsx                    # React Entrypoint
│   │   └── index.css                   # Tailwind CSS Setup & Theme Setup
│   ├── package.json                    # Node Dependencies
│   └── Dockerfile                      # Frontend Container Spec
├── docker-compose.yml                  # Full Stack Docker Setup
└── HOSPITAL_AI_AGENT_ARCHITECTURE.md   # Complete Architecture Document
```

---

## ⚡ Quick Start & Installation

### Option 1: Running via Docker Compose (Recommended)

1. **Clone & Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   MYSQL_ROOT_PASSWORD=rootpassword
   MYSQL_DATABASE=hospital_ai_db
   MYSQL_USER=hospital_user
   MYSQL_PASSWORD=hospital_pass
   HUGGINGFACE_API_TOKEN=hf_your_token_here
   JWT_SECRET_KEY=super-secret-jwt-key-32-chars-long
   ```

2. **Launch Services**:
   ```bash
   docker-compose up --build
   ```

3. **Access Applications**:
   - **Frontend UI**: `http://localhost:3000`
   - **Backend API Docs (Swagger)**: `http://localhost:8000/docs`
   - **MySQL Database**: `localhost:3306`

---

### Option 2: Manual Local Setup

#### 1. Database Setup (MySQL)
Create database and initialize tables:
```sql
CREATE DATABASE hospital_ai_db;
```
Import `backend/schema.sql` into MySQL.

#### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### 3. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 Full Architectural Documentation & Step-by-Step Technical Guide

For complete technical specifications covering all **17 Steps**, API endpoints, database schemas, Hugging Face prompt templates, LangGraph nodes, sequence diagrams, and ER diagrams, see [`HOSPITAL_AI_AGENT_ARCHITECTURE.md`](./HOSPITAL_AI_AGENT_ARCHITECTURE.md).
