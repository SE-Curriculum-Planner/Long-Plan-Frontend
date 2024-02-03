import { createContext, useCallback, useContext } from "react";
import {
  useEdgesState,
  useNodesState,
  addEdge,
  Edge,
  Connection,
} from "reactflow";

const FlowContext = createContext({});

export function useFlowContext() {
  return useContext(FlowContext);
}

export interface NodeDataProps {
  courseNo: string;
  courseTitleEng: string;
  totalCredit: number;
}

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 200 },
    type: "CoreNode",
    data: {
      courseNo: "261261",
      courseTitleEng: "Thian",
      totalCredit: 3,
    },
  },
  {
    id: "4",
    position: { x: 200, y: 200 },
    type: "CoreNode",
    data: {
      courseNo: "261261",
      courseTitleEng: "Thian",
      totalCredit: 3,
    },
  },
  {
    id: "5",
    position: { x: 200, y: 100 },
    type: "CoreNode",
    data: {
      courseNo: "261261",
      courseTitleEng: "Thian",
      totalCredit: 3,
    },
  },
  {
    id: "2",
    position: { x: 0, y: 300 },
    type: "MajorNode",
    data: { courseNo: "261456", courseTitleEng: "James", totalCredit: 3 },
  },
  {
    id: "3",
    position: { x: 0, y: 400 },
    type: "LearnerNode",
    data: { courseNo: "261166", courseTitleEng: "Aomzin", totalCredit: 2 },
  },
];

const initialEdges = [
  {
    id: "e14",
    source: "1",
    target: "4",
    type: "smoothstep",
  },
  {
    id: "e15",
    source: "1",
    target: "5",
    type: "straight",
  },
];

export function FlowProvider({ children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds)),
    [setEdges]
  );
  const values = { nodes, edges, onNodesChange, onEdgesChange, onConnect };

  return <FlowContext.Provider value={values}>{children}</FlowContext.Provider>;
}
