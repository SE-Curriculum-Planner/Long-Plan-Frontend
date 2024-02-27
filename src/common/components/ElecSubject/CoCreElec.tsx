import React from "react";
import CoCreElecBox from "./CoCreElecBox";
import { BoxProps } from "../CurriculumBox";

const CoCreElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <CoCreElecBox totalCredit={course.credits} />
        </div>
      ))}
    </div>
  );
};

export default CoCreElec;
