from sqlalchemy.orm import Session
from app.services.user_service import get_by_email, create_user

def seed_admin(db: Session):
    admin_email = "admin@eubarbeiro.dev"
    admin_pwd = "admin123"
    if not get_by_email(db, admin_email):
        create_user(db, email=admin_email, password=admin_pwd, full_name="Admin", is_superuser=True)
        return True
    return False
