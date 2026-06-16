from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router
from database.init_db import create_tables

# ------------------------------------
# Create FastAPI App
# ------------------------------------

app = FastAPI(
    title="MaintAI API",
    description="AI Powered Predictive Maintenance Platform",
    version="1.0.0",
)

# ------------------------------------
# Create Database Tables
# ------------------------------------

create_tables()

# ------------------------------------
# CORS Configuration
# ------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------
# Include API Routes
# ------------------------------------

app.include_router(router)