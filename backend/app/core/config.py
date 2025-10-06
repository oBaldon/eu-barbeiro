from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    api_prefix: str = "/api/v1"
    jwt_secret: str = "supersecretkey"
    jwt_expire_minutes: int = 60 * 24 * 30  # 30 dias
    database_url: str = "postgresql+psycopg2://barber:barber123@db:5432/eu_barbeiro"
    environment: str = "development"
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:19006", "http://localhost:8081"]

    class Config:
        env_file = ".env"
        env_prefix = ""
        case_sensitive = False

settings = Settings()
