from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class QuoteRequestCreate(BaseModel):
    item: str
    details: Optional[str] = None
    quantity: float
    unit: str
    name: str
    email: EmailStr
    phone: Optional[str] = None

class QuoteRequestResponse(BaseModel):
    id: int
    item: str
    details: Optional[str]
    quantity: float
    unit: str
    name: str
    email: str
    phone: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
