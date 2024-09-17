# backend/app/app.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from .routers import vehicles, users, auth, upload

app = FastAPI()

# Incluir las rutas
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(vehicles.router)
app.include_router(upload.router)

# Servir archivos estáticos desde la carpeta 'storage/uploads'
app.mount("/uploads", StaticFiles(directory="storage/uploads"), name="uploads")

@app.get("/")
def read_root():
    return {"message": "Bienvenido al sistema de gestión del taller"}

