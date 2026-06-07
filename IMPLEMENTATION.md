# VectorShift Technical Assessment Implementation

## Overview

This implementation completes the VectorShift frontend assessment with a reusable node architecture, a cohesive dark workflow-builder interface, dynamic Text node behavior, and a FastAPI backend integration that analyzes submitted pipelines.

The frontend remains a Create React App project using React Flow for canvas interactions and Zustand for graph state. The backend remains a small FastAPI app, with pipeline analysis extracted into a pure Python module for testability.

## Architecture Decisions

- Kept React Flow as the graph interaction layer and Zustand as the single source of truth for nodes and edges.
- Introduced a reusable `BaseNode` component so each node describes what it needs rather than reimplementing layout, handles, labels, and fields.
- Centralized node metadata in `frontend/src/nodes/nodeConfigs.js` so the toolbar, defaults, and configured nodes can evolve together.
- Split backend graph analysis into `backend/pipeline.py` so DAG validation can be tested without needing a running FastAPI server.
- Used a custom modal-style result dialog instead of browser alerts for a cleaner product experience.

## Why I Chose This Architecture

The original node files repeated the same structural ideas: a card, a title, fields, and React Flow handles. That makes the first few nodes easy to write but makes every future node more expensive to maintain. A `BaseNode` plus configuration keeps the common rendering behavior in one place while preserving flexibility for specialized nodes like Text.

The node configuration file also gives the product a natural extension point. Adding a lightweight node now means defining its title, fields, handles, and defaults, then registering the React component. This keeps the implementation readable for a small assessment while still pointing toward a scalable workflow-builder architecture.

For the backend, Kahn's algorithm is simple, deterministic, and appropriate for validating whether a directed graph is acyclic. Separating that logic from FastAPI makes it easy to test and prevents route code from carrying algorithmic complexity.

## BaseNode Abstraction Design

`frontend/src/nodes/BaseNode.js` supports:

- configurable title and eyebrow metadata
- optional description/body content
- configurable fields: text inputs, selects, and textareas
- configurable React Flow handles
- custom class names and inline size styles
- Zustand-backed field updates through `updateNodeField`

Existing nodes now use this abstraction:

- `InputNode`
- `LLMNode`
- `OutputNode`
- `TextNode`

The Text node remains specialized because it needs dynamic sizing and variable handles, but it still delegates card structure, field rendering, and handle rendering to `BaseNode`.

## New Nodes Added

Five lightweight nodes were added to demonstrate extensibility:

- API Node: method and endpoint fields, request input, response output
- Database Node: operation and table fields, query input, rows output
- Prompt Node: tone and prompt fields, context input, prompt output
- Condition Node: expression field, input handle, true/false output handles
- Webhook Node: event and secret fields, payload input, delivery output

These nodes are defined through shared metadata in `nodeConfigs.js` and instantiated with `createConfiguredNode`.

## Styling Improvements

The app now uses a cohesive dark theme with:

- sidebar-style node palette
- polished node cards
- consistent typography, spacing, and borders
- improved React Flow handles
- styled React Flow controls and minimap
- focused form controls inside nodes
- clean submit panel and result dialog

The visual direction is intentionally restrained: dark panels, subtle borders, clear hierarchy, and minimal decorative effects.

## UI/UX Enhancements

This focused enhancement pass refined the interface toward a production AI workflow-builder experience inspired by VectorShift, n8n, Langflow, Linear, Vercel, and Notion AI. The goal was not to redesign the application or change its architecture, but to make the existing React Flow experience feel more deliberate, usable, and review-ready.

The node library sidebar now presents nodes as interactive palette cards instead of simple labels. Each card includes a compact icon treatment, a clear node name, and a short subtitle that explains the node's role before it is dragged onto the canvas. This makes the palette easier to scan and gives every node type a consistent visual language without adding a complex categorization system.

The canvas now includes an empty state when no nodes are present. The message, "Build AI Workflows" with "Drag nodes from the sidebar to begin," gives first-time users immediate orientation while keeping the workspace clean. I chose a small dashed container and simple AI mark rather than an illustration because workflow builders should prioritize the canvas and avoid feeling like a marketing page.

