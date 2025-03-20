import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";

interface CardProps {
  data: {
    id: string;
    adsm: string;
    name: string;
    originalid: number;
    levelName: string;
    completed: boolean;
    course: string;
    cid: string;
    coriginalid: number,
    accessUrl: string;
  };
  selectedFilter: string;
  selectedLevel: string;
  onOpenPopup: () => void;
}

const Card: React.FC<CardProps> = ({ data, selectedFilter, selectedLevel, onOpenPopup }) => {
  return (
    <div className="h-[238px] w-[244px] rounded-lg border-2 border-[#41273c] flex flex-col overflow-hidden">
      <CardHeader course={data.course} adsm={data.adsm} selectedFilter={selectedFilter} selectedLevel={selectedLevel} />
      <CardBody name={data.name} accessUrl={data.accessUrl} onOpenPopup={onOpenPopup} />
    </div>
  );
};

export default Card;