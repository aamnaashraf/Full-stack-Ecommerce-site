from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import products_router
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.reviews import router as reviews_router
from app.routes.contact import router as contact_router
from app.routes.orders import router as orders_router
from app.routes.newsletter import router as newsletter_router
from app.routes.quotes import router as quotes_router

app = FastAPI(
    title="E-Commerce API",
    description="Backend API for E-Commerce Website",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

