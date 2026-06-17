from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router
from core.config import settings
from core.exceptions import register_exception_handlers
from database.init_db import create_tables

# ------------------------------------
# Create FastAPI App
# ------------------------------------

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
)

# ------------------------------------
# Register Global Exception Handlers
# ------------------------------------

register_exception_handlers(app)

# ------------------------------------
# Create Database Tables
# ------------------------------------

create_tables()

# ------------------------------------
# CORS Configuration
# ------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------
# Include API Routes
# ------------------------------------

app.include_router(router)