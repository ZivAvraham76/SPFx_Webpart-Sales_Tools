import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import { Course } from './ISpFxWebpartSalesToolsProps';

interface CardProps {
  course: Course;
}

const Card: React.FC<CardProps> = ({ course }) => {
  return (
    <div className="h-[247px] w-[225px] rounded-lg border-2 border-[#41273c] flex flex-col overflow-hidden cursor-pointer"
    onClick={() => window.open(course.accessUrl, `_blank`)}>
      <CardHeader course={course}/>
      <CardBody course={course} />
    </div>
  );
};

export default Card;