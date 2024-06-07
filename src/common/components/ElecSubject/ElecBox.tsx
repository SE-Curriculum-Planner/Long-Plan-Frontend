import React from "react";
import { truncateTitle, BoxProps, BaseBoxProps } from "utils/BoxUtils";
import HoverableBoxComponent from "./HoverableBoxComponent"; // Adjust the import path accordingly

interface ElecBoxProps extends BoxProps {
    BoxComponent: React.FC<BaseBoxProps>;
}

const ElecBoxs: React.FC<ElecBoxProps> = ({ data, BoxComponent }) => {
    return (
        <div>
            {data.electiveCourses.map((course) => (
                <HoverableBoxComponent
                    key={course.courseNo}
                    courseNo={course.courseNo}
                    courseTitleEng={truncateTitle(course.courseTitleEng)}
                    courseFullName={course.courseTitleEng}
                    courseCredit={course.credits}
                    BoxComponent={BoxComponent}
                />
            ))}
        </div>
    );
};

export default ElecBoxs;
