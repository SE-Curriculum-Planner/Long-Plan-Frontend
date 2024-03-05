import React from "react";
import { LearnerElecBox } from "./GroupBox";
import { BoxProps, truncateTitle } from "utils/BoxUtils";

const LearnerElec: React.FC<BoxProps> = ({ data }) => {
	return (
		<div>
			{data.electiveCourses.map((course) => (
				<div key={course.courseNo} className="mb-4">
					<LearnerElecBox
						courseNo={course.courseNo}
						courseTitleEng={truncateTitle(course.courseTitleEng)}
						courseCredit={course.credits}
					/>
				</div>
			))}
		</div>
	);
};

export default LearnerElec;
