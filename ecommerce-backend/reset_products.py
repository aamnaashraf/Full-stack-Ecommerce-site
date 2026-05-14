from app.database import SessionLocal
from app.models.product import Product

def reset_products():
    """Clear all products and reseed"""
    db = SessionLocal()

    # Delete all existing products
    deleted_count = db.query(Product).delete()
    db.commit()
    print(f"Deleted {deleted_count} existing products")

    db.close()

    # Now run seed_data
    from seed_data import seed_products
    seed_products()

if __name__ == "__main__":
    reset_products()
