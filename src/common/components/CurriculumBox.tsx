import React, { useEffect, useState } from "react";
import CoreBox from "common/components/SubjectBox/Core";
import MajorBox from "common/components/SubjectBox/Major";
import ActBox from "common/components/SubjectBox/Act";
import LearnerBox from "common/components/SubjectBox/Learner";
import CoCreBox from "common/components/SubjectBox/CoCre";
import ElecBox from "common/components/SubjectBox/Elec";
import FreeBox from "common/components/ElecSubject/Free";
import MajorElec from "./ElecSubject/MajorElec";
import LearnerElecBox from "./ElecSubject/LearnerElecBox";
import LearnerElec from "./ElecSubject/LearnerElec";
import GEElec from "./ElecSubject/GEElec";
import CoCreElec from "./ElecSubject/CoCreElec";

interface Course {
  courseNo: string;
  courseTitleEng: string;
  recommendSemester: number;
  recommendYear: number;
  prerequisites: string[];
  corequisite: string | null;
  credits: number;
}

interface CourseGroup {
  requiredCredits: number;
  groupName: string;
  requiredCourses: Course[];
  electiveCourses: Course[];
}

interface CurriculumData {
  curriculumProgram: string;
  year: number;
  isCOOPPlan: boolean;
  requiredCredits: number;
  freeElectiveCredits: number;
  coreAndMajorGroups: CourseGroup[];
  geGroups: CourseGroup[];
  // ... other properties
}

const CurriculumBox: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/CPE-2563-normal.json");
        const data = await response.json();
        setCurriculumData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!curriculumData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Render components based on the new JSON structure */}
      {curriculumData.coreAndMajorGroups.map((group, index) => (
        <div key={index}>
          <h6>{`${group.groupName} - ${group.requiredCredits} credits |`}</h6>
          {/* You might need to adjust the props based on the structure of your components */}
          {group.groupName === "Core" && <CoreBox data={group} />}
          {group.groupName === "Major Required" && <MajorBox data={group} />}
          {group.groupName === "Major Elective" && <MajorElec data={group} />}
          {/* Add more conditions for other group names as needed */}
        </div>
      ))}
      <div>
        {curriculumData.geGroups.map((group, index) => (
          <div key={index}>
            <h6>{`${group.groupName} - ${group.requiredCredits} credits |`}</h6>
            {/* You might need to adjust the props based on the structure of your components */}
            {group.groupName === "Learner Person" && (
              <LearnerBox data={group} />
            )}
            {group.groupName === "Learner Person" && (
              <LearnerElec data={group} />
            )}
            {group.groupName === "Co-Creator" && <CoCreBox data={group} />}
            {group.groupName === "Co-Creator" && <CoCreElec data={group} />}
            {group.groupName === "Active Citizen" && <ActBox data={group} />}
            {group.groupName === "Elective" && <GEElec data={group} />}

            {/* Add more conditions for other group names as needed */}
          </div>
        ))}
      </div>
      <div>
        <h6>Free Elective {curriculumData.freeElectiveCredits} credits</h6>
        <FreeBox />
      </div>
    </div>
  );
};

export default CurriculumBox;
