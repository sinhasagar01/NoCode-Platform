import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        width: '20vw',
        minWidth: 220,
        maxWidth: 300,
        height: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        boxSizing: 'border-box',
      }}
    >
      <div className="sidebar-header">
        Nodes
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: 12,
        }}
      >
        <DraggableNode type="customInput" label="Input" variant="input" />
        <DraggableNode type="text" label="Text" variant="text" />
        <DraggableNode type="llm" label="LLM" variant="llm" />
        <DraggableNode type="customOutput" label="Output" variant="output" />
      </div>
    </div>
  );
};
