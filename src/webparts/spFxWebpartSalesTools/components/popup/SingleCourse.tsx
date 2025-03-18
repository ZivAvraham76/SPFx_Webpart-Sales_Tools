import * as React from "react";
import CourseDescription from "./CourseDescription";
import ArrowUpRightFromSquare from "./svg/ArrowUpRightFromSquare";
import ModulesTable from "./ModulesTable"
import VlpTitle from "./VlpTitle";
import VlpProgress from "./VlpProgress";

interface Module {
    Name: string;
    Score: number;
    Completed: boolean;
    StartDate: string | null;
    LmsModuleUrl: string;
  }
  
  interface Course {
    Name: string;
    Complete: boolean;
    PercentageComplete: number;
    LmsCourseUrl: string;
    Description: string;
    Modules: Module[];
    isOptional?: boolean,
  }

interface SingleCourseProps {
    courseData: Course;
  }
  
  
const SingleCourse: React.FC<SingleCourseProps> = ({courseData}) => {

  return (
    <div className="h-full w-full">
      <div
        id="headerContainer"
        className="mb-8 flex w-full items-center justify-between py-2"
      >
        <div className="tablet:w-6/12 flex items-center">
          <VlpTitle title={courseData.Name} />
          {courseData.LmsCourseUrl && (
            <div className="ml-2.5">
              <ArrowUpRightFromSquare
                lmsCourseUrl={courseData.LmsCourseUrl}
                size={5}
              />
            </div>
          )}
        </div>

        <VlpProgress coursePercentageComplete={courseData.PercentageComplete} />
      </div>

      <div className="">
        <div id="courseDiscriptionContainer" className="">
          <CourseDescription courseDescription={courseData.Description} />
        </div>
        <div id="moduleTableContainer" className="">
          <ModulesTable modules={courseData.Modules} />
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
