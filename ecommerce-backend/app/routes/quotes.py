from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteRequestCreate, QuoteRequestResponse
from app.models.user import User
from app.core.security import get_current_admin

router = APIRouter(prefix="/api/quotes", tags=["Quote Requests"])

@router.post("/", response_model=QuoteRequestResponse, status_code=status.HTTP_201_CREATED)
def create_quote_request(
    data: QuoteRequestCreate,
    db: Session = Depends(get_db)
):
    """Submit a quote request to suppliers"""

    # Create new quote request
    new_quote = QuoteRequest(
        item=data.item,
        details=data.details,
        quantity=data.quantity,
        unit=data.unit,
        name=data.name,
        email=data.email,
        phone=data.phone,
        status="pending"
    )

    db.add(new_quote)
    db.commit()
    db.refresh(new_quote)

    return new_quote

@router.get("/", response_model=List[QuoteRequestResponse])
def get_all_quotes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Get all quote requests (Admin only)"""
    quotes = db.query(QuoteRequest).order_by(QuoteRequest.created_at.desc()).all()
    return quotes

@router.get("/{quote_id}", response_model=QuoteRequestResponse)
def get_quote(
    quote_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Get a specific quote request (Admin only)"""
    quote = db.query(QuoteRequest).filter(QuoteRequest.id == quote_id).first()

    if not quote:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found"
        )

    return quote
