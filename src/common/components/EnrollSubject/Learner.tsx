import React from 'react';
import LearnerEnrollBox from './LearnerEnroll';

interface LearnerBoxProps {
  data: {
    requiredCredits: number;
    groupName: string;
    requiredCourses: Array<{
      courseTitleEng: string;
      courseNo: string;
      recommendSemester: number;
      recommendYear: number;
      prerequisites: Array<string>;
      corequisite: string | null;
      credits: number;
    }>;
    electiveCourses: Array<{
      courseNo: string;
      recommendSemester: number | null;
      recommendYear: number | null;
      prerequisites: Array<string>;
      corequisite: string | null;
      credits: number;
    }>;
  };
}

const LearnerBox: React.FC<LearnerBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <LearnerEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)}
            courseCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

// Function to truncate the title to the first 8 words + ... + number
const truncateTitle = (title: string): string => {
  const words = title.split('');

  if (words.length > 8) {
    // Find the first space after the 8th word
    const firstSpaceIndex =  title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('') + 1) + 1) + 1) + 1) + 1) + 1) + 1) ;

    if (firstSpaceIndex !== -1) {
      const truncatedTitle = title.substring(0, firstSpaceIndex);

      // Check if the last word is a number
      const lastWord = words[words.length - 1];
      if (!isNaN(Number(lastWord))) {
        return truncatedTitle + ` ${lastWord}`;
      }

      return truncatedTitle + '..';
    }
  }

  return title;
};
export default LearnerBox;
