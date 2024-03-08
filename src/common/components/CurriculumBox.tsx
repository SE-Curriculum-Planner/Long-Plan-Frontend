import React, { useState } from "react";
import CoreBox from "common/components/SubjectBox/Core";
import MajorBox from "common/components/SubjectBox/Major";
import ActBox from "common/components/SubjectBox/Act";
import LearnerBox from "common/components/SubjectBox/Learner";
import CoCreBox from "common/components/SubjectBox/CoCre";
import MajorElec from "./ElecSubject/MajorElec";
import LearnerElec from "./ElecSubject/LearnerElec";
import GEElec from "./ElecSubject/GEElec";
import CoCreElec from "./ElecSubject/CoCreElec";
import { useQuery } from "react-query";
import { coreApi } from "core/connections";

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

type CurriculumPayload = {
  major: string;
  year: string;
  plan: string;
};

function getCurriculum({ major, year, plan }: CurriculumPayload) {
  return new Promise<CurriculumData>((resolve, reject) => {
    coreApi
      .get(`/curriculum?major=${major}&year=${year}&plan=${plan}`)
      .then((res) => resolve(res.data))
      .catch(reject);
  });
}

const CurriculumBox: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  useQuery(
    "curriculum-box",
    async () =>
      await getCurriculum({ major: "CPE", year: "2563", plan: "normal" }),
    {
      onSuccess: (data) => {
        if (data) {
          console.log(data);
          setCurriculumData(data);
        }
      },
    }
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const major = "CPE";
  //       const year = "2563";
  //       const plan = "normal";
  //       // const response = await fetch(
  //       //   `http://127.0.0.1:8000/api/v1/curriculum?major=${major}&year=${year}&plan=${plan}`
  //       // );

  //       const data = await response.json();
  //       setCurriculumData(data); // Assuming setCurriculumData is a function to set your state or data
  //     } catch (error) {
  //       console.error("Error fetching curriculum data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const filterCourses = (courseGroup: CourseGroup) => {
    return {
      ...courseGroup,
      requiredCourses: courseGroup.requiredCourses.filter((course) =>
        course.courseNo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      electiveCourses: courseGroup.electiveCourses.filter((course) =>
        course.courseNo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    };
  };

  if (!curriculumData) {
    return <div>Loading...</div>;
  }

  const filteredGeGroups = curriculumData.geGroups
    .map(filterCourses)
    .filter(
      (group) => selectedGroup === "All" || group.groupName === selectedGroup
    ); // Filter here instead

  const filteredCoreAndMajorGroups = curriculumData.coreAndMajorGroups
    .map(filterCourses)
    .filter(
      (group) => selectedGroup === "All" || group.groupName === selectedGroup
    ); // Filter here instead
  return (
    <div className="text-center">
      <h1 className="mt-10 mb-12">วิชาทั้งหมดจากแผนการเรียน</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by Course Number 6 digits"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[260px] h-[40px]  px-4 bg-white rounded-3xl border-2 border-solid border-blue-shadeb2 justify-center items-center gap-2.5 inline-flex"
          style={{
            fontFamily: "IBM Plex Sans Thai, sans-serif",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#000000",
          }}
          maxLength={6}
        />
        <div className="flex justify-center mb-4 ml-5">
          <select
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-[180px] h-[40px]  px-4 bg-blue-shadeb4 rounded-3xl border-2 border-solid border-blue-shadeb5 justify-center items-center gap-2.5 inline-flex"
            style={{
              fontFamily: "IBM Plex Sans Thai, sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#FFFFFF",
            }}
          >
            <option value="All">All Groups</option>
            <option value="Learner Person">Learner Person</option>
            <option value="Co-Creator">Co-Creator</option>
            <option value="Active Citizen">Active Citizen</option>
            <option value="Elective">Elective</option>
            <option value="Core">Core</option>
            <option value="Major Required">Major Required</option>
            <option value="Major Elective">Major Elective</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        {/* Render filtered GE groups */}

        {filteredGeGroups.map((group, index) => (
          <div key={index} className="bg-white rounded-[30px] px-4">
            <h6>{`${group.groupName} - ${group.requiredCredits} credits`}</h6>
            {/* Conditional components based on groupName */}

            {group.groupName === "Learner Person" && (
              <LearnerBox data={group} />
            )}
            {group.groupName === "Co-Creator" && <CoCreBox data={group} />}
            {group.groupName === "Active Citizen" && <ActBox data={group} />}

            {group.groupName === "Learner Person" && (
              <LearnerElec data={group} />
            )}
            {group.groupName === "Co-Creator" && <CoCreElec data={group} />}
            {group.groupName === "Elective" && <GEElec data={group} />}
          </div>
        ))}

        {/* Render filtered Core and Major groups */}
        {filteredCoreAndMajorGroups.map((group, index) => (
          <div key={index} className="bg-white rounded-[30px] px-4">
            <h6>{`${group.groupName} - ${group.requiredCredits} credits`}</h6>
            {/* Conditional components based on groupName */}
            {group.groupName === "Core" && <CoreBox data={group} />}
            {group.groupName === "Major Required" && <MajorBox data={group} />}
            {group.groupName === "Major Elective" && <MajorElec data={group} />}
          </div>
        ))}
        {/* Render Free Elective section */}
        {/* <div className="bg-white rounded-[20px] pr-16 pl-16">
          <h6>Free Elective {curriculumData.freeElectiveCredits} credits</h6>
          <FreeBox />
        </div> */}
      </div>
    </div>
  );
};

export default CurriculumBox;
