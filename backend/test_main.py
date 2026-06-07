import unittest


from pipeline import is_directed_acyclic_graph, parse_pipeline_payload


class PipelineParsingTest(unittest.TestCase):
    def test_parse_pipeline_payload_counts_nodes_edges_and_detects_dag(self):
        payload = {
            "nodes": [{"id": "input-1"}, {"id": "text-1"}, {"id": "output-1"}],
            "edges": [
                {"source": "input-1", "target": "text-1"},
                {"source": "text-1", "target": "output-1"},
            ],
        }

        self.assertEqual(
            parse_pipeline_payload(payload),
            {
                "num_nodes": 3,
                "num_edges": 2,
                "is_dag": True,
            },
        )

    def test_is_directed_acyclic_graph_detects_cycle(self):
        nodes = [{"id": "a"}, {"id": "b"}, {"id": "c"}]
        edges = [
            {"source": "a", "target": "b"},
            {"source": "b", "target": "c"},
            {"source": "c", "target": "a"},
        ]

        self.assertFalse(is_directed_acyclic_graph(nodes, edges))


if __name__ == "__main__":
    unittest.main()
