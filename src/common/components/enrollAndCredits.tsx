import React, { useState , useEffect } from "react";
import CoreEnrollBox from "./EnrollSubject/CoreEnroll";
import MajorEnrollBox from "./EnrollSubject/MajorEnroll";
import LearnerEnrollBox from "./EnrollSubject/LearnerEnroll";
import ActEnrollBox from "./EnrollSubject/ActEnroll";
import GEElecEnrollBox from "./EnrollSubject/GEElecEnroll";
import FreeEnrollBox from "./EnrollSubject/FreeEnroll";
import CoCreEnrollBox from "./EnrollSubject/CoCreEnroll";
import {Course, truncateTitle} from "utils/BoxUtils";
import UncountBox from "./EnrollSubject/UncountBox";
import BlankBox from "./EnrollSubject/BlankBox"
import CreditBox from "./EnrollSubject/CreditBox"
import PendingCreditBox from "./EnrollSubject/PendingCreditBox"
import { coreApi } from "core/connections";
import { useQuery } from "react-query";
import useGlobalStore from "common/contexts/StoreContext";
import PlanSelection from "./Navbar/PlanSelection.tsx"

type CurriculumPayload = {
  major: string;
  year: string;xw
  plan: string;
};

type CurriculumData = {
  // Define the structure of the curriculum data here
  major: string;
  year: string;
  plan: string;
  // Add more properties if needed
};

type EnrolledCoursesData = {
  // Define the structure of the enrolled courses data here
  studentID: string;
  // Add more properties if needed
};

function getCurriculum({ major, year, plan }: CurriculumPayload): Promise<CurriculumData> {
  return new Promise<CurriculumData>((resolve, reject) => {
    coreApi
        .get(`/curriculum?major=${major}&year=${year}&plan=${plan}`)
        .then((res: { data: CurriculumData }) => resolve(res.data))
        .catch(reject);
  });
}

function getEnrolledCourses({ studentID }: { studentID: string }): Promise<EnrolledCoursesData> {
  return new Promise<EnrolledCoursesData>((resolve, reject) => {
    coreApi
        .get(`/student/enrolledcourses?studentID=${studentID}`)
        .then((res: { data: EnrolledCoursesData }) => resolve(res.data))
        .catch(reject);
  });
}

