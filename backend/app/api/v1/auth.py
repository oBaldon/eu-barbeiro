from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.schemas.auth import LoginIn, TokenOut
from app.services.user_service import authenticate
from app.core.security import create_access_token
router = APIRouter()
@router.post("/login", response_model=TokenOut, response_model_by_alias=True)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = authenticate(db, email=payload.email, password=payload.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token(subject=user.email, extra={"is_superuser": user.is_superuser})
    return {"access_token": token, "token_type": "bearer"}
