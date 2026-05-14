from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os

# Create app
app = FastAPI(title="E-Commerce API", version="1.0.0")

# Add CORS - allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
from app.routes import products_router
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.reviews import router as reviews_router
from app.routes.contact import router as contact_router
from app.routes.orders import router as orders_router
from app.routes.newsletter import router as newsletter_router
from app.routes.quotes import router as quotes_router

app.include_router(products_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(reviews_router)
app.include_router(contact_router)
app.include_router(orders_router)
app.include_router(newsletter_router)
app.include_router(quotes_router)

@app.get("/")
def root():
    return {
        "message": "E-Commerce API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "All routes loaded successfully!"
    }

@app.get("/debug/init-tables")
def debug_init_tables():
    """Debug endpoint to manually initialize tables"""
    try:
        from app.database import engine, Base
        from app.models import Product, Review, User, Order, OrderItem, ContactMessage, NewsletterSubscriber, QuoteRequest
        Base.metadata.create_all(bind=engine)
        return {"status": "success", "message": "Tables created successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e), "type": type(e).__name__}

@app.post("/debug/signup")
def debug_signup(user_data: dict):
    """Debug signup endpoint that returns full error details"""
    try:
        from app.database import get_db
        from app.models.user import User
        from app.schemas.user import UserSignup, TokenResponse, UserResponse
        from app.core.security import get_password_hash, create_access_token
        from sqlalchemy.orm import Session

        # Validate input
        validated_data = UserSignup(**user_data)

        # Get database session
        db = next(get_db())

        try:
            # Check if user exists
            existing_user = db.query(User).filter(User.email == validated_data.email).first()
            if existing_user:
                return {"status": "error", "message": "Email already registered"}

            # Create new user
            hashed_password = get_password_hash(validated_data.password)
            new_user = User(
                email=validated_data.email,
                password_hash=hashed_password,
                full_name=validated_data.full_name,
                role="user"
            )

            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            # Create access token
            access_token = create_access_token(data={"sub": str(new_user.id)})

            return {
                "status": "success",
                "access_token": access_token,
                "user": {
                    "id": new_user.id,
                    "email": new_user.email,
                    "full_name": new_user.full_name,
                    "role": new_user.role
                }
            }
        finally:
            db.close()

    except Exception as e:
        import traceback
        return {
            "status": "error",
            "message": str(e),
            "type": type(e).__name__,
            "traceback": traceback.format_exc()
        }

@app.get("/health")
def health():
    return {"status": "healthy", "environment": "production"}

# Mangum handler for Vercel
handler = Mangum(app, lifespan="off")
