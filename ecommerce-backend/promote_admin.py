"""
Script to promote a user to admin role
"""
import sys
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User, UserRole

def promote_to_admin(email: str):
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print(f"User with email {email} not found")
            return False

        user.role = UserRole.ADMIN
        db.commit()
        print(f"User {email} promoted to admin successfully")
        return True
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python promote_admin.py <email>")
        sys.exit(1)

    email = sys.argv[1]
    promote_to_admin(email)
