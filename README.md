# Hajj and Umrah starter

FastAPI, React, and PostgreSQL. The page calls `GET /api/health`, and the API checks PostgreSQL with `SELECT 1`.

## Start

1. Start PostgreSQL:

```bash
docker compose up -d
```

2. Start the API (from `backend`):

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

3. Start the frontend (from `frontend`):

```bash
npm install
npm run dev
```

Open http://localhost:5173. The page shows whether the API and database are reachable.

Local database defaults: database `hajj`, user `hajj`, password `hajj`, host `localhost`, port `5432`.