export const EnrollAndCredits: React.FC = () => {
  const { userData } = useGlobalStore();
  const [groupedEnrolls, setGroupedEnrolls] = useState<any>(null);
  const [curriculumData, setCurriculumData] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState({ major: "CPE", year: "2563", plan: "normal" });

  const { refetch } = useQuery("curriculum", fetchData, {
    onSuccess: async (data: { enrollData: any; curriculumData: any }) => {
      if (data) {
        setGroupedEnrolls(data.enrollData);
        setCurriculumData(data.curriculumData);
        console.log(data.curriculumData)
      }
    },
  });

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [selectedPlan]);

  async function fetchData() {
    if (userData) {
      const [curriculumData, enrollData] = await Promise.all([
        getCurriculum(selectedPlan),
        getEnrolledCourses({ studentID: userData.student_id }),
      ]);
      return { curriculumData, enrollData };
    }
  }

  // useEffect(() => {}, [groupedEnrolls]); // Fetch data when studentID changes
  // console.log(curriculumData);

  // const { data: enrolledData } = useQuery(
  // 	"enrolled",
  // 	async () => await getEnrolledCourses({ studentID }),
  // 	{
  // 		onSuccess: (data) => {
  // 			if (data) {
  // 				console.log(data);
  // 				setGroupedEnrolls(data);
  // 			}
  // 		},
  // 	}
  // );

  // useQuery("enrolled", async () => await getEnrolledCourses({ studentID }), {
  // 	onSuccess: (data) => {
  // 		if (data) {
  // 			console.log(data);
  // 			setGroupedEnrolls(data);
  // 		}
  // 	},
  // });
  // useEffect(() => {
  // 	// CurriculumRefetch();
  // 	EnrolledRefetch();
  // }, [studentID]); // Fetch data when studentID changes

  // Check if curriculumData is available before using it
  if (!curriculumData) {
    return null; // or a loading indicator, depending on your UI requirements
  }

  // Function to find courseTitleEng based on courseNo
  const findCourseTitle = (
    courseNo: string
  ): { courseTitleEng: string | undefined; groupName: string } => {
    // Check if both curriculumData and groupedEnrolls are available
    if (curriculumData && groupedEnrolls) {
      // Iterate through the required courses in geGroups and coreAndMajorGroups
      for (const group of [
        ...curriculumData.geGroups,
        ...curriculumData.coreAndMajorGroups,
      ]) {
        for (const course of group.requiredCourses) {
          if (course.courseNo === courseNo) {
            return {
              courseTitleEng: course.courseTitleEng,
              groupName: group.groupName,
            };
          }
        }
        for (const electiveCourse of group.electiveCourses) {
          if (electiveCourse.courseNo === courseNo) {
            return {
              courseTitleEng: electiveCourse.courseTitleEng,
              groupName: group.groupName,
            };
          }
        }
      }
    }

    return { courseTitleEng: undefined, groupName: "Free Elective" };
  };

  // Function to calculate the sum of credits for each groupName
  const calculateGroupCredits = (): { [groupName: string]: number } => {
    const groupCredits: { [groupName: string]: number } = {};

    // Initialize groupCredits with 0 for each groupName, including Free Elective
    [...curriculumData.geGroups, ...curriculumData.coreAndMajorGroups].forEach(
      (group: { groupName: string }) => {
        groupCredits[group.groupName] = 0;
      }
    );
    groupCredits["Free Elective"] = 0; // Ensure Free Elective is also initialized

    // Iterate through groupedEnrolls to accumulate credits
    Object.keys(groupedEnrolls).forEach((year) => {
      Object.keys(groupedEnrolls[year]).forEach((semester) => {
        groupedEnrolls[year][semester].forEach((course: any) => {
          if (course.grade !== "F" && course.grade !== "W") {
            const courseInfo = findCourseTitle(course.courseNo);
            if (courseInfo) {
              // Assuming findCourseTitle returns undefined for courses not in curriculum
              const groupName = courseInfo.groupName;
              const requiredCredits = (
                curriculumData.geGroups
                  .concat(curriculumData.coreAndMajorGroups)
                  .find(
                    (group: { groupName: string }) =>
                      group.groupName === groupName
                  ) || {}
              ).requiredCredits;

              // Check if adding credits exceeds requiredCredits for this group
              if (
                requiredCredits !== undefined &&
                groupCredits[groupName] + Math.floor(course.credit) >
                  requiredCredits
              ) {
                const excessCredits =
                  groupCredits[groupName] +
                  Math.floor(course.credit) -
                  requiredCredits;
                groupCredits[groupName] = requiredCredits; // Set to max requiredCredits
                groupCredits["Free Elective"] += excessCredits; // Add excess to Free Elective
              } else {
                groupCredits[groupName] += Math.floor(course.credit);
              }
            } else {
              // Course not in curriculum, count towards Free Elective
              groupCredits["Free Elective"] += Math.floor(course.credit);
            }
          }
        });
      });
    });

    return groupCredits;
  };

  // Calculate group credits
  const groupCredits = calculateGroupCredits();

  // Function to calculate the total sum of credits
  const calculateTotalCredits = (): number => {
    let totalCredits = 0;

    // Sum all group credits
    Object.keys(groupCredits).forEach((groupName) => {
      if (totalCredits < curriculumData.requiredCredits)
        totalCredits += groupCredits[groupName];
    });

    return totalCredits;
  };

  // Calculate total sum of credits
  const totalCredits = calculateTotalCredits();

  const getColorForGroupName = (groupName: string): string => {
    switch (groupName) {
      case "Core":
        return "collection-1-core-sk1";
      case "Major Required":
        return "blue-shadeb5";
      case "Major Elective":
        return "blue-shadeb5";
      case "Learner Person":
        return "collection-1-yellow-shade-y7";
      case "Active Citizen":
        return "collection-1-active-citizen-r2";
      case "Elective":
        return "collection-1-electives-brown1";
      case "Free Elective":
        return "collection-1-black-shade-bl4";
      case "Co-Creator":
        return "collection-1-co-creator-or1";
      // Add other cases for different group names as needed
      default:
        return "collection-1-yellow-shade-y6"; // Default color
    }
  };

  // Calculate the total required credits for coreAndMajorGroups
  const totalCoreAndMajorRequiredCredits =
    curriculumData.coreAndMajorGroups.reduce(
      (accumulator: any, group: { requiredCredits: any }) =>
        accumulator + group.requiredCredits,
      0
    );

  const totalGeCredits = curriculumData.geGroups.reduce(
    (accumulator: any, group: { requiredCredits: any }) =>
      accumulator + group.requiredCredits,
    0
  );

  // Calculate the total earned credits for coreAndMajorGroups
  // Assuming groupCredits is an object like: { Core: earnedCredits, Major Required: earnedCredits, ... }
  const totalCoreAndMajorEarnedCredits =
    curriculumData.coreAndMajorGroups.reduce(
      (accumulator: number, group: { groupName: string | number }) =>
        accumulator + (groupCredits[group.groupName] || 0),
      0
    );

  const calculateRemainingSubjectsForMajor = () => {
    return curriculumData.coreAndMajorGroups.map(
      (group: { groupName: string; requiredCredits: number }) => {
        const creditsCompleted = groupCredits[group.groupName] || 0;
        let creditsRemaining = group.requiredCredits - creditsCompleted;
        const subjectRemaining = Math.round(creditsRemaining / 3);
        if (creditsRemaining <= 0) creditsRemaining = 0;

        return {
          name: group.groupName,
          remaining: creditsRemaining,
          subjectRemaining, // Corrected property name
          color: getColorForGroupName(group.groupName),

        };
      }
    );
  };

  const remainingSubjectsForMajor = calculateRemainingSubjectsForMajor();

  const calculateRemainingSubjectsForGE = () => {
    return curriculumData.geGroups.map(
        (group: { groupName: string; requiredCredits: number; groups: string[] }) => {
          // Assuming groupCredits is an object where keys are group names and values are the credits completed
          const creditsCompleted = groupCredits[group.groupName] || 0; // Default to 0 if not found
          let creditsRemaining = group.requiredCredits - creditsCompleted;
          if (creditsRemaining <= 0) creditsRemaining = 0;

          // You need to return an object directly without the braces, or use parentheses to wrap the object
          return {
            name: group.groupName,
            remaining: creditsRemaining,
            color: getColorForGroupName(group.groupName),
            courseTitleEng: group.groupName,
          };
        }
    );
  };

  const remainingSubjectsForGE = calculateRemainingSubjectsForGE();

  const calculateRemainingFreeElectives = () => {
    const creditsCompleted = groupCredits["Free Elective"] || 0;
    const creditsRemaining =
      curriculumData.freeElectiveCredits - creditsCompleted;
    const subjectRemaining = Math.round(creditsRemaining); // Assuming direct subtraction is what you want

    return {
      name: "Free Elective",
      remaining: creditsRemaining,
      subjectRemaining,
      color: getColorForGroupName("Free Elective"), // Ensure this name matches your color map key
    };
  };

  const remainingFreeElectives = calculateRemainingFreeElectives();

  const groupOrder = [
    "Learner Person",
    "Co-Creator",
    "Active Citizen",
    "Elective",
    "Core",
    "Major Required",
    "Major Elective",
    "Free Elective",
  ];

  // Initialize variables to store maximum counts for each group
  let maxGeneralEducationCourses = 0;
  let maxMajorRequirementCourses = 0;
  let maxFreeElectiveCourses = 0;

