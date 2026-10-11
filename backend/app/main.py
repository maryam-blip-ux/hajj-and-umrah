from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_database
from app.progress import router as progress_router

app = FastAPI()
app.include_router(progress_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {
        "api": "ok",
        "database": "ok" if check_database() else "unavailable",
    }
