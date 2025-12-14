// llmNode.js
import { BaseNode } from './base/BaseNode';
import { rightHandle, leftHandle } from './base/node.utils';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      title="LLM"
      nodeType="llm"
      leftHandles={[
        leftHandle(`${id}-system`, '33%'),
        leftHandle(`${id}-prompt`, '66%'),
      ]}
      rightHandles={[
        rightHandle(`${id}-response`)
      ]}
    >
      <span style={{
        fontSize: 12,
        paddingTop: 10,
      }}>This is a LLM.</span>
    </BaseNode>
  );
}
