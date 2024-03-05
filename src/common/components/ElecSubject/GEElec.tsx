import React from "react";
import { GEElecBox } from "./GroupBox";
import { truncateTitle, BoxProps } from "utils/BoxUtils";

const GEElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <GEElecBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            courseCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default GEElec;
