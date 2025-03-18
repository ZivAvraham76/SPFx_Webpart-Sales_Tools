import * as React from "react";
import SingleCourse from "./SingleCourse";
import VlpHeader from "./VlpHeader";
import Popup from "./Popup"

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
    isOptional?: boolean;

  }
  
  interface CourseBoardProps {
    data: {
      VLP_NAME: string;
      VLP_PercentageComplete: number;
      Courses: Course[];
    };
  }
  

const CoursesBoard: React.FC<CourseBoardProps> = ({ data }) => {
const courses = data.Courses;
console.log("courseslen:",courses.length);
  const VLP_PercentageComplete = data.VLP_PercentageComplete;
  const VLP_NAME = data.VLP_NAME;

  return (
    <div className="h-screen w-full py-10">
      <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10 overflow-hidden">
        <div className="max-h-full overflow-y-auto px-5">
          {courses?.length === 1 ? (
            <SingleCourse courseData={courses[0]} />
          ) : (
            <div>
              <VlpHeader
                title={VLP_NAME}
                coursePercentageComplete={VLP_PercentageComplete}
              />
              {courses?.map((e: any, i: number) => {
                return <Popup key={i} courseData={e} data={data} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesBoard;
