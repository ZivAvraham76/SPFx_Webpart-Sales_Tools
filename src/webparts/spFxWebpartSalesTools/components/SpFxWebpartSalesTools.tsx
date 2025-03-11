import * as React from 'react';
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css';
import Carousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';
import { useState, useEffect } from 'react';

const SpFxWebpartSalesTools: React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const { trainingData, description, uniqueAdsm, uniqueRoles } = props;
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const uniqueCourses = Array.from(new Set(trainingData.data.map(item => item.course)));
  console.log("toolssss:", uniqueCourses);
  // const uniqueAdsm = ['Prospect', 'Qualify', 'Validate', 'Prove', 'Proposal', 'Agreement', 'Closed Won', 'Closed Lost'];
  // const uniqueRoles = ['Account Manager', 'Channel Manager', 'Security Engineer', 'SDR', 'Renewal'];
  
  // Function to get the default level based on the selected filter
  const getDefaultLevel = (filter: string): string => {
    if (filter === 'Tool') {
      return 'All';
    } else if (filter === 'ADSM') {
      return 'Prospect';
    } else if (filter === 'Role') {
      return 'Account Manager';
    }
    return 'All'; // Default fallback
  };
  // Reset selected level when filter changes
  useEffect(() => {
    setSelectedLevel(getDefaultLevel(selectedFilter));
  }, [selectedFilter]);

  return (
    <div className="w-full relative overflow-hidden p-4">
      <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-semibold">{description}</h1>
      <div className="flex items-center justify-start space-x-4 p-2 max-w-full mb-8 overflow-visible">
  <Pillars selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
  <Levels selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} selectedFilter={selectedFilter} uniqueCourses={uniqueCourses} uniqueAdsm={uniqueAdsm} uniqueRoles={uniqueRoles}/>
</div>

      {/* Carousel */}
      <Carousel courses={trainingData.data} selectedLevel={selectedLevel} selectedFilter={selectedFilter} uniqueRoles={uniqueRoles}/>
    </div>

  );
};

export default SpFxWebpartSalesTools;