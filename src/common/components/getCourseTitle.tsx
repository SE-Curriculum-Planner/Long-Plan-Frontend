import React, { useEffect, useState } from 'react';
import CoreEnrollBox from './EnrollSubject/CoreEnroll';
import MajorEnrollBox from './EnrollSubject/MajorEnroll';
import LearnerEnrollBox from './EnrollSubject/LearnerEnroll';
import ActEnrollBox from './EnrollSubject/ActEnroll';
import GEElecEnrollBox from './EnrollSubject/GEElecEnroll';
import FreeEnrollBox from './EnrollSubject/FreeEnroll';
import CoCreEnrollBox from './EnrollSubject/CoCreEnroll';
// Import other subject boxes as needed

// Function to truncate the title to the first 8 words + ... + number
const truncateTitle = (title: string): string => {
    const words = title.split('');
  
    if (words.length > 8) {
      // Find the first space after the 8th word
      const firstSpaceIndex = title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('', title.indexOf('') + 1) + 1) + 1) + 1) + 1) + 1)));
  
      if (firstSpaceIndex !== -1) {
        const truncatedTitle = title.substring(0, firstSpaceIndex);
  
        // Check if the last word is a number
        const lastWord = words[words.length - 1];
        if (!isNaN(Number(lastWord))) {
          return truncatedTitle + ` ${lastWord}`;
        }
  
        return truncatedTitle + '..';
      }
    }
  
    return title;
  };

