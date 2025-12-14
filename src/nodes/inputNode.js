// inputNode.js
import { useEffect, useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { rightHandle } from './base/node.utils';
import { useStore } from '../store';


export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      nodeType="input"
      rightHandles={[
        rightHandle(`${id}-value`)
      ]}
    >
      <div className="node-control">
        <label className="input-label">Name:</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="node-input"
        />

        <label className="input-label" style={{ marginTop: 8 }}>
          Type:
        </label>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
