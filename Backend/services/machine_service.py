from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.logger import logger
from models.machine import Machine
from schemes.machine import MachineCreate


# ------------------------------------
# Create Machine
# ------------------------------------

def create_machine(
    db: Session,
    machine: MachineCreate,
):
    """
    Create a new machine.
    """

    new_machine = Machine(
        machine_name=machine.machine_name,
        machine_type=machine.machine_type,
        location=machine.location,
        temperature=machine.temperature,
        vibration=machine.vibration,
        status=machine.status,
    )

    db.add(new_machine)
    db.commit()
    db.refresh(new_machine)

    logger.info(
        "Machine Created: %s",
        new_machine.machine_name,
    )

    return new_machine


# ------------------------------------
# Update Machine
# ------------------------------------

def update_machine(
    db: Session,
    machine_id: int,
    machine: MachineCreate,
):
    """
    Update an existing machine.
    """

    existing_machine = (
        db.query(Machine)
        .filter(Machine.id == machine_id)
        .first()
    )

    if existing_machine is None:
        return None

    existing_machine.machine_name = machine.machine_name
    existing_machine.machine_type = machine.machine_type
    existing_machine.location = machine.location
    existing_machine.temperature = machine.temperature
    existing_machine.vibration = machine.vibration
    existing_machine.status = machine.status

    db.commit()
    db.refresh(existing_machine)

    logger.info(
        "Machine Updated: %s",
        existing_machine.machine_name,
    )

    return existing_machine


# ------------------------------------
# Delete Machine
# ------------------------------------

def delete_machine(
    db: Session,
    machine_id: int,
):
    """
    Delete a machine by ID.
    """

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

    logger.info(
        "Machine Deleted: %s",
        machine.machine_name,
    )

    db.delete(machine)
    db.commit()

    return {
        "success": True,
        "message": "Machine deleted successfully",
    }

