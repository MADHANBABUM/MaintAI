from pydantic import BaseModel


class MachineBase(BaseModel):
    machine_name: str
    machine_type: str
    location: str
    temperature: float
    vibration: float
    status: str


class MachineCreate(MachineBase):
    pass


class MachineResponse(MachineBase):
    id: int

    class Config:
        from_attributes = True