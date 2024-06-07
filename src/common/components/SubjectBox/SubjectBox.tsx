import React from "react";
import {truncateTitle, BoxProps, BaseBoxProps} from "utils/BoxUtils";
import HoverableBoxComponent from "../ElecSubject/HoverableBoxComponent.tsx";

interface SubjectBoxProps extends BoxProps {
    BoxComponent: React.FC<BaseBoxProps>;
}

const SubjectBoxs: React.FC<SubjectBoxProps> = ({data, BoxComponent}) => {
    return (
        <>
            {data.requiredCourses.map((course) => (
                <HoverableBoxComponent
                    key={course.courseNo}
                    courseNo={course.courseNo}
                    courseTitleEng={truncateTitle(course.courseTitleEng)}
                    courseFullName={course.courseTitleEng}
                    courseCredit={course.credits}
                    BoxComponent={BoxComponent}
                />
            ))}
        </>
    );
};

export default SubjectBoxs;
