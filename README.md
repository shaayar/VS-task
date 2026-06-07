# VectorShift Task

This repository contains a frontend and backend implementation for the VectorShift frontend technical assessment.

## Project Structure

- `frontend/` — Create React App frontend using React 18, React Flow 11, and Zustand.
- `backend/` — FastAPI backend stub for pipeline parsing and DAG validation.
- `PROJECT_CONTEXT.md` — Project context and assessment requirements.
- `IMPLEMENTATION.md` — Implementation notes and design decisions.

## What this project does

The frontend provides a drag-and-drop node editor with reusable node abstractions, a polished UI, and a submit workflow that sends the current pipeline graph to the backend.

The backend exposes a simple FastAPI endpoint for analyzing submitted pipeline data and returning:

- `num_nodes`
- `num_edges`
- `is_dag`

## Running the frontend

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## Running the backend

```bash
cd backend
pip install -r requirements.txt 2>/dev/null || true
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.

## Testing

- Frontend: run tests from `frontend/` as needed.
- Backend: `python -m unittest backend/test_main.py` or use FastAPI TestClient.

## Notes

The project includes a frontend node palette, node canvas, and submission flow wired to the backend endpoint `POST /pipelines/parse`.

See `PROJECT_CONTEXT.md` for more details on the assessment requirements and current architecture.