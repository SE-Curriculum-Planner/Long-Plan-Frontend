import React from "react";
import {truncateTitle, BoxProps, BaseBoxProps} from "utils/BoxUtils";

interface ElecBoxProps extends BoxProps {
    BoxComponent: React.FC<BaseBoxProps>;
}

const ElecBoxs: React.FC<ElecBoxProps> = ({ data, BoxComponent }) => {
    return (
        <div>
            {data.electiveCourses.map((course) => (
                <BoxComponent
                    key={course.courseNo}
                    courseNo={course.courseNo}
                    courseTitleEng={truncateTitle(course.courseTitleEng)}
                    courseCredit={course.credits}
                />
            ))}
        </div>
    );
};

export default ElecBoxs;
