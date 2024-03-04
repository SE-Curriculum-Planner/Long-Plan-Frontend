import { SubjectBoxProps } from "common/components/CurriculumBox";
import { truncateTitle } from "common/components/SubjectBox/Core";
import CoreSubjectBox from "common/components/SubjectBox/CoreSubjectBox";
import { Handle, Position, useStore } from "reactflow";

const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;

export default function CoreNode(props: { data: SubjectBoxProps }) {
  const { data } = props;
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;

  return (
    <div>
      <CoreSubjectBox
        courseNo={data.courseNo}
        courseTitleEng={truncateTitle(data.courseTitleEng)}
        totalCredit={data.totalCredit}
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
      <Handle
        className="customHandle"
        position={Position.Bottom}
        type="source"
        id="b"
        isConnectableStart={false}
      />
      <Handle
        className="customHandle"
        position={Position.Top}
        type="target"
        id="b"
        isConnectableStart={false}
      />
    </div>
  );
}
