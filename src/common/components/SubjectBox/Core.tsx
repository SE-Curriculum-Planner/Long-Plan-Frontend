import React from "react";
import CoreSubjectBox from "./CoreSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const CoreBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <CoreSubjectBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default CoreBox;
