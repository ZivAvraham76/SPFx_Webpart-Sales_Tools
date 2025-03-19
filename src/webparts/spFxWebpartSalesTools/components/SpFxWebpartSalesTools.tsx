import * as React from 'react';
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css';
import Carousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';
import { useState, useEffect, useRef } from 'react';
import fackdata from '../assets/fackData';
import CoursesBoard from './popup/CoursesBoard';


const SpFxWebpartSalesTools: React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const { trainingData, description, uniqueAdsm, uniqueRoles } = props;
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const [isPopupOpen, setPopupOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null); // Create a reference for the popup to detect outside clicks

  // Handle click outside of the popup to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setPopupOpen(false);
    }
  };

  // Effect to add/remove the event listener based on the popup state
  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  // Get unique courses from the training data
  const uniqueCourses = Array.from(new Set(trainingData.data.map(item => item.course)));
  // const uniqueAdsm = ['Prospect', 'Qualify', 'Validate', 'Prove', 'Proposal', 'Agreement', 'Closed Won', 'Closed Lost'];
  // const uniqueRoles = ['Account Manager', 'Channel Manager', 'Security Engineer', 'SDR', 'Renewal'];

  // Function to get the default level based on the selected filter
  // const getDefaultLevel = (filter: string): string => {
  //   if (filter === 'Tool') {
  //     return 'All';
  //   } else if (filter === 'ADSM') {
  //     return 'Prospect';
  //   } else if (filter === 'Role') {
  //     return 'Account Manager';
  //   }
  //   return 'All'; // Default fallback
  // };

  // Reset selected level when filter changes
  // useEffect(() => {
  //   setSelectedLevel(getDefaultLevel(selectedFilter));
  // }, [selectedFilter]);

  const onLevelReset = () => {
    setSelectedLevel('All'); // כל פעם שמחליפים פילטר, הרמה מתאפסת ל-All
  };

  return (
    <div className="w-full relative overflow-hidden p-4">

      {/* Popup showing the CoursesBoard component */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50" onClick={() => setPopupOpen(false)} >
          <CoursesBoard
            ref={popupRef} // Attach the popupRef to the CoursesBoard component
            data={fackdata}
          /></div>
      )}

      {/* description */}
      <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-Poppins font-semibold">{description}</h1>

      {/* Pillars and Levels controls */}
      <div className="flex items-center justify-start space-x-4 p-2 max-w-full mb-8 overflow-visible">
        <Pillars selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} onLevelReset={onLevelReset}/>
        <Levels selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} selectedFilter={selectedFilter} uniqueCourses={uniqueCourses} uniqueAdsm={uniqueAdsm} uniqueRoles={uniqueRoles} />
      </div>

       {/* Carousel displaying the courses */}
      <Carousel courses={trainingData.data} selectedLevel={selectedLevel} selectedFilter={selectedFilter} uniqueRoles={uniqueRoles} onOpenPopup={() => setPopupOpen(true)} />
    </div>

  );
};

export default SpFxWebpartSalesTools;