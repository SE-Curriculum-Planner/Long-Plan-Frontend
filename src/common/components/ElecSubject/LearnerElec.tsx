import React from 'react';
import LearnerElecBox from './LearnerElecBox';

interface LearnerElecProps {
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

const LearnerElec: React.FC<LearnerElecProps> = ({ data }) => {
  return (
    <div>
      {data.electiveCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <LearnerElecBox

                  totalCredit={course.credits}           />
        </div>
      ))}
    </div>
  );
};

export default LearnerElec;
