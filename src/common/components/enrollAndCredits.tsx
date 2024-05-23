import React, { useState } from "react";
import CoreEnrollBox from "./EnrollSubject/CoreEnroll";
import MajorEnrollBox from "./EnrollSubject/MajorEnroll";
import LearnerEnrollBox from "./EnrollSubject/LearnerEnroll";
import ActEnrollBox from "./EnrollSubject/ActEnroll";
import GEElecEnrollBox from "./EnrollSubject/GEElecEnroll";
import FreeEnrollBox from "./EnrollSubject/FreeEnroll";
import CoCreEnrollBox from "./EnrollSubject/CoCreEnroll";
import { truncateTitle } from "utils/BoxUtils";
import UncountBox from "./EnrollSubject/UncountBox";
import { coreApi } from "core/connections";
import { useQuery } from "react-query";
import useGlobalStore from "common/contexts/StoreContext";

type CurriculumPayload = {
  major: string;
  year: string;
  plan: string;
};

function getCurriculum({ major, year, plan }: CurriculumPayload) {
  return new Promise<any>((resolve, reject) => {
    coreApi
      .get(`/curriculum?major=${major}&year=${year}&plan=${plan}`)
      .then((res: { data: any }) => resolve(res.data))
      .catch(reject);
  });
}

function getEnrolledCourses({ studentID }: { studentID: string }) {
  return new Promise<any>((resolve, reject) => {
    coreApi
      .get(`/student/enrolledcourses?studentID=${studentID}`)
      .then((res: { data: any }) => resolve(res.data))
      .catch(reject);
  });
}

