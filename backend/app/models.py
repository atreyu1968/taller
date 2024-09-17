# backend/app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String)
    file_path = Column(String)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'))

    vehicle = relationship("Vehicle", back_populates="documents")

