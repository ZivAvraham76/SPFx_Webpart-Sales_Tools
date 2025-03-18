import * as React from "react";
import { useState} from 'react';
import Header from "./Header";
import CourseDescription from "./CourseDescription";
import ModulesTable from "./ModulesTable";


interface Module{
  Name: string,
  Score: number,
  Completed: boolean,
  StartDate: string | null,
  LmsModuleUrl: string,
}

interface Course{
  Name: string;
  Complete: boolean,
  PercentageComplete: number,
  LmsCourseUrl: string,
  Description:string,
  Modules: Module[],
  isOptional?: boolean,
}

interface PopupProps {
  courseData: Course;
  data: {
    VLP_NAME: string;
    VLP_PercentageComplete: number;
    Courses: Course[];
  };
}

const Popup: React.FC<PopupProps> = ({ courseData,data }) => {

  const [isVisible, SetIsVisible] = useState(false);

  const togglCourseDetails = () => {
    SetIsVisible(!isVisible);
  };




  console.log("course data:", courseData);
  console.log("course desc:", courseData.Description);
  console.log("course data:", courseData.PercentageComplete);



  return (
    // <div className="h-screen w-full py-10">
    //   <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10">
    //   <div className="max-h-100 overflow-y-auto px-5">
    <div className="h-full w-full">
      <div
        id="headerContainer"
        className="hover:cursor-pointer"
        onClick={() => togglCourseDetails()}
      >
        <Header
          isVisible={isVisible}
          title={courseData.Name}
          coursePercentageComplete={courseData.PercentageComplete}
          lmsCourseUrl={courseData.LmsCourseUrl}
          isOptional={courseData.isOptional}
          data={data}
        />
      </div>

      {isVisible && (
        <div className="">
          <div id="courseDiscriptionContainer" className="">
            <CourseDescription courseDescription={courseData.Description} />
          </div>
          <div id="moduleTableContainer" className="">
            <ModulesTable modules={courseData.Modules} />
          </div>

        </div>
        )}

            </div>


            
            
          );
        };



export default Popup;
