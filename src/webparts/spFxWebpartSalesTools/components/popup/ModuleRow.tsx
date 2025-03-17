import * as React from "react";
// import { useContext } from "react";
import ModuleComplition from "./ModuleComplition";
import ModuleTitle from "./ModuleTitle";
import ModuleScore from "./ModuleScore";


interface Module{
    Name: string,
    Score: number,
    Completed: boolean,
    StartDate: string,
    LmsModuleUrl: string,
  }

interface ModuleRowProps{
    module: Module;
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module }) => {


  return (
    <div
      className="flex items-center justify-between border-b border-b-[#f0f2f4] py-3 hover:cursor-pointer hover:bg-[#fbfcfd]"
      onClick={() => {
        window.open(module.LmsModuleUrl, "_blank", "noopener, noreferrer");
      }}
    >
      <div className="flex items-center">
        <div className="mr-5">
          <ModuleComplition
            moduleCompleted={module.Completed}
            moduleStartDate={module.StartDate}
          />
        </div>
        <ModuleTitle moduleName={module.Name} />
      </div>
      <div className="">
        <ModuleScore
          moduleScore={module.Score}
          moduleCompleted={module.Completed}
        />
      </div>
    </div>
  );
};

export default ModuleRow;
