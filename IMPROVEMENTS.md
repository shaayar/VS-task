# Suggested Improvements

1. Result display consistency
   - The frontend currently shows both a native `alert()` and an in-app result dialog for backend responses.
   - Better: choose one consistent UI path and remove the duplicate display logic.

2. Backend request validation
   - `backend/main.py` currently accepts `payload: dict` without an explicit schema.
   - Add a Pydantic model for `{ nodes: list, edges: list }` so invalid payloads return clean validation errors.

3. Error handling UX
   - If the backend fails, the frontend sets an error state and shows a dialog.
   - Consider also notifying the user with an alert or consolidating all feedback into the same error UI.

4. API base URL fallback
   - `frontend/src/submit.js` uses `process.env.REACT_APP_API_BASE_URL || ''`.
   - For local development, a default like `http://localhost:8000` is safer than an empty string.

5. Test coverage
   - Add backend unit tests for `parse_pipeline_payload` and `is_directed_acyclic_graph`.
   - This will help ensure DAG detection and count behavior remain stable.

6. Minor code polish
   - `frontend/src/nodes/BaseNode.js` can be refactored to separate default values from actual node data more explicitly.
   - `backend/pipeline.py` could handle edges referencing missing nodes more clearly, either by ignoring them deliberately or returning a warning.

7. Connection editing behavior
   - Once two nodes are connected on the canvas, the current UI does not allow editing that connection.
   - Add support for selecting and modifying/removing existing edges so the user can adjust pipeline wiring after the initial connection.
