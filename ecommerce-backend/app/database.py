from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Configure engine for serverless environment
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using
    pool_size=1,  # Minimal pool for serverless
    max_overflow=0,  # No overflow connections
    pool_recycle=300,  # Recycle connections after 5 minutes
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Track if tables have been created
_tables_created = False

def init_tables():
    """Initialize database tables if not already created"""
    global _tables_created
    if not _tables_created:
        try:
            # Import all models to ensure they're registered with Base
            from app.models import Product, Review, User, Order, OrderItem, ContactMessage, NewsletterSubscriber, QuoteRequest
            Base.metadata.create_all(bind=engine)
            _tables_created = True
        except Exception as e:
            print(f"Error creating tables: {e}")
            raise

def get_db():
    """Database dependency for FastAPI routes"""
    # Ensure tables exist before yielding session
    init_tables()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
