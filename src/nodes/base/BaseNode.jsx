import { Handle, Position } from 'reactflow'
import { NodeHeader } from './NodeHeader'

const NODE_STYLES = {
  input: {
    background: 'linear-gradient(135deg, #bfdbfe 0%, rgba(37, 99, 235, 0.12) 100%)',
    borderColor: '#2563eb',
  },
  text: {
    background: 'linear-gradient(135deg, #ddd6fe 0%, rgba(124, 58, 237, 0.12) 100%)',
    borderColor: '#7c3aed',
  },
  llm: {
    background: 'linear-gradient(135deg, #fed7aa 0%, rgba(234, 88, 12, 0.12) 100%)',
    borderColor: '#ea580c',
  },
  output: {
    background: 'linear-gradient(135deg, #dcfce7 0%, rgba(34, 197, 94, 0.12) 100%)',
    borderColor: '#22c55e',
  },
};


export const BaseNode = ({
  id,
  title,
  nodeType,
  leftHandles = [],
  rightHandles = [],
  children,
}) => {
  const styles = NODE_STYLES[nodeType] || NODE_STYLES.text;
  return (
    <div
      style={{
        minWidth: 200,
        padding: 12,
        borderRadius: 12,
        background: styles.background,
        border: `2px solid ${styles.borderColor}`,
      }}
      className="node-container"
    >
      <NodeHeader title={title} />

      {/* Left handles */}
      {leftHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ top: handle.top }}
        />
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>

      {/* Right handles */}
      {rightHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{ top: handle.top }}
        />
      ))}
    </div>
  )
}