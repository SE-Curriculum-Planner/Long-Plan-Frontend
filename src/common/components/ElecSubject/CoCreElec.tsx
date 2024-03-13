import React from "react";
import { CoCreElecBox } from "./GroupBox";
import { truncateTitle, BoxProps } from "utils/BoxUtils";

const CoCreElec: React.FC<BoxProps> = ({ data }) => {
	return (
		<div>
			{data.electiveCourses.map((course) => (
					<CoCreElecBox key={course.courseNo}
						courseNo={course.courseNo}
						courseTitleEng={truncateTitle(course.courseTitleEng)}
						courseCredit={course.credits}
					/>
			))}
		</div>
	);
};

export default CoCreElec;
