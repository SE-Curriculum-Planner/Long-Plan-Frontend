import { NodeDataProps } from "common/contexts/FlowContext";
import React from "react";
import { Handle, Position } from "reactflow";

// interface LearnerSubjectBoxProps {
//   courseNo: string;
//   courseTitleEng: string;
//   totalCredit: number;
// }

const LearnerSubjectBox: React.FC<NodeDataProps> = ({
  courseNo,
  courseTitleEng,
  totalCredit,
}) => {
  return (
    <div>
      <Handle type={"target"} position={Position.Left} className="z-10" />
      <Handle type={"source"} position={Position.Right} className="z-10" />
      <div className="inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-collection-1-yellow-shade-y5-5 shadow-box-shadow">
        <div className="relative w-[7px] h-[42px] bg-collection-1-yellow-shade-y5-5 rounded-[10px_0px_0px_10px]" />
        <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
          <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
            {courseNo}
            <br />
          </span>
          <span className="text-[13px] leading-[19.7px]">{courseTitleEng}</span>
        </div>
        <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
          <div className="font-h2 text-collection-1-yellow-shade-y5-5 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
            {totalCredit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerSubjectBox;
