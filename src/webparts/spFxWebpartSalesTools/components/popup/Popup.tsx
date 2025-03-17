import * as React from "react";
import { useState} from 'react';
import Header from "./Header";
import CourseDescription from "./CourseDescription";
import ModulesTable from "./ModulesTable";


interface Module{
  Name: string,
  Score: number,
  Completed: boolean,
  StartDate: string,
  LmsModuleUrl: string,
}

interface Course{
  Name: string;
  Complete: boolean,
  PercentageComplete: number,
  LmsCourseUrl: string,
  Description:string,
  Modules: Module[],
  // isOptional: boolean,
}



interface PopupProps {
  courseData: Course[];
}

const CourseBoard: React.FC<PopupProps> = ({ courseData }) => {

  const [isVisible, SetIsVisible] = useState(false);

  const togglCourseDetails = () => {
    SetIsVisible(!isVisible);
  };

  console.log("courseslen:",courseData.length);




  console.log("course data:", courseData);
  console.log("course desc:", courseData[0].Description);
  console.log("course data:", courseData[0].PercentageComplete);



  return (
    <div className="h-screen w-full py-10">
      <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10">
      <div className="max-h-100 overflow-y-auto px-5">
    <div className="h-full w-full">
      <div
        id="headerContainer"
        className="hover:cursor-pointer"
        onClick={() => togglCourseDetails()}
      >
        <Header
          isVisible={isVisible}
          title={courseData[0].Name}
          coursePercentageComplete={courseData[0].PercentageComplete}
          lmsCourseUrl={courseData[0].LmsCourseUrl}
          // isOptional={courseData[0].isOptional}
          courseData={courseData}
        />
      </div>

        <div className="">
          <div id="courseDiscriptionContainer" className="">
            <CourseDescription courseDescription={courseData[0].Description} />
          </div>
          <div id="moduleTableContainer" className="">
            <ModulesTable modules={courseData[0].Modules} />
          </div>

        </div>

            </div>
            </div>
            </div>
            </div>

            
            
          );
        };



export default CourseBoard;
