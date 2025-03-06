import * as React from 'react';

interface PillarsProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    onLevelReset: () => void; // פונקציה לאיפוס רמות
}

const Pillars: React.FC<PillarsProps> = ({ selectedFilter, onFilterChange, onLevelReset }) => {
    const filters = ['Tool', 'ADSM', 'Role'];

    const handleFilterChange = (filter: string) => {
        onFilterChange(filter);
        onLevelReset(); // כאשר הפילטר משתנה, נאפס את הרמות
    };

    return (
        <div className="flex items-center gap-2">
            <div className="h-8 text-lg flex border border-[#41273c] rounded-lg overflow-hidden divide-x divide-[#41273c]">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`px-3 py-1 text-xs font-medium transition-colors duration-200 
                            ${selectedFilter === filter ? 'bg-[#41273c] text-white' : 'bg-white text-[#41273c] hover:bg-[#896f85] hover:text-white'}`}
                        onClick={() => handleFilterChange(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pillars;
