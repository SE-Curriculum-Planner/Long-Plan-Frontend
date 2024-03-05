import React from "react";
import { CoCreElecBox } from "./GroupBox";
import { truncateTitle, BoxProps } from "utils/BoxUtils";

const CoCreElec: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <CoCreElecBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            courseCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default CoCreElec;
