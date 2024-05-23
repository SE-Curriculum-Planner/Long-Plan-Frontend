import React from "react";
import {truncateTitle, BoxProps, BaseBoxProps} from "utils/BoxUtils";

interface SubjectBoxProps extends BoxProps {
    BoxComponent: React.FC<BaseBoxProps>;
}

const SubjectBoxs: React.FC<SubjectBoxProps> = ({data, BoxComponent}) => {
    return (
        <div>
            {data.requiredCourses.map((course) => (
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

export default SubjectBoxs;
