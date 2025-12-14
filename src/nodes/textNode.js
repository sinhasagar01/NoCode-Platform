import { useEffect, useState, useRef } from 'react'
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './base/BaseNode'
import { useAutoResize } from '../hooks/useAutoResize'
import { useTextVariables } from '../hooks/useTextVariables'
import { rightHandle } from './base/node.utils'
import { getActiveVariable, replaceActiveVariable } from './base/node.utils'
import { useStore } from '../store'

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '')
  const [cursorPos, setCursorPos] = useState(null)
  const [pendingEdge, setPendingEdge] = useState(null);
  const textareaRef = useRef(null)
  const normalizeVar = (v) => v.trim();
  const updateNodeInternals = useUpdateNodeInternals();

  const nodes = useStore((s) => s.nodes)
  const addEdgeSafe = useStore((s) => s.addEdgeSafe)

  useAutoResize(textareaRef, text)

  const variableHandles = useTextVariables(text, id)

  const activeVar =
  cursorPos !== null ? getActiveVariable(text, cursorPos) : null

  const candidates = activeVar !== null
    ? nodes
        .filter((n) =>
          n.type === 'customInput'
        )
        .map((n) => n.data?.inputName || n.data?.outputName)
        .filter(
          (name) =>
            name &&
            (activeVar === '' || name.startsWith(activeVar))
        )
    : [];



  const onChange = (e) => {
    setText(e.target.value);
    requestAnimationFrame(() => {
      setCursorPos(e.target.selectionStart);
    });
  };


  const selectVariable = (variable) => {
    const normalizedVar = normalizeVar(variable);

    const newText = replaceActiveVariable(text, cursorPos, normalizedVar);
    setText(newText);
    setCursorPos(null);

    const sourceNode = nodes.find(
      (n) =>
        n.data?.inputName === normalizedVar ||
        n.data?.outputName === normalizedVar
    );

    if (!sourceNode) return;

    const sourceHandle =
      sourceNode.type === 'customInput'
        ? `${sourceNode.id}-value`
        : `${sourceNode.id}-response`;

    setPendingEdge({
      source: sourceNode.id,
      sourceHandle,
      target: id,
      targetHandle: `${id}-${normalizedVar}`,
      type: 'smoothstep',
      animated: true,
    });
  };

  useEffect(() => {
    updateNodeInternals(id); 
  }, [variableHandles, id, updateNodeInternals]);


  useEffect(() => {
    if (!pendingEdge) return;

    const handleExists = variableHandles.some(
      (h) => h.id === pendingEdge.targetHandle
    );

    if (handleExists) {
      addEdgeSafe(pendingEdge);
      setPendingEdge(null);
    }
  }, [variableHandles, pendingEdge, addEdgeSafe]);

 
  const shouldShowDropdown = activeVar !== null && candidates.length > 0;


  return (
    <BaseNode
      id={id}
      title="Text"
      nodeType="text"
      leftHandles={variableHandles}
      rightHandles={[rightHandle(`${id}-output`)]}
    >
      <div style={{ position: 'relative' }} className="node-control">
        <label className="input-label">Text:</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={onChange}
          onClick={(e) => setCursorPos(e.target.selectionStart)}
          style={{
            resize: 'none',
            minHeight: 70,
            lineHeight: 1.4,
          }}
        />

        {shouldShowDropdown && (
          <div style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            zIndex: 10,
          }}>
            {candidates.map((c) => (
              <div
                key={c}
                onClick={() => selectVariable(c)}
                style={{ padding: '4px', cursor: 'pointer' }}
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  )
}
