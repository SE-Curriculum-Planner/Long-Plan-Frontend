import { SubjectBoxProps } from "common/components/CurriculumBox";
import { truncateTitle } from "common/components/SubjectBox/Core";
import MajorSubjectBox from "common/components/SubjectBox/MajorSubjectBox";
import { Handle, Position, useStore } from "reactflow";
const connectionNodeIdSelector = (state: { connectionNodeId: any }) =>
  state.connectionNodeId;
export default function MajorReqNode(props: { data: SubjectBoxProps }) {
  const { data } = props;
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  return (
    <div>
      <MajorSubjectBox
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
    </div>
  );
}
