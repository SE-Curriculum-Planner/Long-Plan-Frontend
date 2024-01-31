import React from 'react';
import CoCreSubjectBox from './CoCreSubjectBox';

interface CoCreBoxProps {
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

const CoCreBox: React.FC<CoCreBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <CoCreSubjectBox
            courseNo={course.courseNo}
            courseTitleEng="GE Co-cre"
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default CoCreBox;
