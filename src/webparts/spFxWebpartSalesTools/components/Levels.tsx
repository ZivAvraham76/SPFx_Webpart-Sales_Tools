import * as React from 'react';

interface LevelsProps {
    selectedLevel: string;
    onLevelChange: (level: string) => void;
    selectedFilter: string;
    courses: { course: string, adsm: string }[];
}

const Levels: React.FC<LevelsProps> = ({ selectedLevel, onLevelChange, selectedFilter, courses }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleLevelClick = (level: string) => {
        onLevelChange(level);
        setIsOpen(false);
    };

    const uniqueCourses = Array.from(new Set(courses.map(item => item.course)));
    const uniqueAdsm = Array.from(new Set(courses.map(item => item.adsm)));

    const displayOptions = selectedFilter === 'Tool' ? uniqueCourses :
                           selectedFilter === 'ADSM' ? uniqueAdsm : [];

    const getButtonLabel = () =>{
    if (selectedFilter === 'All') {
            return 'Select';
        }
    return selectedLevel === 'All' ? `Select ${selectedFilter}` : selectedLevel;
    }

    return (
        <div className="relative inline-block text-left h-full">
            <button onClick={toggleDropdown} className="w-[170px] h-8 px-2 py-1 pr-8 rounded-lg text-[#41273c] text-lg border border-[#41273c] flex items-center justify-between">
                <span className="text-[#41273c] text-xs font-medium">
                    {getButtonLabel()}
                </span>
                <svg className="absolute right-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#41273C"/>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 max-h-60 overflow-y-auto">
                    {displayOptions.map((level) => (
                        <button key={level} onClick={() => handleLevelClick(level)}
                            className={`block w-full text-left px-4 py-2 text-sm ${level === selectedLevel ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
                            {level}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Levels;
