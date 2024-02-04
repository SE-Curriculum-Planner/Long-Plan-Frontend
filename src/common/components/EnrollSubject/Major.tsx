import React from 'react';
import MajorEnrollBox from './MajorEnroll';

interface MajorBoxProps {
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

const MajorBox: React.FC<MajorBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <MajorEnrollBox
            courseNo={course.courseNo}
            courseTitleEng={truncateTitle(course.courseTitleEng)+".."}
            courseCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

// Function to truncate the title to the first 8 words
const truncateTitle = (title: string): string => {
  const words = title.split('');
  const truncatedTitle = words.slice(0, 8).join('');
  return truncatedTitle;
};

export default MajorBox;
