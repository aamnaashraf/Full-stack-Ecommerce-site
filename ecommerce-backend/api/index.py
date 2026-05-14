from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os

# Create app
app = FastAPI(title="E-Commerce API", version="1.0.0")

# Add CORS
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "E-Commerce API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "Backend is live on Vercel!"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "environment": "production"}

@app.get("/api/products")
def get_products():
    """Temporary endpoint - returns mock data until database is configured"""
    return [
        {
            "_id": "1",
            "name": "Sample Product 1",
            "price": 29.99,
            "image": "/images/Image/tech/1.png",
            "category": "Electronics",
            "description": "Sample product description",
            "stock": 10
        },
        {
            "_id": "2",
            "name": "Sample Product 2",
            "price": 49.99,
            "image": "/images/Image/tech/2.jpg",
            "category": "Electronics",
            "description": "Sample product description",
            "stock": 15
        }
    ]

# Mangum handler
handler = Mangum(app, lifespan="off")
