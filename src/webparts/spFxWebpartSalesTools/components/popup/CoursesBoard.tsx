import * as React from "react";
import SingleCourse from "./SingleCourse";
import VlpHeader from "./VlpHeader";

interface Module {
    Name: string;
    Score: number;
    Completed: boolean;
    StartDate: string;
    LmsModuleUrl: string;
  }
  
  interface Course {
    Name: string;
    Complete: boolean;
    PercentageComplete: number;
    LmsCourseUrl: string;
    Description: string;
    Modules: Module[];
  }
  
  interface CourseBoardProps {
    courseData: {
      VLP_NAME: string;
      VLP_PercentageComplete: number;
      Courses: Course[];
    };
  }
  

const CourseBoard: React.FC<CourseBoardProps> = ({ courseData }) => {
const courses = courseData.Courses;
console.log("courseslen:",courses.length);
  const VLP_PercentageComplete = courseData.VLP_PercentageComplete;
  const VLP_NAME = courseData.VLP_NAME;

  return (
    <div className="h-screen w-full py-10">
      <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10">
        <div className="max-h-100 overflow-y-auto px-5">
          {courses?.length === 1 ? (
            <SingleCourse courseData={courses[0]} />
          ) : (
            <div>
              <VlpHeader
                title={VLP_NAME}
                coursePercentageComplete={VLP_PercentageComplete}
              />
              {courses?.map((e: any, i: number) => {
                return <CourseBoard key={i} courseData={e} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBoard;
