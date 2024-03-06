import React from "react";
import CoCreSubjectBox from "./CoCreSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const CoCreBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <CoCreSubjectBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default CoCreBox;
