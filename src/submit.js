import { useState } from 'react';
import { useStore } from './store';
import { submitPipeline } from './services/pipeline.api';

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const pipeline = {
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        data: n.data,
      })),
      edges: edges.map((e) => ({
        source: e.source,
        target: e.target,
      })),
    };

    try {
      setLoading(true);
      setResult(null);

      const data = await submitPipeline(pipeline);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Submit Button */}
      <button
        className="pipeline-submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading && <span className="pipeline-spinner" />}
        {loading ? 'Running…' : 'Run Pipeline'}
      </button>

      {/* Result Modal */}
      {result && !result.error && (
        <div className="pipeline-modal-backdrop">
          <div className="pipeline-modal">
            <div className="pipeline-modal-title">
              Pipeline Analysis
            </div>

            <div className="pipeline-modal-row">
              <span>Nodes</span>
              <strong>{result.num_nodes}</strong>
            </div>

            <div className="pipeline-modal-row">
              <span>Edges</span>
              <strong>{result.num_edges}</strong>
            </div>

            <div className="pipeline-modal-row">
              <span>Is DAG</span>
              <strong>{result.is_dag ? 'Yes' : 'No'}</strong>
            </div>

            <div className="pipeline-modal-footer">
              <button
                className="pipeline-modal-close"
                onClick={() => setResult(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
