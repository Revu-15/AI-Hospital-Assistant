# 🚀 SmartHospital AI - Production Deployment Guide

This guide provides step-by-step instructions for deploying the **SmartHospital AI** application to cloud platforms (**Vercel**, **Render**, **Docker**, and **AWS/DigitalOcean**).

---

## 🌟 Option 1: Free Cloud Deployment (Vercel + Render) - RECOMMENDED

### Step A: Deploy Frontend to Vercel (1-Click)
1. Log in to [Vercel.com](https://vercel.com).
2. Click **Add New Project** -> Import from GitHub: `https://github.com/Revu-15/AI-Hospital-Assistant.git`.
3. Configure settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Vercel will give you a live production URL (e.g. `https://smarthospital-ai.vercel.app`).

---

### Step B: Deploy Backend to Render.com (1-Click)
1. Log in to [Render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect repository: `https://github.com/Revu-15/AI-Hospital-Assistant.git`.
4. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**. Render will give you a live API URL (e.g. `https://smarthospital-api.onrender.com`).

---

## 🐳 Option 2: 1-Click Docker Container Deployment

If you are hosting on **AWS EC2**, **DigitalOcean**, **Linode**, or any Linux VPS, use Docker Compose:

### 1. Clone Repository on Server
```bash
git clone https://github.com/Revu-15/AI-Hospital-Assistant.git
cd AI-Hospital-Assistant
```

### 2. Build & Launch Containers
```bash
docker-compose up -d --build
```

- **Frontend Live on**: `http://<your-server-ip>:3000`
- **Backend API Live on**: `http://<your-server-ip>:8000`

---

## 🔒 Verification & Credentials Summary

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@smarthospital.ai` | `Revu@2005_15` |
| **Doctor (20 Accounts)** | `dr.rajesh@mediconnect.ai`, `dr.priya@mediconnect.ai`, etc. | `Revu@2005` |
| **Patient** | `john.doe@example.com` | `123456` |
