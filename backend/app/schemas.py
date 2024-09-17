# backend/app/schemas.py
from pydantic import BaseModel
from typing import List

class DocumentOut(BaseModel):
    id: int
    file_name: str
    file_path: str

    class Config:
        orm_mode = True

class VehicleOut(BaseModel):
    id: int
    plate_number: str
    brand: str
    model: str
    entry_date: str
    status: str
    documents: List[DocumentOut] = []

    class Config:
        orm_mode = True

