// outputNode.js

import { useEffect, useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { leftHandle } from './base/node.utils';
import { useStore } from '../store';


export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
  }, []);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      nodeType="output"
      leftHandles={[
        leftHandle(`${id}-value`)
      ]}
    >
    <div className="node-control">
      <label className="input-label">Name:</label>
      <input
        type="text"
        value={currName}
        onChange={handleNameChange}
      />

      <label className="input-label" style={{ marginTop: 8 }}>
        Type:
      </label>
      <select value={outputType} onChange={handleTypeChange}>
        <option value="Text">Text</option>
        <option value="Image">Image</option>
      </select>
    </div>
    </BaseNode>
  );
}
