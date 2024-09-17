# backend/app/routers/vehicles.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import Vehicle, Document
from ..database import get_db
from ..routers.auth import get_current_user
from ..schemas import VehicleOut

router = APIRouter(
    prefix="/vehicles",
    tags=["vehicles"]
)

@router.get("/", response_model=List[VehicleOut])
def get_vehicles(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    vehicles = db.query(Vehicle).all()
    for vehicle in vehicles:
        vehicle.documents = db.query(Document).filter(Document.vehicle_id == vehicle.id).all()
    return vehicles
