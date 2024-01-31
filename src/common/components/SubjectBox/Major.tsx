import React from 'react';
import MajorSubjectBox from './MajorSubjectBox';

interface MajorBoxProps {
  data: {
    requiredCredits: number;
    groupName: string;
    requiredCourses: Array<{
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
          <MajorSubjectBox
            courseNo={course.courseNo}
            courseTitleEng="Major req"
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default MajorBox;
