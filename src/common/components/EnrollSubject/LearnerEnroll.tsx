import React from "react";
import { BaseBoxProps } from "utils/BoxUtils";

const LearnerEnrollBox: React.FC<BaseBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <div className="inline-flex items-start justify-end gap-[10px] pl-0 pr-[5px] py-0 relative bg-collection-1-yellow-shade-ybg rounded-[10px] border border-solid border-collection-1-yellow-shade-y5-5 shadow-box-shadow">
      <div className="relative w-[7px] h-[43px] bg-collection-1-yellow-shade-y5-5 rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[64px] font-h7 text-collection-1-yellow-shade-y7 text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-collection-1-yellow-shade-y7 text-[13px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[11px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-collection-1-yellow-shade-y5-5 text-[10px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </div>
  );
};

export default LearnerEnrollBox;
