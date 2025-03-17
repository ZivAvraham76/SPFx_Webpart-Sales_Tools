import * as React from "react";
import ArrowUpRightFromSquare from "./svg/ArrowUpRightFromSquare";
import OptionalLabel from "./OptionalLabel";

interface CourseTitleProps {
  title?: string;
  lmsCourseUrl?: string;
  isVisible: boolean;
  isOptional?: boolean;
  courseData: any[];
}

const CourseTitle: React.FC<CourseTitleProps> = ({ title,
    lmsCourseUrl,
    isVisible,
    isOptional, courseData
}) => {

    const style = isVisible
    ? "transition-all duration-300 rotate-90"
    : "transition-all duration-300";
  return (
    <div className="tablet:w-9/12 flex items-center py-2">
      <div className={`${style} `}>
        {/* <CaretRight color="#607d8a" size={16} /> */}
      </div>
      <div className="mx-4">
        <h1 className="tablet:text-sm widescreen:text-lg text-left font-Poppins font-bold text-[#797b7b]">
          {title}
        </h1>
      </div>
      {lmsCourseUrl && (
        <div className="">
          <ArrowUpRightFromSquare lmsCourseUrl={lmsCourseUrl} />
        </div>
      )}
      {isOptional && <OptionalLabel courseData={courseData}/>}
    </div>
  );
};

export default CourseTitle;
