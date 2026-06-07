// submit.js

import { useState } from 'react';
import { useStore } from './store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('The backend could not parse this pipeline.');
            }

            setResult(await response.json());
        } catch (submitError) {
            setError(submitError.message || 'Unable to submit the pipeline.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-panel">
            <button className="primary-button" type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Analyzing...' : 'Analyze Pipeline'}
            </button>

            {(result || error) && (
                <div className="result-dialog-backdrop" role="presentation">
                    <section className="result-dialog" role="dialog" aria-modal="true" aria-label="Pipeline analysis result">
                        <div className="result-dialog-header">
                            <span>Pipeline Analysis</span>
                            <button type="button" aria-label="Close result dialog" onClick={() => { setResult(null); setError(''); }}>
                                x
                            </button>
                        </div>

                        {error ? (
                            <p className="result-error">{error}</p>
                        ) : (
                            <div className="result-grid">
                                <div>
                                    <span>Nodes</span>
                                    <strong>{result.num_nodes}</strong>
                                </div>
                                <div>
                                    <span>Edges</span>
                                    <strong>{result.num_edges}</strong>
                                </div>
                                <div>
                                    <span>DAG</span>
                                    <strong>{result.is_dag ? 'Yes' : 'No'}</strong>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};
