import React from "react";
import MajorElecBox from "./MajorElecBox";
import { BoxProps } from "../CurriculumBox";

const MajorElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <MajorElecBox totalCredit={course.credits} />
        </div>
      ))}
    </div>
  );
};

export default MajorElec;