// Loop through each year and semester to find the maximum counts for each group
  Object.keys(groupedEnrolls).forEach(year => {
    Object.keys(groupedEnrolls[year]).forEach(semester => {
      const coursesByGroup = {
        generalEducation: [],
        majorRequirements: [],
        freeElective: []
      };

      groupedEnrolls[year][semester].forEach(course=> {
        const { groupName } = findCourseTitle(course.courseNo);
        switch (groupName) {
          case "Learner Person":
          case "Co-Creator":
          case "Active Citizen":
          case "Elective":
            coursesByGroup.generalEducation.push(course);
            break;
          case "Core":
          case "Major Required":
          case "Major Elective":
            coursesByGroup.majorRequirements.push(course);
            break;
          default:
            coursesByGroup.freeElective.push(course);
        }
      });

      // Update maximum counts for each group
      maxGeneralEducationCourses = Math.max(maxGeneralEducationCourses, coursesByGroup.generalEducation.length);
      maxMajorRequirementCourses = Math.max(maxMajorRequirementCourses, coursesByGroup.majorRequirements.length);
      maxFreeElectiveCourses = Math.max(maxFreeElectiveCourses, coursesByGroup.freeElective.length);
    });
  });
  const heightDiv = 57.695

  function numberToOrdinal(n: string | number) {
    const ordinals = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"];
    return ordinals[n - 1];
  }

  function numberToSemester(n: string | number) {
    const ordinals = ["1st", "2nd"];
    return ordinals[n - 1];
  }

  function findRemainingCourses() {
    const remainingCourses: {
        courseNo: any; courseTitleEng: any; credit: any; // Add course credits
        recommendYear: any; recommendSemester: any;
    }[] = [];

    // Iterate over each group in curriculumData
    curriculumData.coreAndMajorGroups.forEach(group => {
      // Iterate over each course in the group
      group.requiredCourses.forEach(course => {
        // Check if the course exists in groupedEnrolls
        let courseExists = false;
        Object.keys(groupedEnrolls).forEach(year => {
          Object.keys(groupedEnrolls[year]).forEach(semester => {
            groupedEnrolls[year][semester].forEach(enrolledCourse => {
              if (enrolledCourse.courseNo === course.courseNo) {
                courseExists = true;
              }
            });
          });
        });

        // If the course does not exist in groupedEnrolls, add it to remainingCourses
        if (!courseExists && course.recommendYear && course.recommendSemester) {
          remainingCourses.push({
            courseNo: course.courseNo,
            courseTitleEng: course.courseTitleEng,
            credit: course.credits, // Add course credits
            recommendYear: course.recommendYear,
            recommendSemester: course.recommendSemester
          });
        }
      });
    });

    // Iterate over each group in curriculumData
    curriculumData.geGroups.forEach(group => {
      // Iterate over each course in the group
      group.requiredCourses.forEach(course => {
        // Check if the course exists in groupedEnrolls
        let courseExists = false;
        Object.keys(groupedEnrolls).forEach(year => {
          Object.keys(groupedEnrolls[year]).forEach(semester => {
            groupedEnrolls[year][semester].forEach(enrolledCourse => {
              if (enrolledCourse.courseNo === course.courseNo && enrolledCourse.grade !== "F" && enrolledCourse.grade !== "W") {
                courseExists = true;
              }
            });
          });
        });

        // If the course does not exist in groupedEnrolls, add it to remainingCourses
        if (!courseExists && course.recommendYear && course.recommendSemester) {
          remainingCourses.push({
            courseNo: course.courseNo,
            courseTitleEng: course.courseTitleEng,
            credit: course.credits, // Add course credits
            recommendYear: course.recommendYear,
            recommendSemester: course.recommendSemester
          });
        }
      });
    });

    return remainingCourses;
  }


