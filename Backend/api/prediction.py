from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.session import get_db
from models.machine import Machine
from services.prediction_service import predict_machine_health

router = APIRouter(
    prefix="/predictions",
    tags=["AI Predictions"],
)


# ------------------------------------
# Get AI Predictions For All Machines
# ------------------------------------

@router.get("/")
def get_predictions(
    db: Session = Depends(get_db),
):

    machines = db.query(Machine).all()

    predictions = []

    for machine in machines:
        predictions.append(
            predict_machine_health(machine)
        )

    return {
        "success": True,
        "count": len(predictions),
        "data": predictions,
    }


# ------------------------------------
# Get AI Prediction By Machine ID
# ------------------------------------

@router.get("/{machine_id}")
def get_prediction(
    machine_id: int,
    db: Session = Depends(get_db),
):

    machine = (
        db.query(Machine)
        .filter(Machine.id == machine_id)
        .first()
    )

    if machine is None:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return predict_machine_health(machine)