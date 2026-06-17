from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database.session import get_db
from models.machine import Machine
from schemes.machine import MachineCreate, MachineResponse
from schemes.response import APIResponse
from services.machine_service import (
    create_machine,
    update_machine,
    delete_machine,
)

router = APIRouter(
    prefix="",
    tags=["MaintAI API"],
)


# ------------------------------------
# Home Endpoint
# ------------------------------------

@router.get(
    "/",
    response_model=APIResponse,
    tags=["Home"],
)
async def home():
    return APIResponse(
        success=True,
        message="Welcome to MaintAI API",
        data={
            "version": "1.0.0",
            "status": "Running",
        },
    )


# ------------------------------------
# Health Check Endpoint
# ------------------------------------

@router.get("/health", tags=["Health"])
async def health():
    return {
        "success": True,
        "status": "Healthy",
    }


# ------------------------------------
# Dashboard Statistics
# ------------------------------------

@router.get(
    "/dashboard/stats",
    tags=["Dashboard"],
)
def dashboard_stats(
    db: Session = Depends(get_db),
):
    total = db.query(Machine).count()

    healthy = (
        db.query(Machine)
        .filter(Machine.status == "Healthy")
        .count()
    )

    maintenance = (
        db.query(Machine)
        .filter(Machine.status == "Maintenance Required")
        .count()
    )

    critical = (
        db.query(Machine)
        .filter(Machine.status == "Critical")
        .count()
    )

    return {
        "total_machines": total,
        "healthy": healthy,
        "maintenance_required": maintenance,
        "critical": critical,
    }


# ------------------------------------
# Create Machine
# ------------------------------------

@router.post(
    "/machines",
    response_model=MachineResponse,
    tags=["Machines"],
)
def add_machine(
    machine: MachineCreate,
    db: Session = Depends(get_db),
):
    return create_machine(db, machine)


# ------------------------------------
# Get All Machines
# ------------------------------------

@router.get(
    "/machines",
    response_model=list[MachineResponse],
    tags=["Machines"],
)
def get_machines(
    db: Session = Depends(get_db),
):
    return db.query(Machine).all()


# ------------------------------------
# Search Machines
# ------------------------------------

@router.get(
    "/machines/search",
    response_model=list[MachineResponse],
    tags=["Machines"],
)
def search_machines(
    name: str = Query(..., description="Machine name"),
    db: Session = Depends(get_db),
):
    machines = (
        db.query(Machine)
        .filter(
            Machine.machine_name.ilike(f"%{name}%")
        )
        .all()
    )

    return machines


# ------------------------------------
# Filter Machines By Status
# ------------------------------------

@router.get(
    "/machines/filter",
    response_model=list[MachineResponse],
    tags=["Machines"],
)
def filter_machines(
    status: str = Query(..., description="Machine status"),
    db: Session = Depends(get_db),
):
    machines = (
        db.query(Machine)
        .filter(
            Machine.status == status
        )
        .all()
    )

    return machines
# ------------------------------------
# Sort Machines By Temperature
# ------------------------------------

@router.get(
    "/machines/sort",
    response_model=list[MachineResponse],
    tags=["Machines"],
)
def sort_machines(
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):

    if order.lower() == "desc":
        machines = (
            db.query(Machine)
            .order_by(Machine.temperature.desc())
            .all()
        )
    else:
        machines = (
            db.query(Machine)
            .order_by(Machine.temperature.asc())
            .all()
        )

    return machines
# ------------------------------------
# Pagination API
# ------------------------------------

@router.get(
    "/machines/paginate",
    response_model=list[MachineResponse],
    tags=["Machines"],
)
def paginate_machines(
    skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1),
    db: Session = Depends(get_db),
):
    machines = (
        db.query(Machine)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return machines


# ------------------------------------
# Get Machine By ID
# ------------------------------------

@router.get(
    "/machines/{machine_id}",
    response_model=MachineResponse,
    tags=["Machines"],
)
def get_machine_by_id(
    machine_id: int,
    db: Session = Depends(get_db),
):
    machine = (
        db.query(Machine)
        .filter(
            Machine.id == machine_id
        )
        .first()
    )

    if machine is None:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return machine


# ------------------------------------
# Update Machine
# ------------------------------------

@router.put(
    "/machines/{machine_id}",
    response_model=MachineResponse,
    tags=["Machines"],
)
def edit_machine(
    machine_id: int,
    machine: MachineCreate,
    db: Session = Depends(get_db),
):
    updated_machine = update_machine(
        db,
        machine_id,
        machine,
    )

    if updated_machine is None:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return updated_machine


# ------------------------------------
# Delete Machine
# ------------------------------------

@router.delete(
    "/machines/{machine_id}",
    tags=["Machines"],
)
def remove_machine(
    machine_id: int,
    db: Session = Depends(get_db),
):
    return delete_machine(
        db,
        machine_id,
    )