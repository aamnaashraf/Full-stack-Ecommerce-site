from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class ContactMessageBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=255)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageResponse(ContactMessageBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
