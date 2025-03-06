import * as React from 'react';
import Card from './Card';

interface Course {
    id: string;
    adsm: string;
    name: string;
    originalid: number;
    levelName: string;
    completed: boolean;
    course: string;
    cid: string;
    coriginalid: number;
    accessUrl: string;
}

interface CarouselProps {
    courses: Course[];
    selectedFilter: string;
    selectedLevel: string;
}

const Carousel: React.FC<CarouselProps> = ({ courses, selectedFilter, selectedLevel }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const filteredCourses = courses.filter((course) => {
        // אם נבחר פילטר 'Tool'
        if (selectedFilter === 'Tool') {
            // אם נבחרה רמה מסוימת, סנן לפי רמה
            if (selectedLevel === 'All' || course.course === selectedLevel) {
                return true;
            }
        }
    
        // אם נבחר פילטר 'ADSM'
        if (selectedFilter === 'ADSM' && course.adsm!=='') {
            // אם נבחרה רמה מסוימת, סנן לפי רמה
            if (selectedLevel === 'All' || course.adsm === selectedLevel) {
                return true;
            }
        }
    
        // אם לא נבחר פילטר (כלומר פילטר 'All')
        if (selectedFilter === 'All') {
            return true; // הצג את כל הקורסים
        }
    
        return false; // אחרת אל תציג שום קורס
    });

    console.log('Filtered Courses:', filteredCourses);

    React.useEffect(() => {
        setCurrentIndex(0);
    }, [filteredCourses.length]);
    const [left, setLeft] = React.useState(false);
    const [right, setRight] = React.useState(false);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCourses.length);
    };
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + filteredCourses.length) % filteredCourses.length
        );
    };
 
    React.useEffect(() => {
        if (currentIndex > filteredCourses.length - 4) {
            setRight(true);
        }
        else {
            setRight(false);
        }
    }, [currentIndex, filteredCourses]);
    React.useEffect(() => {
        if (currentIndex === 0) {
            setLeft(true);
        }
        else {
            setLeft(false);
        }
    }, [currentIndex, filteredCourses]);

    return (
<div className='relative w-full mx-auto overflow-hidden'>
            <div
                className="flex transition-transform duration-500 ease-in-out gap-[25px]"
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
                {filteredCourses.map((course, index) => (
                    <div className={`relative w-1/4 flex-shrink-0 ${index === currentIndex ? 'active' : ''}`}>
                        <Card data={course} selectedFilter={selectedFilter}/>
                    </div>
                ))}
            </div>
            {!right && (
                <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100" onClick={handleNext}>
                    <svg
                        className="h-4 w-4 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 9l4-4-4-4"
                        />
                    </svg></button>
            )}
            {!left && (<button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100" onClick={handlePrev}>
                <svg
                    className="h-4 w-4 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 9L1 5l4-4"
                    />
                </svg></button>)}
        </div>
    );
};

export default Carousel;
