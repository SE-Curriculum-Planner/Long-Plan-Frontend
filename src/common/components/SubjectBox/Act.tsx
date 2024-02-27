import React from "react";
import ActSubjectBox from "./ActSubjectBox";
import { BoxProps } from "../CurriculumBox";

const ActBox: React.FC<BoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <ActSubjectBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng) + ".."}
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

// Function to truncate the title to the first 8 words
const truncateTitle = (title: string): string => {
  const words = title.split("");
  const truncatedTitle = words.slice(0, 8).join("");
  return truncatedTitle;
};

export default ActBox;
