import * as React from 'react';

interface PillarsProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    onLevelReset: () => void;
}

const Pillars: React.FC<PillarsProps> = ({ selectedFilter, onFilterChange, onLevelReset}) => {
    const filters = ['Tool', 'ADSM', 'Role'];

    const handleFilterChange = (filter: string) : void => {
        onFilterChange(filter);
        onLevelReset();
    };

    return (
        <div className="flex items-center gap-2">
            <div className="text-[#41273c] text-sm font-semibold">Search By</div>
            <div className="h-8 text-xs flex border border-[#41273c] rounded-full overflow-hidden divide-x divide-[#41273c]">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`px-3 py-1 font-medium font-Poppins transition-colors duration-200 
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
