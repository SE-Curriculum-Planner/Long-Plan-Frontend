import React from "react";
import CoreSubjectBox from "./CoreSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const CoreBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
          <CoreSubjectBox key={course.courseNo}
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
      ))}
    </div>
  );
};

export default CoreBox;
