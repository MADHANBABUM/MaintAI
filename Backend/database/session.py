from sqlalchemy.orm import Session

from database.connection import SessionLocal


def get_db():
    """
    Database session dependency.
    Creates a new session for every request and closes it automatically.
    """

    db: Session = SessionLocal()

    try:
        yield db
    finally:
        db.close()