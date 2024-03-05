import React, { useEffect, useState } from "react";
import FreeBox from "common/components/ElecSubject/Free";
import CoreBox from "./SubjectBox/Core";
import MajorElec from "./ElecSubject/MajorElec";
import MajorBox from "./SubjectBox/Major";

interface Course {
	courseNo: string;
	courseTitleEng: string;
	recommendSemester: number;
	recommendYear: number;
	prerequisites: string[];
	corequisite: string | null;
	credits: number;
	groupName: string;
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

const SemBox: React.FC = () => {
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

	// Separate courses based on mapped year and semester with a filter for recommendYear
	const separatedCourses: { [key: string]: Course[] } = {};
	curriculumData.coreAndMajorGroups.forEach((group) => {
		group.requiredCourses.forEach((course) => {
			// Filter only courses with recommendYear equal to 1 and recommendSemester equal to 1
			if (course.recommendYear === 1 && course.recommendSemester === 1) {
				const key = `Year ${course.recommendYear} `;
				if (!separatedCourses[key]) {
					separatedCourses[key] = [];
				}
				separatedCourses[key].push(course);
			}
		});
	});

	return (
		<div style={{ display: "flex", gap: "10px" }}>
			{/* Render components based on the new JSON structure */}
			{Object.keys(separatedCourses).map((key, index) => (
				<div key={index}>
					<h6>{`${key} |`}</h6>
					{separatedCourses[key].map((course, groupIndex) => (
						<div key={groupIndex}>
							<h6>{course.groupName}</h6>
							{curriculumData.coreAndMajorGroups
								.flatMap((group) =>
									group.requiredCourses.includes(course) ? [group] : []
								)
								.map((group, groupIndex) => (
									<div key={groupIndex}>
										<h6>{group.groupName}</h6>
										{group.groupName === "Core" && <CoreBox data={group} />}
										{group.groupName === "Major Required" && (
											<MajorBox data={group} />
										)}
										{group.groupName === "Major Elective" && (
											<MajorElec data={group} />
										)}
									</div>
								))}
						</div>
					))}
				</div>
			))}

			{/* Render other components as needed */}
			<div>
				<h6>Free Elective {curriculumData.freeElectiveCredits} credits</h6>
				<FreeBox />
			</div>
		</div>
	);
};

export default SemBox;
