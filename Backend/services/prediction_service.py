from typing import Dict


def predict_machine_health(machine) -> Dict:
    """
    AI Prediction Engine for MaintAI
    --------------------------------
    Calculates:
    - Health Score
    - Risk Score
    - Prediction
    - Confidence
    - Next Maintenance Days
    - Recommendation
    """

    risk_score = 0

    # -----------------------------
    # Temperature Analysis
    # -----------------------------

    if machine.temperature < 40:
        risk_score += 10

    elif machine.temperature < 60:
        risk_score += 25

    elif machine.temperature < 80:
        risk_score += 50

    else:
        risk_score += 75

    # -----------------------------
    # Vibration Analysis
    # -----------------------------

    if machine.vibration < 1:
        risk_score += 5

    elif machine.vibration < 2:
        risk_score += 15

    elif machine.vibration < 4:
        risk_score += 30

    else:
        risk_score += 50

    # -----------------------------
    # Status Analysis
    # -----------------------------

    if machine.status == "Healthy":
        risk_score += 0

    elif machine.status == "Maintenance Required":
        risk_score += 20

    elif machine.status == "Critical":
        risk_score += 40

    # -----------------------------
    # Limit Risk Score
    # -----------------------------

    risk_score = min(risk_score, 100)

    # -----------------------------
    # AI Prediction
    # -----------------------------

    if risk_score <= 30:

        prediction = "Healthy"

        recommendation = (
            "Continue normal operation."
        )

        next_maintenance_days = 30

        confidence = 98

    elif risk_score <= 70:

        prediction = "Maintenance Soon"

        recommendation = (
            "Schedule preventive maintenance."
        )

        next_maintenance_days = 14

        confidence = 92

    else:

        prediction = "Critical"

        recommendation = (
            "Immediate inspection required."
        )

        next_maintenance_days = 1

        confidence = 96

    # -----------------------------
    # Health Score
    # -----------------------------

    health_score = 100 - risk_score

    return {

        "machine_id": machine.id,

        "machine_name": machine.machine_name,

        "health_score": health_score,

        "risk_score": risk_score,

        "prediction": prediction,

        "confidence": confidence,

        "next_maintenance_days": next_maintenance_days,

        "recommendation": recommendation,

    }