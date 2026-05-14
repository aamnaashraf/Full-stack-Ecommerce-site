from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from sqlalchemy import text
import os

# Create a simple app first to test
app = FastAPI(title="E-Commerce API")

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
        "status": "working"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/test-db")
def test_db():
    try:
        from app.database import engine
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            return {"database": "connected", "test": "passed"}
    except Exception as e:
        return {"database": "error", "message": str(e)}

# Now try to import and include all routes
try:
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
except Exception as e:
    print(f"Warning: Could not load all routes: {e}")

# Mangum handler
handler = Mangum(app, lifespan="off")
