import React from "react";
import LearnerSubjectBox from "./LearnerSubjectBox";
import { BoxProps } from "../CurriculumBox";

const LearnerBox: React.FC<BoxProps> = ({ data }) => {
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

// Function to truncate the title to the first 8 words + ... + number
const truncateTitle = (title: string): string => {
  const words = title.split("");

  if (words.length > 8) {
    // Find the first space after the 8th word
    const firstSpaceIndex = title.indexOf(
      "",
      title.indexOf(
        "",
        title.indexOf(
          "",
          title.indexOf(
            "",
            title.indexOf(
              "",
              title.indexOf("", title.indexOf("", title.indexOf("") + 1) + 1) +
                1
            ) + 1
          ) + 1
        ) + 1
      ) + 1
    );

    if (firstSpaceIndex !== -1) {
      const truncatedTitle = title.substring(0, firstSpaceIndex);

      // Check if the last word is a number
      const lastWord = words[words.length - 1];
      if (!isNaN(Number(lastWord))) {
        return truncatedTitle + ` ${lastWord}`;
      }

      return truncatedTitle + "..";
    }
  }

  return title;
};
export default LearnerBox;
