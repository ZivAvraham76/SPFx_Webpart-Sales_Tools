import * as React from "react";
import DoneSvgIcon from "./svg/DoneSvgIcon";
import InprogressSvgIcon from "./svg/InprogressSvgIcon";
import StartSvgIcon from "./svg/StartSvgIcon";

interface ModuleComplitionProps{
    moduleCompleted: boolean,
    moduleStartDate: string,
}

const ModuleComplition: React.FC<ModuleComplitionProps> = ({ moduleCompleted, moduleStartDate }) => {


  return (
    <div className="">
    <div className="">
      {moduleCompleted ? (
        <DoneSvgIcon />
      ) : moduleStartDate ? (
        <InprogressSvgIcon />
      ) : (
        <StartSvgIcon />
      )}
    </div>
  </div>
  );
};

export default ModuleComplition;
