export const truncateTitle = (title: string): string => {
  return title.length > 8 ? `${title.substring(0, 8)}..` : title;
};

// Define supporting types for BoxProps
export interface Course {
  courseTitleEng: string;
  courseNo: string;
  recommendSemester: number | null;
  recommendYear: number | null;
  prerequisites: Array<string>;
  corequisite: string | null;
  credits: number;
}

export interface BoxData {
  requiredCredits: number;
  groupName: string;
  requiredCourses: Course[];
  electiveCourses: Course[];
}

export interface BoxProps {
  data: BoxData;
}

export interface BaseBoxProps {
  courseNo: string;
  courseTitleEng: string;
  courseCredit: number;
}
