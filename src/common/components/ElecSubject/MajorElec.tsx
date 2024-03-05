import React from "react";
import { MajorElecBox } from "./GroupBox";
import { BoxProps, truncateTitle } from "utils/BoxUtils";

const MajorElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <MajorElecBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            courseCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default MajorElec;
