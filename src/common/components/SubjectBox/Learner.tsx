import React from "react";
import LearnerSubjectBox from "./LearnerSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const LearnerBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <LearnerSubjectBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default LearnerBox;
