import { DraggableNode } from './DraggableNode';
import { FiArrowDownLeft, FiFileText, FiArrowUpRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaCircleNodes } from "react-icons/fa6";

export const PipelineToolbar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <FaCircleNodes />
        Nodes
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
          padding: 12,
        }}
      >
        <DraggableNode icon={FiArrowDownLeft} type="customInput" label="Input" variant="input" />
        <DraggableNode icon={FiFileText} type="text" label="Text" variant="text" />
        <DraggableNode icon={HiOutlineSparkles} type="llm" label="LLM" variant="llm" />
        <DraggableNode icon={FiArrowUpRight} type="customOutput" label="Output" variant="output" />
      </div>
    </div>
  );
};
