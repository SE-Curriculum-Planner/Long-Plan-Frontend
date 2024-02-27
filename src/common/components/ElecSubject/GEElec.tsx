import React from "react";
import GEElecBox from "./GEElecBox";
import { BoxProps } from "../CurriculumBox";

const GEElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <GEElecBox totalCredit={course.credits} />
        </div>
      ))}
    </div>
  );
};

export default GEElec;
