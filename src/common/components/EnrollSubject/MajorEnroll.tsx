import React from 'react';

interface MajorSubjectBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
}

const MajorEnrollBox: React.FC<MajorSubjectBoxProps> = ({ courseNo, courseTitleEng, courseCredit }) => {
  return (
    <div className="inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-collection-1-b-sl rounded-[10px] border border-solid border-blue-shadeb5 shadow-box-shadow">
      <div className="relative w-[7px] h-[42px] bg-blue-shadeb5 rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-blue-shadeb5 text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-blue-shadeb5 text-[15px] tracking-[0] leading-[21px]">
          {courseNo}
          <br />
        </span>
        <span className="text-[13px] leading-[19.7px]">{courseTitleEng}</span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-blue-shadeb5 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </div>
  );
};

export default MajorEnrollBox;
