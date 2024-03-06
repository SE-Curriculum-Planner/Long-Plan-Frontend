import React from "react";
import ActSubjectBox from "./ActSubjectBox";
import { curriculumBoxProps, truncateTitle } from "utils/BoxUtils";

const ActBox: React.FC<curriculumBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <ActSubjectBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default ActBox;
