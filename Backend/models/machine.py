from sqlalchemy import Column, Integer, String, Float

from database.connection import Base


class Machine(Base):
    """
    Machine table for storing machine information.
    """

    __tablename__ = "machines"

    id = Column(Integer, primary_key=True, index=True)

    machine_name = Column(String(100), nullable=False)

    machine_type = Column(String(100), nullable=False)

    location = Column(String(100), nullable=False)

    temperature = Column(Float, default=0.0)

    vibration = Column(Float, default=0.0)

    status = Column(String(50), default="Healthy")