export const EnrollAndCredits: React.FC = () => {
  const { userData } = useGlobalStore();
  const [groupedEnrolls, setGroupedEnrolls] = useState<any>(null);
  const [curriculumData, setCurriculumData] = useState<any>(null);

  useQuery("curriculum", fetchData, {
    onSuccess: async (data: { enrollData: any; curriculumData: any }) => {
      if (data) {
        setGroupedEnrolls(data.enrollData);
        setCurriculumData(data.curriculumData);
      }
    },
  });

  async function fetchData() {
    if (userData) {
      const [curriculumData, enrollData] = await Promise.all([
        getCurriculum({ major: "CPE", year: "2563", plan: "normal" }),
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
      (group: { groupName: string; requiredCredits: number }) => {
        // Assuming groupCredits is an object where keys are group names and values are the credits completed
        const creditsCompleted = groupCredits[group.groupName] || 0; // Default to 0 if not found
        let creditsRemaining = group.requiredCredits - creditsCompleted;
        if (creditsRemaining <= 0) creditsRemaining = 0;

        // You need to return an object directly without the braces, or use parentheses to wrap the object
        return {
          name: group.groupName,
          remaining: creditsRemaining,
          color: getColorForGroupName(group.groupName), // Ensure getColorForGroupName is defined
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

  return (
    <div className="flex flex-col items-center  min-h-screen w-screen pt-8 ">
      <h1 className="pt-0"></h1>
      {/* <div className="pb-2">
        <label htmlFor="studentID" className="mr-2">
          รหัสนักศึกษา:
        </label>
        <input
          type="text"
          id="studentID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        />
      </div> */}
      <div className="flex">
        <div className="bg-white  rounded-[20px] p-8 mr-4 ml-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-col-4 gap-0">
            {curriculumData &&
              groupedEnrolls &&
              Object.keys(groupedEnrolls).map((year) => (
                <div key={year}>
                  <h2 className="text-center bg-white shadow rounded-[10px] p-0">
                    {" "}
                    Year {year}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-col-4 gap-0 border border-dashed border-r-1 border-y-0 border-l-0 border-gray-200">
                    {Object.keys(groupedEnrolls[year]).map((semester) => (
                      <div key={semester} className="mb-6">
                        <p className="text-center text-xs text-blue-shadeb6 w-30 px-7 py-0.5 bg-blue-shadeb05 rounded-tl-2xl rounded-tr-2xl mt-0">
                          {" "}
                          Semester {semester}
                        </p>
                        {groupedEnrolls[year][semester].map((course: any) => (
                          <div
                            key={course.courseNo}
                            className="flex items-center justify-center mb-5"
                          >
                            {/* {`${course.courseNo} ${
								  findCourseTitle(course.courseNo).courseTitleEng
								} ${course.credit} ${
								  findCourseTitle(course.courseNo).groupName
								}`} */}

                            {(() => {
                              const { courseTitleEng, groupName } =
                                findCourseTitle(course.courseNo);
                              if (course.grade !== "F" && course.grade !== "W")
                                switch (groupName) {
                                    // First group: prioritized cases
                                  case "Learner Person":
                                    return (
                                        <LearnerEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                  case "Co-Creator":
                                    return (
                                        <CoCreEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                  case "Active Citizen":
                                    return (
                                        <ActEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                  case "Free Elective":
                                    return (
                                        <FreeEnrollBox
                                            courseNo={course.courseNo}
                                            courseCredit={Math.floor(course.credit)}
                                            courseTitleEng={""}
                                        />
                                    );
                                  case "Elective":
                                    return (
                                        <GEElecEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                    // Second group: remaining cases
                                  case "Core":
                                    return (
                                        <CoreEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                  case "Major Required":
                                    return (
                                        <MajorEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                  case "Major Elective":
                                    return (
                                        <MajorEnrollBox
                                            courseNo={course.courseNo}
                                            courseTitleEng={truncateTitle(courseTitleEng || "")}
                                            courseCredit={Math.floor(course.credit)}
                                        />
                                    );
                                  // Add other cases for different group names and components as needed
                                  default:
                                    return (
                                      <div>
                                        {/* Render a default component or handle other cases */}
                                      </div>
                                    );
                                }
                              else
                                return (
                                  <UncountBox
                                    courseNo={course.courseNo}
                                    courseTitleEng={truncateTitle(
                                      courseTitleEng || ""
                                    )}
                                    courseCredit={Math.floor(course.credit)}
                                  />
                                );
                            })()}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}{" "}
          </div>
          <div className="text-[#ef95a1] text-right text-sm ">
            {" "}
            *วิชาที่ไม่อยู่ในหลักสูตรปี 2563 รวมถึงวิชาเปิดใหม่
            จะถูกนับเป็นวิชาเลือกเสรี (Free Electives){" "}
          </div>
        </div>
        <div className="static top-50 w-70 p-4 bg-white   rounded-[20px]">
          {/* Display the requiredCredits and sum of credits for each groupName */}
          <div className="mt-4">
            <h3 className="text-center my-4">หน่วยกิตสะสม</h3>

            {/* GE */}
            <div className="w-auto h-12 p-1 bg-yellow-50 rounded-tl-2xl rounded-tr-2xl border border-solid border-amber-300 flex  items-center gap-8">
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
              <div className=" px-5 bg-white rounded-lg border border-solid border-collection-1-yellow-shade-y6 justify-center items-center gap-2.5 inline-flex">
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

            <div className="rounded-bl-2xl rounded-br-2xl bg-white px-4 py-1 border border-solid border-amber-300 mb-4 ">
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
                    </li>{" "}
                  </h6>
                )
              )}
            </div>

            {/* Major */}
            <div className="w-auto h-12 p-1 bg-collection-1-b-sl rounded-tl-2xl rounded-tr-2xl border border-solid border-blue-shadeb4 flex  items-center gap-4">
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
              <div className=" px-5 bg-white rounded-lg border border-solid border-blue-shadeb4 justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-blue-shadeb5 text-sm font-bold">
                  {`${totalCoreAndMajorEarnedCredits} / ${totalCoreAndMajorRequiredCredits}`}
                </div>
              </div>
            </div>
            <div className="rounded-bl-2xl rounded-br-2xl bg-white px-4 py-1 border border-solid border-blue-shadeb4 text-collection-1-yellow-shade-y7 mb-4">
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
                    </li>{" "}
                  </h6>
                )
              )}
            </div>

            {/* FreeElec */}
            <div className="w-auto h-12 p-1 bg-neutral-100 rounded-2xl border border-solid border-neutral-400 flex  items-center gap-8">
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
              <div className=" px-5 bg-white rounded-lg border border-solid border-neutral-600 flex justify-center items-center">
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
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-shadeb3 bg-blue-shadeb05">
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
                  <div className="w-full bg-collection-1-white-shade-w5 rounded-full h-3 border border-solid border-blue-shadeb5">
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
      </div>
      <div className="mt-10 bg-white rounded-2xl p-10 pt-6 ">
        <div className="text-center">
          <div className="mb-6 flex items-center justify-center">
            <img src="/imgs/icon_book.png" alt="" className="w-[55px] mr-3" />
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
                    className={`my-2 font-normal text-${subject.color}`}
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
                    className={`my-2 font-normal text-${subject.color}`}
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
              <li className={`mt-2 font-normal text-neutral-600`}>
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
