import * as React from "react";
import CourseTitle from "./CourseTitle";
import Progress from "./Progress";

interface HeaderProps {
  isVisible: boolean;
  title?: string;
  coursePercentageComplete?: number;
  lmsCourseUrl?: string;
  isOptional?: boolean;
  courseData: any[];
}

const Header: React.FC<HeaderProps> = ({ isVisible,
    title,
    coursePercentageComplete,
    lmsCourseUrl,
    isOptional, courseData}) => {

  return (
<div className="mb-1 flex w-full items-center justify-between rounded-xl bg-[#eff2f3] p-2">
      <CourseTitle
        title={title}
        lmsCourseUrl={lmsCourseUrl}
        isVisible={isVisible}
        isOptional={isOptional}
        courseData={courseData}
      />
      <Progress coursePercentageComplete={coursePercentageComplete ?? 0} />
    </div>
  );
};

export default Header;
