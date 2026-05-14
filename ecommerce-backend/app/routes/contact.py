from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactMessageCreate, ContactMessageResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def create_contact_message(
    message_data: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """Submit a contact form message"""
    contact_message = ContactMessage(
        name=message_data.name,
        email=message_data.email,
        subject=message_data.subject,
        message=message_data.message,
        status="new"
    )

    db.add(contact_message)
    db.commit()
    db.refresh(contact_message)

    return contact_message

@router.get("/", response_model=List[ContactMessageResponse])
def get_all_contact_messages(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all contact messages (admin endpoint)"""
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()
    return messages

@router.get("/{message_id}", response_model=ContactMessageResponse)
def get_contact_message(
    message_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific contact message"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.patch("/{message_id}/status")
def update_message_status(
    message_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    """Update message status (admin endpoint)"""
    if status not in ["new", "read", "replied"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.status = status
    db.commit()

    return {"message": "Status updated successfully"}
