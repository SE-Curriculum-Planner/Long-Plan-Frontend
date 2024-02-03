import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { FlowProvider, useFlowContext } from "common/contexts/FlowContext";
import ActSubjectBox from "common/components/SubjectBox/ActSubjectBox";
import CoCreSubjectBox from "common/components/SubjectBox/CoCreSubjectBox";
import CoreSubjectBox from "common/components/SubjectBox/CoreSubjectBox";
import LearnerSubjectBox from "common/components/SubjectBox/LearnerSubjectBox";
import MajorSubjectBox from "common/components/SubjectBox/MajorSubjectBox";

// Define node types for React Flow
const nodeTypes = {
  CoreNode: CoreSubjectBox,
  MajorNode: MajorSubjectBox,
  ActNode: ActSubjectBox,
  CoCreNode: CoCreSubjectBox,
  LearnerNode: LearnerSubjectBox,
};

function RootPage() {
  // Retrieve nodes, edges, and event handlers from context
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowContext();

  return (
    <div className="w-screen h-screen">
      {/* Corrected prop name: nodes instead of node */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls position="top-right" />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default RootPage;
