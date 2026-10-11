import json
import re

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.database import engine

router = APIRouter(prefix="/api/progress")

_schema_ready = False
_key_pattern = re.compile(r"^[a-z0-9-]{1,40}$")


class ProgressCreate(BaseModel):
    journey: str = "umrah"


class ProgressUpdate(BaseModel):
    completed_keys: list[str] = Field(default_factory=list)


def ensure_schema() -> None:
    global _schema_ready
    if _schema_ready:
        return
    with engine.begin() as connection:
        connection.execute(
            text(
                """
                CREATE TABLE IF NOT EXISTS umrah_progress (
                    id SERIAL PRIMARY KEY,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    completed_keys JSONB NOT NULL DEFAULT '[]'::jsonb
                )
                """
            )
        )
        connection.execute(
            text(
                """
                ALTER TABLE umrah_progress
                ADD COLUMN IF NOT EXISTS journey TEXT NOT NULL DEFAULT 'umrah'
                """
            )
        )
    _schema_ready = True


def _keys(value) -> list[str]:
    if value is None:
        return []
    if isinstance(value, str):
        value = json.loads(value)
    return [key for key in value if isinstance(key, str)]


def _row(row) -> dict:
    data = row._mapping
    keys = _keys(data["completed_keys"])
    return {
        "id": data["id"],
        "journey": data["journey"],
        "created_at": data["created_at"].isoformat(),
        "updated_at": data["updated_at"].isoformat(),
        "completed_keys": keys,
        "completed_count": len(keys),
    }


def _journey(value: str) -> str:
    if value not in {"umrah", "hajj"}:
        raise HTTPException(status_code=400, detail="Unknown journey")
    return value


def _clean_keys(keys: list[str]) -> list[str]:
    cleaned = []
    for key in keys:
        if _key_pattern.fullmatch(key) and key not in cleaned:
            cleaned.append(key)
    if len(cleaned) > 80:
        raise HTTPException(status_code=400, detail="Too many items")
    return cleaned


def _db_error() -> HTTPException:
    return HTTPException(status_code=503, detail="Database is unavailable")


@router.get("")
def list_progress(journey: str = "umrah"):
    journey = _journey(journey)
    try:
        ensure_schema()
        with engine.connect() as connection:
            rows = connection.execute(
                text(
                    """
                    SELECT id, journey, created_at, updated_at, completed_keys
                    FROM umrah_progress
                    WHERE journey = :journey
                    ORDER BY updated_at DESC, id DESC
                    """
                ),
                {"journey": journey},
            )
            return [_row(row) for row in rows]
    except SQLAlchemyError as exc:
        raise _db_error() from exc


@router.post("")
def create_progress(body: ProgressCreate):
    journey = _journey(body.journey)
    try:
        ensure_schema()
        with engine.begin() as connection:
            row = connection.execute(
                text(
                    """
                    INSERT INTO umrah_progress (journey, completed_keys)
                    VALUES (:journey, CAST(:keys AS jsonb))
                    RETURNING id, journey, created_at, updated_at, completed_keys
                    """
                ),
                {"journey": journey, "keys": "[]"},
            ).one()
            return _row(row)
    except SQLAlchemyError as exc:
        raise _db_error() from exc


@router.get("/{progress_id}")
def get_progress(progress_id: int):
    try:
        ensure_schema()
        with engine.connect() as connection:
            row = connection.execute(
                text(
                    """
                    SELECT id, journey, created_at, updated_at, completed_keys
                    FROM umrah_progress
                    WHERE id = :id
                    """
                ),
                {"id": progress_id},
            ).one_or_none()
    except SQLAlchemyError as exc:
        raise _db_error() from exc
    if row is None:
        raise HTTPException(status_code=404, detail="Progress was not found")
    return _row(row)


@router.put("/{progress_id}")
def update_progress(progress_id: int, body: ProgressUpdate):
    keys = _clean_keys(body.completed_keys)
    try:
        ensure_schema()
        with engine.begin() as connection:
            row = connection.execute(
                text(
                    """
                    UPDATE umrah_progress
                    SET completed_keys = CAST(:keys AS jsonb), updated_at = NOW()
                    WHERE id = :id
                    RETURNING id, journey, created_at, updated_at, completed_keys
                    """
                ),
                {"id": progress_id, "keys": json.dumps(keys)},
            ).one_or_none()
    except SQLAlchemyError as exc:
        raise _db_error() from exc
    if row is None:
        raise HTTPException(status_code=404, detail="Progress was not found")
    return _row(row)


@router.delete("/{progress_id}")
def delete_progress(progress_id: int):
    try:
        ensure_schema()
        with engine.begin() as connection:
            result = connection.execute(
                text("DELETE FROM umrah_progress WHERE id = :id"),
                {"id": progress_id},
            )
    except SQLAlchemyError as exc:
        raise _db_error() from exc
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Progress was not found")
    return {"ok": True}
