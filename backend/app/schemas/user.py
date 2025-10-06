from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    fullName: str | None = Field(None, alias="full_name")

    class Config:
        populate_by_name = True
        from_attributes = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    fullName: str | None = Field(None, alias="full_name")
    isActive: bool | None = Field(None, alias="is_active")

class UserOut(UserBase):
    id: int
    isActive: bool = Field(..., alias="is_active")
    isSuperuser: bool = Field(..., alias="is_superuser")

class TokenOut(BaseModel):
    accessToken: str = Field(..., alias="access_token")
    tokenType: str = Field("bearer", alias="token_type")
