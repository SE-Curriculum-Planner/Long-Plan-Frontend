import React from "react";

interface CoCreElecBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
}

const CoCreElecBox: React.FC<CoCreElecBoxProps> = ({
  courseNo,
  courseTitleEng,
  courseCredit,
}) => {
  return (
    <div className="inline-flex items-start justify-end gap-[14px] pl-0 pr-[5px] py-0 relative bg-white rounded-[10px] border border-solid border-collection-1-co-creator-or shadow-box-shadow">
      <div className="relative w-[7px] h-[42px] bg-collection-1-co-creator-or rounded-[10px_0px_0px_10px]" />
      <div className="relative w-[75px] font-h7 text-black text-[16px] text-center tracking-[0] leading-[21px]">
        <span className="font-h7 text-black text-[15px] tracking-[0] leading-[21px]">
          {courseNo} <br />
        </span>
        <span className="text-[13px] text-collection-1-co-creator-or1 leading-[19.7px]">
          {courseTitleEng}
        </span>
      </div>
      <div className="inline-flex flex-col h-[19px] items-start justify-end gap-[10px] relative flex-[0_0_auto]">
        <div className="font-h2 text-collection-1-co-creator-or1 text-[12px] text-center tracking-[0] leading-[15.8px] whitespace-nowrap">
          {courseCredit}
        </div>
      </div>
    </div>
  );
};

export default CoCreElecBox;
