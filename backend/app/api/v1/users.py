from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_superuser, get_current_active_user
from app.schemas.user import UserOut, UserCreate
from app.services.user_service import get_by_email, create_user
from app.models.user import User

router = APIRouter()

@router.get("/me", response_model=UserOut)
def read_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.post("/", response_model=UserOut, dependencies=[Depends(get_current_superuser)])
def create(user_in: UserCreate, db: Session = Depends(get_db)):
    if get_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, email=user_in.email, password=user_in.password, full_name=user_in.fullName)
    return user

@router.get("/", response_model=List[UserOut], dependencies=[Depends(get_current_superuser)])
def list_users(db: Session = Depends(get_db), q: str | None = Query(None)):
    query = db.query(User)
    if q:
        query = query.filter(User.email.ilike(f"%{q}%"))
    return query.order_by(User.id.desc()).limit(100).all()