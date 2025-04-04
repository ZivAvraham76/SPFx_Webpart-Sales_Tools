import * as React from "react";
import '../../../../assets/dist/tailwind.css';

interface CardHeaderProps {
    course: string;

}

const CardHeader: React.FC<CardHeaderProps> = ({ course }) => {
    // Display the header text based on the selected filter
    return (
        <div className="relative w-full h-[121px]">
            {/* Course Image */}
            <img className="h-full w-full" src="https://picsum.photos/160" alt="Course" />

            {/* Level Badge */}
            <div className="absolute top-2 left-2 w-[150px] h-[40px] flex items-center justify-center">
                <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M149 1H1V38H149L143.653 22L149 1Z" fill="white" stroke="#F1F1F1" />
                </svg>

                {/* Display the header text based on the selected filter */}
                <div className="absolute inset-0 flex items-center text-[11px] text-[#41273c] font-bold text-left px-4">
                    {course}
                </div>
            </div>
        </div>
    );
};

export default CardHeader;