Node cards were refined through the existing `BaseNode` abstraction. Headers now support an icon plus title area, body content remains node-specific, and footers can show lightweight connection metadata such as "2 inputs / 1 output." This reinforces the workflow-component mental model while keeping the abstraction reusable. Handles were made larger and accented with a modern purple treatment so connection points are easier to discover on the dark canvas.

The minimap was adjusted to blend into the dark theme with subtle borders, rounded corners, and node colors aligned to the purple accent. This keeps it useful as a navigation aid without feeling visually detached from the rest of the product.

The pipeline analysis dialog was also refined. Instead of a flat alert-style result, it now separates node and edge counts from DAG status and uses "Valid" or "Invalid" language. This reads more like a production validation feature and gives users a short explanation of what the status means.

The main tradeoff was staying intentionally restrained. I avoided glassmorphism, heavy gradients, new animation systems, and additional UI packages. The result is less flashy, but it is easier to maintain, fits the technical assessment scope, and keeps attention on building and validating workflows.

## Text Node Implementation Details

The Text node now:

- uses a textarea for multiline input
- grows width based on the longest line
- grows height based on line count
- keeps sensible min/max dimensions so the canvas remains usable
- displays detected variables as compact tokens
- creates dynamic left-side input handles for each unique variable
- removes handles automatically when variables disappear

The node's text value is stored in Zustand, so edits are part of the graph data submitted to the backend.

## Variable Parsing Approach

Variable parsing lives in `frontend/src/nodes/textVariables.js`.

The regex is:

```js
/{{\s*([A-Za-z_$][\w$]*)\s*}}/g
```

This matches JavaScript-style identifiers inside double curly braces. It supports names like:

- `{{input}}`
- `{{userName}}`
- `{{query}}`
- `{{_internal}}`
- `{{$value}}`

Invalid names such as `{{1input}}` or `{{has-dash}}` are ignored. A `Set` is used to preserve first-seen order while avoiding duplicate handles.

## Backend Integration Approach

`frontend/src/submit.js` reads current `nodes` and `edges` from Zustand and sends them to:

```http
POST /pipelines/parse
```

The request body is:

```json
{
  "nodes": [],
  "edges": []
}
```

The backend response is:

```json
{
  "num_nodes": 0,
  "num_edges": 0,
  "is_dag": true
}
```

The frontend displays this response in a styled dialog with separate values for node count, edge count, and DAG status.

## DAG Detection Algorithm Explanation

The backend uses Kahn's topological sorting algorithm:

1. Collect all node IDs.
2. Build an adjacency list from edge sources to targets.
3. Count incoming edges for each node.
4. Add every zero-indegree node to a queue.
5. Repeatedly remove a zero-indegree node and decrement its neighbors.
6. If the number of visited nodes equals the number of known nodes, the graph is a DAG.
7. If some nodes cannot be visited, a cycle exists.

Edges that reference missing nodes are ignored for DAG validation because they do not form valid graph relationships among submitted nodes.

## Tradeoffs Made

- I kept the node abstraction lightweight instead of introducing a larger schema/rendering framework.
- I avoided adding new frontend packages so the project remains easy to run from the existing lockfile.
- Text node sizing uses deterministic character and line heuristics rather than DOM measurement, which keeps the implementation simple and stable.
- The result dialog is custom CSS rather than a modal library, again to avoid unnecessary dependency weight.
- Backend payload typing uses a dictionary body for simplicity; a Pydantic model would be a good next step for a larger system.

## Future Improvements

- Node deletion actions
- Multi-select node operations
- Undo/redo support
- Node grouping
- Keyboard shortcuts
- Pipeline validation before submission
- Add richer frontend tests for node rendering and submit behavior.
- Add Pydantic request/response models for the FastAPI endpoint.
- Add a `.env`-driven backend URL for the frontend.
- Add node categories and search for a larger palette.
- Persist pipelines locally or through an API.
- Add validation for disconnected handles and invalid graph references.
- Add keyboard shortcuts for common React Flow actions.

## Verification

Completed checks:

- `npm test -- --runInBand --watchAll=false textVariables.test.js`
- `npm run build`
- `python3 -m unittest test_main.py`
- `PYTHONPATH=/tmp/vshift-fastapi-deps python3 -c "from main import app; print(app.title)"`

The sandbox environment could not bind uvicorn to localhost ports during verification, but the FastAPI app imports successfully and the pure backend analysis logic is tested.
