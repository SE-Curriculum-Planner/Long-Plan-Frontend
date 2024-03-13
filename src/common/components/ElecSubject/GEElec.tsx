import React from "react";
import { GEElecBox } from "./GroupBox";
import { truncateTitle, BoxProps } from "utils/BoxUtils";

const GEElec: React.FC<BoxProps> = ({ data }) => {
	return (
		<div>
			{data.electiveCourses.map((course) => (
					<GEElecBox key={course.courseNo}
						courseNo={course.courseNo}
						courseTitleEng={truncateTitle(course.courseTitleEng)}
						courseCredit={course.credits}
					/>
			))}
		</div>
	);
};

export default GEElec;
