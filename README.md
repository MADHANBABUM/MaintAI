# 🤖 MaintAI

## AI Powered Predictive Maintenance Platform

MaintAI is a full-stack AI-powered predictive maintenance platform designed to monitor industrial machines, analyze operational data, calculate machine health, predict failures, and provide intelligent maintenance recommendations.

The project is built using **FastAPI**, **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **SQLite**, and **SQLAlchemy**.

---

# ✨ Features

## Backend

- RESTful FastAPI APIs
- Machine CRUD Operations
- Dashboard Statistics API
- Health Check API
- Search & Filter APIs
- Sort & Pagination APIs
- AI Prediction API
- AI Fleet Insights API

---

## Frontend

- Modern Responsive Dashboard
- Professional Sidebar Navigation
- Dashboard Statistics Cards
- Machine Management Table
- Search & Filter Interface
- Interactive Charts
- AI Fleet Insights Dashboard
- Premium AI Cards

---

# 🤖 AI Prediction Engine

MaintAI includes a rule-based AI prediction engine that analyzes machine conditions and provides predictive maintenance insights.

### AI Input Parameters

- Temperature
- Vibration
- Machine Status

### AI Output

- Health Score
- Risk Score
- AI Prediction
- AI Confidence
- Next Maintenance Days
- Smart Recommendation

---

# 🛠 Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Visualization

- Recharts

---

# 📂 Project Structure

```
MaintAI/

├── Backend/
│   ├── api/
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── schemes/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
├── Frontend/
│   ├── app/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── next.config.ts
│
├── Docs/
├── Database/
└── README.md
```

---

# 🚀 Backend Setup

```bash
cd Backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# 🚀 Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# 📊 Available APIs

## Home

```
GET /
```

## Health

```
GET /health
```

## Dashboard Statistics

```
GET /dashboard/stats
```

## Machines

```
GET /machines
POST /machines
PUT /machines/{id}
DELETE /machines/{id}
```

## AI Prediction

```
GET /predictions
GET /predictions/{machine_id}
```

---

# 🎯 Current Modules

- ✅ Dashboard
- ✅ Machine Management
- ✅ Search & Filter
- ✅ Charts & Analytics
- ✅ AI Prediction Engine
- ✅ AI Fleet Insights
- ✅ Risk Score System
- ✅ Recommendation Engine

---

# 🔮 Planned Enhancements

- Machine Detail Page
- Authentication & Authorization
- Real-time Monitoring
- WebSocket Integration
- Maintenance History
- PDF Report Export
- Dark Mode
- Deployment

---

# 👨‍💻 Development

**Project:** MaintAI

**Theme:** AI Powered Predictive Maintenance Platform

**Built With:** FastAPI + Next.js + TypeScript + Tailwind CSS

**Status:** Active Development 🚀
