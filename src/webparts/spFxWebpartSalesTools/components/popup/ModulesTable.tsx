import * as React from "react";
import ModuleRow from "./ModuleRow";


interface Module{
    Name: string,
    Score: number,
    Completed: boolean,
    StartDate: string | null,
    LmsModuleUrl: string,
  }

interface ModuleTableProps{
    modules: Module[];
}

const ModuleTable: React.FC<ModuleTableProps> = ({ modules }) => {

  return (
    <div className="w-full max-h-full">
      {modules.map((e, i) => (
        <div className="" key={i}>
          <ModuleRow module={e} />
        </div>
      ))}
    </div>
  );
};

export default ModuleTable;
