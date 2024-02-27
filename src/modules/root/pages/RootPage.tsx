import ReactFlow, {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import Diagram from "common/components/diagram/flows/ReactFlowDiagram";

function RootPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <div
      style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
      className="w-screen h-screen flex-col flex justify-center items-center"
    >
      <p className="font-bold size-max w-full flex justify-center">
        Sad Diagram
      </p>
      <div className="w-3/4 h-3/4 flex border-solid border-[1px] border-slate-400 rounded-2xl shadow-box-shadow">
        <Diagram />
      </div>
    </div>
  );
}

export default RootPage;
