import CoreSubjectBox from "common/components/SubjectBox/CoreSubjectBox";
import { Handle, Position, useStore } from "reactflow";

const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;

export default function CoreNode() {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;

  return (
    <div>
      <CoreSubjectBox
        courseNo={"261261"}
        courseTitleEng={"Thian"}
        totalCredit={3}
      />
      {!isConnecting && (
        <Handle
          className="customHandle"
          position={Position.Right}
          type="source"
        />
      )}
      <Handle
        className="customHandle"
        position={Position.Left}
        type="target"
        isConnectableStart={false}
      />
    </div>
  );
}
