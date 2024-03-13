import React from "react";
import MajorSubjectBox from "./MajorSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const MajorBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
          <MajorSubjectBox key={course.courseNo}
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
      ))}
    </div>
  );
};

export default MajorBox;
