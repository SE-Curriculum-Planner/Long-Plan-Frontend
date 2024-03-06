import React from "react";
import MajorSubjectBox from "./MajorSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const MajorBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <MajorSubjectBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default MajorBox;
