from collections import deque


def parse_pipeline_payload(payload):
    nodes = payload.get("nodes", [])
    edges = payload.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_directed_acyclic_graph(nodes, edges),
    }


def is_directed_acyclic_graph(nodes, edges):
    node_ids = {node.get("id") for node in nodes if node.get("id")}
    adjacency = {node_id: [] for node_id in node_ids}
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")

        if source not in node_ids or target not in node_ids:
            continue

        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited_count = 0

    while queue:
        node_id = queue.popleft()
        visited_count += 1

        for neighbor in adjacency[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)
