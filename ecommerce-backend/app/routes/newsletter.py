from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.newsletter import NewsletterSubscriber
from app.schemas.newsletter import NewsletterSubscribe, NewsletterResponse

router = APIRouter(prefix="/api/newsletter", tags=["Newsletter"])

@router.post("/subscribe", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED)
def subscribe_newsletter(
    data: NewsletterSubscribe,
    db: Session = Depends(get_db)
):
    """Subscribe to newsletter"""
    # Check if email already exists
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == data.email
    ).first()

    if existing:
        if existing.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This email is already subscribed to our newsletter"
            )
        else:
            # Reactivate subscription
            existing.is_active = True
            existing.unsubscribed_at = None
            db.commit()
            db.refresh(existing)
            return existing

    # Create new subscription
    new_subscriber = NewsletterSubscriber(
        email=data.email,
        is_active=True
    )

    db.add(new_subscriber)
    db.commit()
    db.refresh(new_subscriber)

    return new_subscriber

@router.post("/unsubscribe")
def unsubscribe_newsletter(
    data: NewsletterSubscribe,
    db: Session = Depends(get_db)
):
    """Unsubscribe from newsletter"""
    subscriber = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == data.email
    ).first()

    if not subscriber:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found in our newsletter list"
        )

    if not subscriber.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email is already unsubscribed"
        )

    subscriber.is_active = False
    from sqlalchemy.sql import func
    subscriber.unsubscribed_at = func.now()

    db.commit()

    return {"message": "Successfully unsubscribed from newsletter"}
