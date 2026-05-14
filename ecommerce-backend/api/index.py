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

@app.get("/health")
def health():
    return {"status": "healthy", "environment": "production"}

# Mangum handler for Vercel
handler = Mangum(app, lifespan="off")
