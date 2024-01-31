import React from 'react';
import ActSubjectBox from './ActSubjectBox';

interface ActBoxProps {
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

const ActBox: React.FC<ActBoxProps> = ({ data }) => {
  return (
    <div>
      {data.requiredCourses.map((course) => (
        <div key={course.courseNo} className="mb-4">
          <ActSubjectBox
            courseNo={course.courseNo}
            courseTitleEng="GE Act-citiz"
            totalCredit={course.credits}
          />
        </div>
      ))}
    </div>
  );
};

export default ActBox;
