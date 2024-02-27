import React from "react";
import LearnerElecBox from "./LearnerElecBox";
import { BoxProps } from "../CurriculumBox";

const LearnerElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <LearnerElecBox totalCredit={course.credits} />
        </div>
      ))}
    </div>
  );
};

export default LearnerElec;
