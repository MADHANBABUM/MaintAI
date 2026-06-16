from fastapi import APIRouter

router = APIRouter()


@router.get("/", tags=["Home"])
async def home():
    return {
        "success": True,
        "message": "Welcome to MaintAI API",
        "version": "1.0.0",
        "status": "Running"
    }


@router.get("/health", tags=["Health"])
async def health():
    return {
        "success": True,
        "status": "Healthy"
    }