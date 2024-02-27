import MajorSubjectBox from "common/components/SubjectBox/MajorSubjectBox";
import { Handle, Position, useStore } from "reactflow";
const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;
export default function MajorReqNode() {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  return (
    <div>
      <MajorSubjectBox
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
