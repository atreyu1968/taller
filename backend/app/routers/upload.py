# backend/app/routers/upload.py
import os
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from ..models import Document, Vehicle
from ..database import get_db
from ..routers.auth import get_current_user

router = APIRouter(
    prefix="/upload",
    tags=["upload"]
)

UPLOAD_DIR = "storage/uploads/"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}

# Verificar extensión del archivo
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Cargar un archivo para un vehículo
@router.post("/{vehicle_id}")
async def upload_file(vehicle_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    if current_user.role != "admin" and vehicle.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Verificar tamaño del archivo
    file_size = len(await file.read())
    await file.seek(0)  # Resetear la posición del archivo después de leerlo
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File is too large. Max size is 5MB.")
    
    # Verificar tipo de archivo
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="File type not allowed. Only PNG, JPG, JPEG, and PDF are permitted.")

    # Guardar archivo
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    document = Document(file_name=file.filename, file_path=file_path, vehicle_id=vehicle.id)
    db.add(document)
    db.commit()
    db.refresh(document)

    return {"file_name": document.file_name, "file_path": document.file_path}

