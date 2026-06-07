# Project Roadmap

This is the working sequence for completing the VectorShift assessment.

## Phase 1: Stabilize The Baseline

- Confirm frontend builds before major edits.
- Confirm backend imports/runs.
- Fix obvious starter issues that block later work:
  - initialize `nodeIDs` in the store
  - correct canvas sizing typo
  - make node field updates persist in store

## Phase 2: Node Abstraction

- Build a reusable node shell/component.
- Represent common node pieces as config:
  - title
  - handles
  - input/select/textarea fields
  - static content
  - custom dynamic body when needed
- Refactor existing Input, LLM, Output, and Text nodes through the abstraction.
- Add five new nodes from configuration.

Candidate new nodes:

- Transform
- Filter
- API Request
- Database
- Condition

## Phase 3: Unified Styling

- Replace starter inline styling with shared CSS.
- Give the app a real workbench feel:
  - top toolbar
  - canvas area
  - consistent node cards
  - clear handles and controls
  - polished submit area
- Keep the UI practical and dense enough for a node editor.

## Phase 4: Text Node Logic

- Replace the Text node input with an auto-sizing textarea.
- Parse `{{ variableName }}` placeholders.
- Add one left target handle per valid variable.
- Deduplicate handles and keep names stable.
- Ensure resizing does not break React Flow layout.

## Phase 5: Backend Integration

- Add CORS middleware.
- Change parse endpoint to accept JSON pipeline data.
- Count nodes and edges.
- Detect whether edges form a DAG.
- Wire frontend Submit button to post Zustand `nodes` and `edges`.
- Show a user-friendly alert with parse results.

## Phase 6: Verification

- Run `npm run build` in `frontend/`.
- Smoke-test backend parse logic.
- If practical, run frontend and backend together:
  - drag nodes
  - connect edges
  - add Text variables
  - submit and inspect alert

