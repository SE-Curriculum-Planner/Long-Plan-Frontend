import React from "react";
import LearnerSubjectBox from "./LearnerSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const LearnerBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
          <LearnerSubjectBox key={course.courseNo}
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
      ))}
    </div>
  );
};

export default LearnerBox;
