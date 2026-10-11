from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://hajj:hajj@localhost:5432/hajj"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
