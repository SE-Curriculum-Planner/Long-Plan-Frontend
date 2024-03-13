import React from "react";
import CoCreSubjectBox from "./CoCreSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const CoCreBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
          <CoCreSubjectBox key={course.courseNo}
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
      ))}
    </div>
  );
};

export default CoCreBox;
