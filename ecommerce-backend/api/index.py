from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os
import sys

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

@app.get("/")
def root():
    return {
        "message": "E-Commerce API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "environment": "production"}

# Try to import and include routes with error handling
routes_loaded = []
routes_failed = []

try:
    from app.routes import products_router
    app.include_router(products_router)
    routes_loaded.append("products")
except Exception as e:
    routes_failed.append(f"products: {str(e)}")
    print(f"Failed to load products router: {e}", file=sys.stderr)

try:
    from app.routes.auth import router as auth_router
    app.include_router(auth_router)
    routes_loaded.append("auth")
except Exception as e:
    routes_failed.append(f"auth: {str(e)}")
    print(f"Failed to load auth router: {e}", file=sys.stderr)

try:
    from app.routes.users import router as users_router
    app.include_router(users_router)
    routes_loaded.append("users")
except Exception as e:
    routes_failed.append(f"users: {str(e)}")
    print(f"Failed to load users router: {e}", file=sys.stderr)

try:
    from app.routes.reviews import router as reviews_router
    app.include_router(reviews_router)
    routes_loaded.append("reviews")
except Exception as e:
    routes_failed.append(f"reviews: {str(e)}")
    print(f"Failed to load reviews router: {e}", file=sys.stderr)

try:
    from app.routes.contact import router as contact_router
    app.include_router(contact_router)
    routes_loaded.append("contact")
except Exception as e:
    routes_failed.append(f"contact: {str(e)}")
    print(f"Failed to load contact router: {e}", file=sys.stderr)

try:
    from app.routes.orders import router as orders_router
    app.include_router(orders_router)
    routes_loaded.append("orders")
except Exception as e:
    routes_failed.append(f"orders: {str(e)}")
    print(f"Failed to load orders router: {e}", file=sys.stderr)

try:
    from app.routes.newsletter import router as newsletter_router
    app.include_router(newsletter_router)
    routes_loaded.append("newsletter")
except Exception as e:
    routes_failed.append(f"newsletter: {str(e)}")
    print(f"Failed to load newsletter router: {e}", file=sys.stderr)

try:
    from app.routes.quotes import router as quotes_router
    app.include_router(quotes_router)
    routes_loaded.append("quotes")
except Exception as e:
    routes_failed.append(f"quotes: {str(e)}")
    print(f"Failed to load quotes router: {e}", file=sys.stderr)

@app.get("/debug/routes")
def debug_routes():
    return {
        "loaded": routes_loaded,
        "failed": routes_failed,
        "total_loaded": len(routes_loaded),
        "total_failed": len(routes_failed)
    }

# Mangum handler for Vercel
handler = Mangum(app, lifespan="off")
