from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Rating must be between 1 and 5")
    comment: str = Field(..., min_length=1, max_length=1000, description="Review comment")

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = Field(None, min_length=1, max_length=1000)

class ReviewResponse(ReviewBase):
    id: int
    product_id: int
    user_id: int
    user_name: str
    product_name: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ReviewWithUser(ReviewResponse):
    """Review response with user details"""
    pass
