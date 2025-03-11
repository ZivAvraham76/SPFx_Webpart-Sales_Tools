import * as React from 'react';
import Card from './Card';

interface Course {
    id: string;
    adsm: string;
    name: string;
    role: string;
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
    uniqueRoles: string[];
}

const Carousel: React.FC<CarouselProps> = ({ courses, selectedFilter, selectedLevel, uniqueRoles }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);


    // Filter courses based on selectedFilter and selectedLevel
    const filteredCourses = courses.filter((course) => {
        // if selectedFilter is 'Tool'
        if (selectedFilter === 'Tool') {
            // filter by course tool
            if (selectedLevel === 'All' || course.course === selectedLevel) {
                return true;
            }
        }

        // if selectedFilter is 'adsm'
        if (selectedFilter === 'ADSM' && course.adsm !== '') {
            // filter by course adsm
            if (selectedLevel === 'All' || course.adsm.includes(selectedLevel)) {
                return true;
            }
        }

        if (selectedFilter === 'Role' && course.adsm !== '') {
            if (selectedLevel === 'All') {
                return true;
            }

            // בדוק אם selectedLevel נמצא ב-uniqueRoles
            const roleIndex = uniqueRoles.indexOf(selectedLevel);
        
            // אם selectedLevel נמצא ב-uniqueRoles (i.e., הוא אינדקס חוקי)
            if (roleIndex !== -1 && course.adsm.includes((roleIndex+1).toString())) {
                return true;
            }
        }

        return false; // otherwise, don't display the course
    });

    console.log('Filtered Courses:', filteredCourses);
    console.log('Selected Filter:', selectedFilter);
    console.log('Selected Level:', selectedLevel);

    React.useEffect(() => {
        setCurrentIndex(0);
    }, [filteredCourses.length]);
    const [left, setLeft] = React.useState(false);
    const [right, setRight] = React.useState(false);
    const handleNext = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCourses.length);
    };
    const handlePrev = (): void => {
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
                className="flex transition-transform duration-500 ease-in-out gap-[45px]"
                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
{filteredCourses.map((course, index) => (
    <div key={index} className={`relative w-1/4 flex-shrink-0`}>
        <Card data={course} selectedFilter={selectedFilter} selectedLevel={selectedLevel}/>
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