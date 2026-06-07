# Project Context

Last updated: 2026-06-06

## What This Is

VectorShift frontend technical assessment project.

The assignment has four requested parts:

1. Create a reusable node abstraction and demonstrate it with five new node types.
2. Apply a polished, unified frontend design.
3. Improve the Text node so it auto-resizes and creates left-side variable handles for `{{ variableName }}` placeholders.
4. Integrate frontend submit with the FastAPI backend, returning `{num_nodes, num_edges, is_dag}` and showing the result to the user.

## Repo Shape

- `frontend/`: Create React App frontend using React 18, React Flow 11, and Zustand.
- `backend/`: FastAPI backend stub.
- `VectorShift - Frontend Technical Assessment Instructions.pdf`: Original assignment instructions.
- `frontend.zip`, `backend.zip`: Original packaged source archives.

There is no usable git repo at the workspace root. `frontend/` contains a `.git`, but it currently has no valid `HEAD` commit.

## Frontend Architecture

Important files:

- `frontend/src/App.js`: Renders toolbar, canvas, and submit button.
- `frontend/src/toolbar.js`: Shows draggable node types.
- `frontend/src/draggableNode.js`: Defines draggable palette item behavior.
- `frontend/src/ui.js`: React Flow canvas, node registration, drag/drop creation.
- `frontend/src/store.js`: Zustand store for `nodes`, `edges`, node IDs, React Flow change handlers, and edge creation.
- `frontend/src/submit.js`: Submit button placeholder.
- `frontend/src/nodes/*.js`: Existing node implementations.

Current node types:

- `customInput`: configurable input name/type, source handle on right.
- `llm`: two target handles on left, source handle on right.
- `customOutput`: target handle on left, configurable output name/type.
- `text`: text input and source handle on right.

Current frontend issues and opportunities:

- Node components duplicate layout, title, fields, and handle patterns.
- Node field changes are local React state only; they do not update Zustand node data.
- `store.js` uses `nodeIDs` but does not initialize it in state.
- `ui.js` has `width: '100wv'`, likely intended to be `100vw` or `100%`.
- `reactFlowInstance.project(...)` is the current coordinate conversion API used here.
- Styling is mostly inline starter styling.
- Submit button is not wired to store state or backend.

## Backend Architecture

Important files:

- `backend/main.py`: FastAPI app.
- `backend/package-lock.json`: Empty npm lockfile, likely irrelevant for Python backend.

Current backend endpoints:

- `GET /`: returns `{"Ping": "Pong"}`.
- `GET /pipelines/parse`: placeholder expecting `pipeline` via `Form(...)`, returns `{"status": "parsed"}`.

Expected backend endpoint for assessment:

- Parse submitted pipeline nodes and edges.
- Return:

```json
{
  "num_nodes": 0,
  "num_edges": 0,
  "is_dag": true
}
```

Likely best endpoint shape: `POST /pipelines/parse` with JSON body containing `nodes` and `edges`.

## Run Commands

Frontend:

```bash
cd frontend
npm start
```

Build frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
uvicorn main:app --reload
```

The frontend will likely call the backend at `http://localhost:8000/pipelines/parse`.

## Implementation Direction

Recommended frontend approach:

- Introduce a reusable base node component that accepts:
  - title
  - icon/label metadata
  - fields
  - handles
  - custom body content when needed
  - dynamic size hints
- Refactor existing four nodes to use the abstraction.
- Add five new node definitions through configuration rather than copy-pasted components.
- Add shared CSS classes in `frontend/src/index.css`.
- Keep React Flow node types registered in `ui.js`.
- Update toolbar node list from a single metadata list if possible.
- Persist node field edits through `useStore().updateNodeField`.

Recommended Text node approach:

- Use a textarea instead of a single-line input.
- Auto-size based on content with sensible min/max dimensions.
- Extract variables with a regex such as `/{{\s*([A-Za-z_$][\w$]*)\s*}}/g`.
- Deduplicate variables.
- Render one target handle per variable on the left side, vertically distributed.
- Keep the source handle on the right.

Recommended backend approach:

- Accept JSON with `nodes` and `edges`.
- Count lengths directly.
- Build adjacency from edge `source` to `target`.
- Use DFS/Kahn topological sorting to detect cycles.
- Add CORS middleware for the CRA dev server.

## Verification Notes

After changes, verify at minimum:

- `npm run build` from `frontend/`.
- A backend smoke test against `/pipelines/parse`, either by FastAPI TestClient or by running uvicorn and using `curl`.
- Manual interaction if practical: drag nodes, connect them, edit Text variables, submit, and confirm alert values.

