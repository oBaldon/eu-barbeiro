from app.db.session import SessionLocal
from app.services.seed import seed_admin

def main():
    db = SessionLocal()
    try:
        created = seed_admin(db)
        print("Admin criado" if created else "Admin já existe")
    finally:
        db.close()

if __name__ == "__main__":
    main()
