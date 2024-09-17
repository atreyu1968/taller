# backend/app/routers/dashboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models import Vehicle
from ..database import get_db
from ..routers.auth import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"]
)

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_vehicles = db.query(Vehicle).count()
    in_repair = db.query(Vehicle).filter(Vehicle.status == 'in_repair').count()
    finished = db.query(Vehicle).filter(Vehicle.status == 'finished').count()
    pending = db.query(Vehicle).filter(Vehicle.status == 'pending').count()

    return {
        "total_vehicles": total_vehicles,
        "in_repair": in_repair,
        "finished": finished,
        "pending": pending
    }

