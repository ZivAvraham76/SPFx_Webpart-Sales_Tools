import * as React from "react";

interface OptionalLabelProps{
    courseData: any[];
}

const OptionalLabel: React.FC<OptionalLabelProps> = ({ courseData }) => {

  return (
    <div className="tablet:text-[10px] widescreen:text-xs ml-4 rounded-xl border-2 bg-blue-200 px-2 py-1 align-middle font-bold text-blue-900">
      <h1>Optional</h1>
    </div>
  );
};

export default OptionalLabel;
