import React from 'react';
import CoreSubjectBox from './CoreSubjectBox';

interface CoreBoxProps {
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

const CoreBox: React.FC<CoreBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <CoreSubjectBox
            courseNo={course.courseNo}
            courseTitleEng="Major core"
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default CoreBox;