const CourseTitleExtractor: React.FC = () => {
  const [curriculumData, setCurriculumData] = useState<any>(null);
  const [groupedEnrolls, setGroupedEnrolls] = useState<any>(null);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const response = await fetch('/src/CPE-2563-normal.json');
        const data = await response.json();
        setCurriculumData(data);
      } catch (error) {
        console.error('Error fetching curriculum data:', error);
      }
    };

    const fetchGroupedEnrolls = async () => {
      try {
        const response = await fetch('/src/640612093-grouped-enrolled.json');
        const data = await response.json();
        setGroupedEnrolls(data);
      } catch (error) {
        console.error('Error fetching grouped enrolls data:', error);
      }
    };

    fetchCurriculumData();
    fetchGroupedEnrolls();
  }, []);

  // Function to find courseTitleEng based on courseNo
  const findCourseTitle = (courseNo: string): { courseTitleEng: string | undefined, groupName: string } => {
    // Check if both curriculumData and groupedEnrolls are available
    if (curriculumData && groupedEnrolls) {
      // Iterate through the required courses in geGroups and coreAndMajorGroups
      for (const group of [...curriculumData.geGroups, ...curriculumData.coreAndMajorGroups]) {
        for (const course of group.requiredCourses) {
          if (course.courseNo === courseNo) {
            return { courseTitleEng: course.courseTitleEng, groupName: group.groupName };
          }
        }
        for (const electiveCourse of group.electiveCourses) {
          if (electiveCourse.courseNo === courseNo) {
            return { courseTitleEng: electiveCourse.courseTitleEng, groupName: group.groupName };
          }
        }
      }
    }
  
    return { courseTitleEng: undefined, groupName: "Free Elective" };
  };

  // Function to calculate the sum of credits for each groupName
  const calculateGroupCredits = (): { [groupName: string]: number } => {
    const groupCredits: { [groupName: string]: number } = {};

    // Initialize groupCredits with requiredCredits for each groupName
    curriculumData.geGroups.forEach((group: { groupName: string | number; }) => {
        groupCredits[group.groupName] = 0;
    });

    curriculumData.coreAndMajorGroups.forEach((group: { groupName: string | number; }) => {
        groupCredits[group.groupName] = 0;
    });

    // Include Free Elective in groupCredits
    groupCredits['Free Elective'] = 0;

    // Iterate through groupedEnrolls to accumulate credits
    Object.keys(groupedEnrolls).forEach((year) => {
      Object.keys(groupedEnrolls[year]).forEach((semester) => {
        groupedEnrolls[year][semester].forEach((course: any) => {
          const { groupName } = findCourseTitle(course.courseNo);
          groupCredits[groupName] += Math.floor(course.credit);
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
      totalCredits += groupCredits[groupName];
    });

    return totalCredits;
  };

  // Calculate total sum of credits
  const totalCredits = calculateTotalCredits();


  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="mt-10">กระบวนวิชาที่เรียนไปแล้ว</h1>
      <h2>ของนักศึกษารหัส 640612093</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ">
      {curriculumData &&
        groupedEnrolls &&
        Object.keys(groupedEnrolls).map((year) => (
            <div key={year} >
            <h2>Year {year}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {Object.keys(groupedEnrolls[year]).map((semester) => (
                <div key={semester} className="mb-6">
                  <h5>Semester {semester}</h5>
                {groupedEnrolls[year][semester].map((course: any) => (
                  <div key={course.courseNo}>
                        {/*{`${course.courseNo} ${findCourseTitle(course.courseNo).courseTitleEng} ${course.credit} ${findCourseTitle(course.courseNo).groupName}`} */}

                    {(() => {
                      const { courseTitleEng, groupName } = findCourseTitle(course.courseNo);

                      switch (groupName) {
                        case 'Core':
                          return (
                            <CoreEnrollBox
                              courseNo={course.courseNo}
                              courseTitleEng={truncateTitle(courseTitleEng || '')}
                              courseCredit={Math.floor(course.credit)}
                            />
                          );
                        case 'Major Required':
                          return (
                            <MajorEnrollBox
                              courseNo={course.courseNo}
                              courseTitleEng={truncateTitle(courseTitleEng || '')}
                              courseCredit={Math.floor(course.credit)}
                            />
                          );
                          case 'Major Elective':
                            return (
                              <MajorEnrollBox
                                courseNo={course.courseNo}
                                courseTitleEng={truncateTitle(courseTitleEng || '')}
                                courseCredit={Math.floor(course.credit)}
                              />
                            );
                        case 'Learner Person':
                          return (
                            <LearnerEnrollBox
                              courseNo={course.courseNo}
                              courseTitleEng={truncateTitle(courseTitleEng || '')}
                              courseCredit={Math.floor(course.credit)}
                            />
                          );
                        case 'Active Citizen':
                          return (
                            <ActEnrollBox
                              courseNo={course.courseNo}
                              courseTitleEng={truncateTitle(courseTitleEng || '')}
                              courseCredit={Math.floor(course.credit)}
                            />
                          );
                        case 'Elective':
                          return (
                            <GEElecEnrollBox
                              courseNo={course.courseNo}
                              courseTitleEng={truncateTitle(courseTitleEng || '')}
                              courseCredit={Math.floor(course.credit)}
                            />
                          );
                          case 'Free Elective':
                          return (
                            <FreeEnrollBox
                                  courseNo={course.courseNo}
                                  courseCredit={Math.floor(course.credit)} courseTitleEng={''}                            />
                          );
                          case 'Co-Creator':
                            return (
                              <CoCreEnrollBox
                              courseNo={course.courseNo}
                              courseTitleEng={truncateTitle(courseTitleEng || '')}
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
                    })()}
                  </div>
                  
                ))}
              </div>
            ))}
          </div>
          
          </div>
        ))}
    </div>

      {/* Display the requiredCredits and sum of credits for each groupName */}
      <div className="mt-10">
        <h2 className="text-center">หน่วยกิตสะสม</h2>
        <ul>
          {[...curriculumData.coreAndMajorGroups, ...curriculumData.geGroups].map((group: { groupName: any; requiredCredits: any; }, index: React.Key | null | undefined) => (
            <li key={index}>
              {`${group.groupName} : ${groupCredits[group.groupName] || '0'} / ${group.requiredCredits}  credits`}
            </li>
          ))}
          <li>
            {`Free Elective : ${groupCredits['Free Elective'] || '0'} / ${curriculumData.freeElectiveCredits} credits`  }
          </li>
        </ul>
      </div>
      {/* Display the total sum of credits */}
      <div className="mt-10">
        <h2 className="text-center">หน่วยกิตรวม</h2>
        <p>{`คุณเรียนไปแล้ว ${totalCredits} จาก ${curriculumData.requiredCredits || 'N/A'} หน่วยกิต`}</p>
      </div>
    </div>
  );
};

export default CourseTitleExtractor;