// Classify remainingCourses into their respective groups

  const remainingCourses = findRemainingCourses();

  const remainCoursesByGroup = {
    generalEducation: [],
    majorRequirements: [],
    freeElective: []
  };

  const remainGroup = {
    generalEducation: {
      "Learner Person": [],
      "Co-Creator": [],
      "Active Citizen": [],
      "Elective": []
    },
    majorRequirements: {
      "Core": [],
      "Major Required": [],
      "Major Elective": []
    },
    freeElective: []
  };

  remainingCourses.forEach(course => {
    const { groupName } = findCourseTitle(course.courseNo);
    switch (groupName) {
      case "Learner Person":
      case "Co-Creator":
      case "Active Citizen":
      case "Elective":
        remainCoursesByGroup.generalEducation.push(course);
        remainGroup.generalEducation[groupName].push(course);
        break;
      case "Core":
      case "Major Required":
      case "Major Elective":
        remainCoursesByGroup.majorRequirements.push(course);
        remainGroup.majorRequirements[groupName].push(course);
        break;
      default:
        remainCoursesByGroup.freeElective.push(course);
    }
  });

  function findMaxRemainCoursesByGroup(group: string) {
    // Create a map to track the count of courses for each year-semester combination
    const yearSemesterCount = {};

    // Iterate through the courses in the specified group
    remainCoursesByGroup[group].forEach(course => {
      const { recommendYear, recommendSemester } = course;

      if (recommendYear && recommendSemester) {
        const key = `${recommendYear}-${recommendSemester}`;
        // Initialize or increment the count for the current year-semester combination
        if (!yearSemesterCount[key]) {
          yearSemesterCount[key] = 0;
        }
        yearSemesterCount[key]++;
      }
    });

    // Find the maximum count among all year-semester combinations
    let maxCount = 0;
    Object.values(yearSemesterCount).forEach(count => {
      if (count > maxCount) {
        maxCount = count;
      }
    });

    return maxCount;
  }

  maxGeneralEducationCourses += Math.ceil(findMaxRemainCoursesByGroup("generalEducation") / 2);
  maxMajorRequirementCourses += Math.ceil(findMaxRemainCoursesByGroup("majorRequirements") / 2);
  maxFreeElectiveCourses += Math.ceil(findMaxRemainCoursesByGroup("freeElective") / 2);

  function renderRemainCourse(course: Course) {
    const { courseNo, courseTitleEng, credit } = course;
    const { groupName } = findCourseTitle(courseNo);
    let content;
    switch (groupName) {
      case "Learner Person":
        content = (
          <LearnerEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      case "Co-Creator":
        content = (
          <CoCreEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      case "Active Citizen":
        content = (
          <ActEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      case "Elective":
        content = (
          <GEElecEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      case "Core":
        content = (
          <CoreEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      case "Major Required":
        content = (
          <MajorEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      case "Major Elective":
        content = (
          <MajorEnrollBox
            courseNo={courseNo}
            courseTitleEng={truncateTitle(courseTitleEng || "")}
            courseCredit={Math.floor(credit)}
            remain={true}
          />
        );
        break;
      default:
        content = (
          <FreeEnrollBox
            courseNo={courseNo}
            courseCredit={Math.floor(credit)}
            courseTitleEng={""}
            remain={true}
          />
        );
    }
    return (
      <div
        key={courseNo}
        className="flex flex-col items-center justify-center my-1.5"
      >
        {content}
      </div>
    )
  }

  function calculateRemainingCredits(course: Course[]) {
    return course
        .filter((course: Course) => course.credit)
        .filter((course: Course) => course.credit)
        .reduce((acc: number, course: Course) => acc + course.credit, 0);
  };

  function findGERemainByGroup(name: string) {
    return remainingSubjectsForGE.find((group: { name: string; }) => group.name === name).remaining
  }

  function findMJRemainByGroup(name: string) {
    return remainingSubjectsForMajor.find((group: { name: string; }) => group.name === name).remaining
  }

  const remainLearner = findGERemainByGroup("Learner Person") - calculateRemainingCredits(remainGroup.generalEducation["Learner Person"]);
  const remainCocre = findGERemainByGroup("Co-Creator") -calculateRemainingCredits(remainGroup.generalEducation["Co-Creator"]);
  const remainAct = findGERemainByGroup("Active Citizen") -calculateRemainingCredits(remainGroup.generalEducation["Active Citizen"]);
  const remainElec = findGERemainByGroup("Elective") -calculateRemainingCredits(remainGroup.generalEducation["Elective"]);

  const remainCore = findMJRemainByGroup("Core") - calculateRemainingCredits(remainGroup.majorRequirements["Core"]);
  const remainMJreq = findMJRemainByGroup("Major Required") - calculateRemainingCredits(remainGroup.majorRequirements["Major Required"]);
  const remainMJelec = findMJRemainByGroup("Major Elective") - calculateRemainingCredits(remainGroup.majorRequirements["Major Elective"]);

  const remainFRtotal = remainingFreeElectives.remaining - calculateRemainingCredits(remainGroup.freeElective);

  // console.log(remainGroup)
  // console.log(remainLearner , remainCocre , remainAct , remainElec , remainCore , remainMJreq , remainMJelec , remainFRtotal)

  const remainGEtotal = remainingSubjectsForGE.map((group) => group.remaining).reduce((a, b) => a + b, 0) - (remainLearner + remainCocre + remainAct + remainElec)
  const remainMJtotal = remainingSubjectsForMajor.map((group) => group.remaining).reduce((a, b) => a + b, 0) - (remainCore + remainMJreq + remainMJelec)

  // console.log(remainGEtotal , remainMJtotal , remainFRtotal)

  function renderRemainTotalBox(credit: number, groupName: string) {
    let boxes = [];
    while (credit > 0) {
      let boxCredit;
      if (credit >= 3) {
        boxCredit = 3;
      } else {
        boxCredit = 1;
      }
      credit -= boxCredit;

      let box;
      switch (groupName) {
        case "Learner Person":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <LearnerEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Learner Person"}
                />
              </div>
          );
          break;
        case "Co-Creator":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <CoCreEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Co-Creator"}
                />
              </div>
          );
          break;
        case "Active Citizen":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <ActEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Active Citizen"}
                />
              </div>
          );
          break;
        case "Elective":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <GEElecEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Elective"}
                />
              </div>
          );
          break;
        case "Core":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <CoreEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Core"}
                />
              </div>
          );
          break;
        case "Major Required":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <MajorEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Major Required"}
                />
              </div>
          );
          break;
        case "Major Elective":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <MajorEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Major Elec"}
                />
              </div>
          );
          break;
        case "Free Elective":
          box = (
              <div className="flex flex-col items-center justify-center my-1.5">
                <FreeEnrollBox
                    courseCredit={boxCredit}
                    remain={true}
                    dummy={true}
                    courseTitleEng={"Free Elec"}
                />
              </div>
          );
          break;
        default:
          box = <BlankBox courseNo={""} courseTitleEng={""} courseCredit={0} />;
      }

      boxes.push(box);
    }

    return boxes;
  }

  return (
      <div className="flex flex-col items-center w-full pt-8 ml-10">
        <PlanSelection onPlanChange={setSelectedPlan} />
        <h1 className="pt-8"></h1>
        <div className="flex">
          <div className={`flex items-center bg-white rounded-[20px] py-4 pr-4 mr-4`}>
            <div className="rounded-[20px] pr-8 pt-8 pb-8 w-[30px] h-full">
              <div className="mt-[77px] ml-6">
                <div
                    style={{height: `${maxGeneralEducationCourses * heightDiv}px`}}
                    className="bg-white flex items-center pr-4 py-4 justify-center w-[30px] rounded-tl-2xl rounded-bl-2xl text-collection-1-yellow-shade-y7 text-sm shadow-[-5px_10px_10px_0px_#F2F2F2,inset_-5px_0px_5px_0px_#F2F2F2]"
                >
                  <p className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">General
                    Education</p>
                </div>
                <div
                    style={{height: `${(maxMajorRequirementCourses * heightDiv)}px`}}
                    className="bg-white flex items-center pr-4 py-4 justify-center w-[30px] rounded-tl-2xl rounded-bl-2xl text-blue-shadeb5 text-sm  shadow-[-5px_10px_10px_0px_#F2F2F2,inset_-5px_0px_5px_0px_#F2F2F2]"
                >
                  <p className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">Major Requirements</p>
                </div>
                <div
                    style={{height: `${(maxFreeElectiveCourses * heightDiv)}px`}}
                    className="bg-white flex items-center pr-4 py-4 justify-center w-[30px] rounded-tl-2xl rounded-bl-2xl text-black text-sm shadow-[-5px_10px_10px_0px_#F2F2F2,inset_-5px_0px_5px_0px_#F2F2F2]"
                >
                  <p className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">
                    {maxFreeElectiveCourses > 1 ? "Free Elective" : "Free"}
                  </p>
                </div>
                <div
                    style={{height: `${38}px`}}
                    className=" bg-blue-shadeb1 flex items-center pr-2 pl-1 justify-center w-[30px] rounded-tl-2xl rounded-bl-2xl text-blue-shadeb5 text-[12px] "
                >
                  <p>Credit</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[20px] w-[1000px] pb-12">
              <div
                  className="overflow-auto hover:overflow-x-scroll overflow-y-hidden overscroll-x-contain border border-x-[1px] border-y-0 border-solid border-gray-100 rounded-[20px]">
                <div className="flex">
                  {curriculumData &&
                      groupedEnrolls &&
                      Object.keys(groupedEnrolls).map((year) => (
                          <div key={year} className="flex-shrink-0" style={{minWidth: '25%', width: 'auto'}}>
                            <div
                                className={`bg-white rounded-tl-[20px] rounded-tr-[20px] pb-0.5 border border-solid border-b-0 border-gray-200`}>
                              <h2 className="text-center ">
                                {" "}
                                {numberToOrdinal(year)} Year
                              </h2>
                            </div>

                            <div
                                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Object.keys(groupedEnrolls[year]).length > 2 ? '3' : '2'} xl:grid-cols-${Object.keys(groupedEnrolls[year]).length > 2 ? '3' : '2'} gap-0 border border-solid border-r-1 border-y-0 border-l-1 border-gray-200`}
                            >
                              {Object.keys(groupedEnrolls[year]).map((semester) => (
                                  <div key={semester}>
                                    <p className="text-center text-[10px] text-blue-shadeb6 w-30 px-7 py-0.5 bg-blue-shadeb05 rounded-tl-2xl rounded-tr-2xl mt-0">
                                      {semester === "3" ? "Summer" : `${numberToSemester(semester)} Semester`}
                                    </p>
                                    {(() => {

                                      const coursesByGroup = {
                                        generalEducation: [],
                                        majorRequirements: [],
                                        freeElective: []
                                      };

                                      // Classify courses into their respective groups
                                      const sortedGroups = Object.keys(groupedEnrolls[year][semester]).sort((a, b) => {
                                        const groupA = findCourseTitle(groupedEnrolls[year][semester][a].courseNo).groupName;
                                        const groupB = findCourseTitle(groupedEnrolls[year][semester][b].courseNo).groupName;
                                        return groupOrder.indexOf(groupA) - groupOrder.indexOf(groupB);
                                      });

                                      let totalCredits = 0;

                                      sortedGroups.forEach((group) => {
                                        const course = groupedEnrolls[year][semester][group];
                                        const {groupName} = findCourseTitle(course.courseNo);
                                        totalCredits += Math.floor(course.credit);
                                        switch (groupName) {
                                          case "Learner Person":
                                          case "Co-Creator":
                                          case "Active Citizen":
                                          case "Elective":
                                            coursesByGroup.generalEducation.push(course);
                                            break;
                                          case "Core":
                                          case "Major Required":
                                          case "Major Elective":
                                            coursesByGroup.majorRequirements.push(course);
                                            break;
                                          default:
                                            coursesByGroup.freeElective.push(course);
                                        }
                                      });

                                      const renderCourse = (course) => {
                                        const {courseTitleEng, groupName} = findCourseTitle(course.courseNo);
                                        if (course.grade !== "F" && course.grade !== "W") {
                                          let content;
                                          switch (groupName) {
                                            case "Learner Person":
                                              content = (
                                                  <LearnerEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            case "Co-Creator":
                                              content = (
                                                  <CoCreEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            case "Active Citizen":
                                              content = (
                                                  <ActEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            case "Elective":
                                              content = (
                                                  <GEElecEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            case "Core":
                                              content = (
                                                  <CoreEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            case "Major Required":
                                              content = (
                                                  <MajorEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            case "Major Elective":
                                              content = (
                                                  <MajorEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                      courseCredit={Math.floor(course.credit)}
                                                  />
                                              );
                                              break;
                                            default:
                                              content = (
                                                  <FreeEnrollBox
                                                      courseNo={course.courseNo}
                                                      courseCredit={Math.floor(course.credit)}
                                                      courseTitleEng={""}
                                                  />
                                              );
                                          }
                                          return (
                                              <div
                                                  key={course.courseNo}
                                                  className="flex flex-col items-center justify-center my-1.5"
                                              >
                                                {content}
                                              </div>
                                          );
                                        } else {
                                          return (
                                              <div
                                                  key={course.courseNo}
                                                  className="flex flex-col items-center justify-center my-1.5"
                                              >
                                                <UncountBox
                                                    courseNo={course.courseNo}
                                                    courseTitleEng={truncateTitle(courseTitleEng || "")}
                                                    courseCredit={Math.floor(course.credit)}
                                                />
                                              </div>
                                          );
                                        }
                                      };

                                      const renderPlaceholder = (key) => (
                                          <div
                                              key={key}
                                              className="flex flex-col items-center justify-center my-1.5"
                                          >
                                            <BlankBox courseNo={""} courseTitleEng={""} courseCredit={0}/>
                                          </div>
                                      );

                                      // Render all courses grouped by category and draw lines between groups
                                      return (
                                          <>
                                            <div className="flex flex-col items-center justify-center">
                                              {coursesByGroup.generalEducation.map(renderCourse)}
                                              {remainCoursesByGroup.generalEducation.filter((course: Course) => course.recommendYear?.toString() === year && course.recommendSemester?.toString() === semester).map(renderRemainCourse)}
                                              {Array.from({length: maxGeneralEducationCourses - coursesByGroup.generalEducation.length - remainCoursesByGroup.generalEducation.filter((course: Course) => course.recommendYear?.toString() === year && course.recommendSemester?.toString() === semester).length}).map((_, index) => renderPlaceholder(`gen-placeholder-${index}`))}
                                            </div>

                                            <div
                                                className="border border-dashed w-full my-4 border-y-1 border-blue-shadeb2"></div>
                                            {/* Line between groups */}
                                            <div className="flex flex-col items-center justify-center">
                                              {coursesByGroup.majorRequirements.map(renderCourse)}
                                              {remainCoursesByGroup.majorRequirements.filter((course: Course) => course.recommendYear?.toString() === year && course.recommendSemester?.toString() === semester).map(renderRemainCourse)}
                                              {Array.from({length: maxMajorRequirementCourses - coursesByGroup.majorRequirements.length - remainCoursesByGroup.majorRequirements.filter((course: Course) => course.recommendYear?.toString() === year && course.recommendSemester?.toString() === semester).length}).map((_, index) => renderPlaceholder(`major-placeholder-${index}`))}
                                            </div>
                                            <div
                                                className="border border-dashed w-full my-4 border-y-1 border-blue-shadeb2"></div>
                                            {/* Line between groups */}
                                            <div className="flex flex-col items-center justify-center">
                                              {coursesByGroup.freeElective.map(renderCourse)}
                                              {remainCoursesByGroup.freeElective.filter((course: Course) => course.recommendYear?.toString() === year && course.recommendSemester?.toString() === semester).map(renderRemainCourse)}
                                              {Array.from({length: maxFreeElectiveCourses - coursesByGroup.freeElective.length - remainCoursesByGroup.freeElective.filter((course: Course) => course.recommendYear?.toString() === year && course.recommendSemester?.toString() === semester).length}).map((_, index) => renderPlaceholder(`free-placeholder-${index}`))}
                                            </div>
                                            <div
                                                className="flex flex-col items-center justify-center mt-4 w-full bg-blue-shadeb05 pt-1.5 pb-1.5">
                                              {totalCredits > 0 ? (
                                                  <CreditBox courseCredit={totalCredits} courseNo={""}
                                                             courseTitleEng={""}/>
                                              ) : (
                                                  <PendingCreditBox courseCredit={totalCredits} courseNo={""}
                                                                    courseTitleEng={""}/>
                                              )}
                                            </div>
                                          </>
                                      );
                                    })()}
                                  </div>
                              ))}

                            </div>
                          </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div className="static top-50 w-70 p-4 bg-white   rounded-[20px]">
            {/* Display the requiredCredits and sum of credits for each groupName */}
            <div className="mt-4">
              <h3 className="text-center my-4">หน่วยกิตสะสม</h3>

              {/* GE */}
              <div
                  className="w-auto h-12 p-1 bg-yellow-50 rounded-tl-2xl rounded-tr-2xl border border-solid border-amber-300 flex  items-center gap-8">
                <h6 className="flex flex-col col-span-1 justify-center items-center ">
                <span className="text-collection-1-yellow-shade-y7 text-sm ">
                  {groupCredits["Learner Person"] +
                      groupCredits["Co-Creator"] +
                      groupCredits["Active Citizen"] +
                      groupCredits["Elective"] >=
                      totalGeCredits && (
                          <span
                              role="img"
                              aria-label="check"
                              className="inline-block mr-2"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: "var(--collection-1-yellow-shade-y2)",
                                color: "white",
                                textAlign: "center",
                                lineHeight: "20px",
                              }}
                          >
                      ✔️
                    </span>
                      )}
                  หมวดศึกษาทั่วไป
                </span>
                  <span className="text-collection-1-yellow-shade-y7 text-xs font-medium">
                  (General Education)
                </span>
                </h6>
                <div
                    className=" px-5 bg-white rounded-lg border border-solid border-collection-1-yellow-shade-y6 justify-center items-center gap-2.5 inline-flex">
                  <div className="text-center text-collection-1-yellow-shade-y6 text-sm font-bold">
                    {`${
                        groupCredits["Learner Person"] +
                        groupCredits["Co-Creator"] +
                        groupCredits["Active Citizen"] +
                        groupCredits["Elective"]
                    } / ${totalGeCredits}`}
                  </div>
                </div>
              </div>

              <div
                  className="rounded-bl-2xl rounded-br-2xl bg-white px-4 py-1 border border-solid border-amber-300 mb-4 ">
                {[
                  ...curriculumData.geGroups,
                  // ...curriculumData.coreAndMajorGroups,
                ].map(
                    (
                        group: { groupName: any; requiredCredits: any },
                        index: React.Key | null | undefined
                    ) => (
                        <h6
                            className={`my-3 flex  text-${getColorForGroupName(
                                group.groupName
                            )} `}
                        >
                          <li key={index}>
                            {" "}
                            {`${group.groupName} :
                      
						  ${groupCredits[group.groupName] || "0"} / ${group.requiredCredits}`}
                            {groupCredits[group.groupName] ===
                                group.requiredCredits && (
                                    <span
                                        role="img"
                                        aria-label="check"
                                        className="ml-2"
                                        style={{
                                          display: "inline-block",
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor:
                                              "var(--collection-1-yellow-shade-y2)",
                                          color: "white",
                                          textAlign: "center",
                                          lineHeight: "20px",
                                        }}
                                    >
                          ✔️
                        </span>
                                )}
                          </li>
                          {" "}
                        </h6>
                    )
                )}
              </div>

              {/* Major */}
              <div
                  className="w-auto h-12 p-1 bg-collection-1-b-sl rounded-tl-2xl rounded-tr-2xl border border-solid border-blue-shadeb4 flex  items-center gap-4">
                <h6 className="flex flex-col col-span-1 justify-center items-center ">
                <span className="text-blue-shadeb5 text-sm ">
                  {totalCoreAndMajorEarnedCredits >=
                      totalCoreAndMajorRequiredCredits && (
                          <span
                              role="img"
                              aria-label="check"
                              className="inline-block mr-2"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: "#B0B8FF",
                                color: "white",
                                textAlign: "center",
                                lineHeight: "20px",
                              }}
                          >
                      ✔️
                    </span>
                      )}
                  หมวดวิชาเฉพาะ
                </span>
                  <span className="text-blue-shadeb5 text-xs font-medium">
                  (Major Requirements)
                </span>
                </h6>
                <div
                    className=" px-5 bg-white rounded-lg border border-solid border-blue-shadeb4 justify-center items-center gap-2.5 inline-flex">
                  <div className="text-center text-blue-shadeb5 text-sm font-bold">
                    {`${totalCoreAndMajorEarnedCredits} / ${totalCoreAndMajorRequiredCredits}`}
                  </div>
                </div>
              </div>
              <div
                  className="rounded-bl-2xl rounded-br-2xl bg-white px-4 py-1 border border-solid border-blue-shadeb4 text-collection-1-yellow-shade-y7 mb-4">
                {[
                  // ...curriculumData.geGroups,
                  ...curriculumData.coreAndMajorGroups,
                ].map(
                    (
                        group: { groupName: any; requiredCredits: any },
                        index: React.Key | null | undefined
                    ) => (
                        <h6
                            className={`my-3 text-${getColorForGroupName(
                                group.groupName
                            )} `}
                        >
                          <li key={index}>
                            {" "}
                            {`${group.groupName} : 
						  ${groupCredits[group.groupName] || "0"} / ${group.requiredCredits}`}
                            {groupCredits[group.groupName] >=
                                group.requiredCredits && (
                                    <span
                                        role="img"
                                        aria-label="check"
                                        className="ml-2"
                                        style={{
                                          display: "inline-block",
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor:
                                              "var(--collection-1-yellow-shade-y2)",
                                          color: "white",
                                          textAlign: "center",
                                          lineHeight: "20px",
                                        }}
                                    >
                          ✔️
                        </span>
                                )}
                          </li>
                          {" "}
                        </h6>
                    )
                )}
              </div>

              {/* FreeElec */}
              <div
                  className="w-auto h-12 p-1 bg-neutral-100 rounded-2xl border border-solid border-neutral-400 flex  items-center gap-8">
                <h6 className="flex flex-col col-span-1 justify-center items-center ">
                <span className="text-neutral-600 text-sm ">
                  {groupCredits["Free Elective"] >=
                      curriculumData.freeElectiveCredits && (
                          <span
                              role="img"
                              aria-label="check"
                              className="inline-block mr-2"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: "#C3C3C3",
                                color: "white",
                                textAlign: "center",
                                lineHeight: "20px",
                              }}
                          >
                      ✔️
                    </span>
                      )}
                  หมวดวิชาเลือกเสรี
                </span>
                  <span className="text-neutral-600 text-xs font-medium">
                  (Free Electives)
                </span>
                </h6>
                <div
                    className=" px-5 bg-white rounded-lg border border-solid border-neutral-600 flex justify-center items-center">
                  <div className="text-center text-neutral-600 text-sm font-bold ">
                    {`${groupCredits["Free Elective"] || "0"} / ${
                        curriculumData.freeElectiveCredits
                    }`}
                  </div>
                </div>
              </div>
            </div>
            {/* Display the total sum of credits */}
            <div className="mt-5">
              <h3 className="text-center">หน่วยกิตรวม</h3>
              <p className="text-center text-collection-1-black-shade-bl2 m-2 text-sm">{`คุณเรียนไปแล้ว ${totalCredits} จาก ${
                  curriculumData.requiredCredits || " "
              } หน่วยกิต`}</p>
              {/* Progress Bar */}
              <div className="relative pt-3">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                  <span
                      className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-shadeb3 bg-blue-shadeb05">
                    หน่วยกิตสะสม
                  </span>
                  </div>
                  <div className="text-right">
                    {totalCredits < curriculumData.requiredCredits && (
                        <span className="text-xs font-semibold inline-block text-blue-shadeb3">
                      {`${totalCredits} / ${curriculumData.requiredCredits}`}
                    </span>
                    )}
                    {totalCredits >= curriculumData.requiredCredits && (
                        <span className="text-xs font-semibold inline-block text-blue-shadeb3">
                      {`${curriculumData.requiredCredits} / ${curriculumData.requiredCredits}`}
                    </span>
                    )}
                  </div>
                </div>
                <div className="flex mb-14 items-center justify-start">
                  <div className="flex w-full items-center">
                    <div
                        className="w-full bg-collection-1-white-shade-w5 rounded-full h-3 border border-solid border-blue-shadeb5">
                      {totalCredits < curriculumData.requiredCredits && (
                          <div
                              className="rounded-full bg-blue-shadeb3 border border-blue-shadeb5 text-xs leading-none h-3 text-center text-white"
                              style={{
                                width: `${
                                    (totalCredits / curriculumData.requiredCredits) *
                                    100
                                }%`,
                              }}
                          ></div>
                      )}
                      {totalCredits >= curriculumData.requiredCredits && (
                          <div
                              className="rounded-full bg-blue-shadeb3 border border-blue-shadeb5 text-xs leading-none h-3 text-center text-white"
                              style={{
                                width: `${
                                    (curriculumData.requiredCredits /
                                        curriculumData.requiredCredits) *
                                    100
                                }%`,
                              }}
                          ></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(remainLearner > 0 || remainCocre > 0 || remainAct > 0 || remainElec > 0 || remainCore > 0 || remainMJreq > 0 || remainMJelec > 0 || remainFRtotal > 0) && (
              <div className="ml-4 flex flex-col bg-white rounded-[20px] p-4">
                <h2 className="flex m-2 mb-5 bg-gray-100 p-2 rounded-[20px] text-[14px]">หน่วยกิตคงเหลือ</h2>
                <div className="grid grid-rows-auto justify-center items-center">
                  {remainGEtotal > 0 && ((remainLearner + remainCocre + remainAct + remainElec) > 0) && (
                      <div
                          className={`flex flex-col bg-yellow-50 p-2 rounded-[20px] border border-solid border-amber-300 mb-4 items-center`}>
                        <p className={`text-collection-1-yellow-shade-y7 text-xs font-medium`}>General Education</p>
                        {remainLearner > 0 && (<>
                              {renderRemainTotalBox(remainLearner, "Learner Person")}
                            </>
                        )}
                        {remainCocre > 0 && (
                            <>
                              {renderRemainTotalBox(remainCocre, "Co-Creator")}
                            </>
                        )}
                        {remainAct > 0 && (
                            <>
                              {renderRemainTotalBox(remainAct, "Active Citizen")}
                            </>
                        )}
                        {remainElec > 0 && (
                            <>
                              {renderRemainTotalBox(remainElec, "Elective")}
                            </>
                        )}
                      </div>
                  )}
                  {remainMJtotal > 0 && ((remainCore + remainMJreq + remainMJelec) > 0) && (
                      <div
                          className={`flex flex-col bg-blue-shadeb05 p-2 rounded-[20px] border border-solid border-blue-shadeb4 items-center mb-4`}>
                        <p className={`text-blue-shadeb5 text-xs font-medium`}>Major Requirements</p>
                        {remainCore > 0 && (
                            <>
                              {renderRemainTotalBox(remainCore, "Core")}
                            </>
                        )}
                        {remainMJreq > 0 && (
                            <>
                              {renderRemainTotalBox(remainMJreq, "Major Required")}
                            </>
                        )}
                        {remainMJelec > 0 && (
                            <>
                              {renderRemainTotalBox(remainMJelec, "Major Elective")}
                            </>
                        )}
                      </div>
                  )}
                  {remainFRtotal > 0 && (
                      <div
                          className={`flex flex-col bg-neutral-100 p-2 rounded-[20px] border border-solid border-neutral-400 items-center mb-4`}>
                        <p className={`text-neutral-600 text-xs font-medium`}>Free Elective</p>
                        {renderRemainTotalBox(remainFRtotal, "Free Elective")}
                      </div>
                  )}
                </div>
              </div>
          )}

        </div>
        <div className="mt-10 bg-white rounded-2xl p-10 pt-6 ">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center">
              <img src="/imgs/icon_book.png" alt="" className="w-[55px] mr-3"/>
              <h1 className="pt-5">ตรวจจำนวนหน่วยกิตในแต่ละหมวดหมู่ที่คงเหลือ</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
              <span className="font-bold text-blue-shadeb5">
                หมวดวิชาเฉพาะ (Major Requirements)
              </span>

                {remainingSubjectsForMajor.map(
                    (
                        subject: {
                          color: any;
                          name: string;
                          remaining: number;
                          subjectRemaining: number;
                        },
                        index: React.Key | null | undefined
                    ) => (
                        <li
                            key={index}
                            className={`my-2 font-normal text-${subject.color} text-left`}
                        >
                          {subject.name} :{" "}
                          {subject.remaining > 0
                              ? subject.remaining + " " + "หน่วยกิต"
                              : "เรียนครบหน่วยกิต"}
                          (~
                          {subject.subjectRemaining} วิชา)
                        </li>
                    )
                )}
              </div>
              <div>
              <span className="font-bold text-collection-1-yellow-shade-y7">
                หมวดศึกษาทั่วไป (General Education)
              </span>
                {remainingSubjectsForGE.map(
                    (
                        subject: {
                          color: any;
                          name: string;
                          remaining: any;
                        },
                        index: React.Key | null | undefined
                    ) => (
                        <li
                            key={index}
                            className={`my-2 font-normal text-${subject.color} text-left`}
                        >
                          {subject.name} :{" "}
                          {subject.remaining > 0
                              ? subject.remaining + " " + "หน่วยกิต"
                              : "เรียนครบหน่วยกิต"}
                        </li>
                    )
                )}
              </div>
              {/* Free Elective */}
              <div>
              <span className="font-bold text-gray-500">
                {" "}
                {/* Adjust the color as needed */}
                หมวดวิชาเลือกเสรี (Free Elective)
              </span>
                <li className={`mt-2 font-normal text-neutral-600 text-left`}>
                  {remainingFreeElectives.name} :{" "}
                  {remainingFreeElectives.remaining > 0
                      ? remainingFreeElectives.remaining + " " + "หน่วยกิต"
                      : "เรียนครบหน่วยกิต"}
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EnrollAndCredits;
