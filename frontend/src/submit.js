// submit.js

import { useState } from 'react';
import { useStore } from './store';

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
            const response = await fetch('http://localhost:8000/pipelines/parse', {
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
                            <div className="result-content">
                                <div className="result-grid">
                                    <div>
                                    <span>Nodes</span>
                                    <strong>{result.num_nodes}</strong>
                                    </div>
                                    <div>
                                    <span>Edges</span>
                                    <strong>{result.num_edges}</strong>
                                    </div>
                                </div>
                                <div className={`dag-status ${result.is_dag ? 'is-valid' : 'is-invalid'}`}>
                                    <span>DAG Status</span>
                                    <strong>{result.is_dag ? 'Valid' : 'Invalid'}</strong>
                                    <p>
                                        {result.is_dag
                                            ? 'This pipeline can be evaluated without cycles.'
                                            : 'This pipeline contains a cycle and needs a routing adjustment.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};
