import React from 'react';
import LearnerSubjectBox from './LearnerSubjectBox';

interface LearnerBoxProps {
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

const LearnerBox: React.FC<LearnerBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <LearnerSubjectBox
            courseNo={course.courseNo}
            courseTitleEng="GE Learner"
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default LearnerBox;
