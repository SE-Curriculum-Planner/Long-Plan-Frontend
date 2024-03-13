import React from "react";
import ActSubjectBox from "./ActSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const ActBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
          <ActSubjectBox key={course.courseNo}
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
      ))}
    </div>
  );
};

export default ActBox;
