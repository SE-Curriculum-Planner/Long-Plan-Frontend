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
import Navbar from "common/components/Navbar/Navbar";

function RootPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <div
      style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
      className="w-screen h-screen  flex justify-center items-center gap-4 bg-slate-100"
    >
      <Navbar />
      <div className="w-3/5 h-4/5 flex  rounded-2xl shadow-box-shadow">
        <Diagram />
      </div>
      <div className="w-1/5 h-4/5 flex  rounded-2xl shadow-box-shadow bg-white">
        Credit Dashboard
      </div>
    </div>
  );
}

export default RootPage;
