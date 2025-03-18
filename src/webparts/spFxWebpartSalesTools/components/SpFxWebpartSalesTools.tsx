import * as React from 'react';
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css';
import Carousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';
import { useState, useEffect, useRef} from 'react';
// import Popup from './popup/Popup';
import fackdata from '../assets/fackData';
import CoursesBoard from './popup/CoursesBoard';






const SpFxWebpartSalesTools: React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const { trainingData, description, uniqueAdsm, uniqueRoles } = props;
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const [isPopupOpen, setPopupOpen] = useState(false);


  const popupRef = useRef<HTMLDivElement>(null);

  // פונקציה שמטפלת בלחיצה מחוץ לחלון הפופאפ
  const handleClickOutside = (event: MouseEvent) => {
    console.log("popupRef.current:", popupRef.current);
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      console.log("Clicked outside! Closing popup.");
      setPopupOpen(false);
    }
  };

  // הוספה והסרה של event listener כדי לזהות קליקים מחוץ לקומפוננטה
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
  //  const demoCourses = ["Demo 1", "Demo 2", "Demo 3", "Demo 4", "Demo 5", "Demo 6", "Demo 7", "Demo 8", "Demo 9", "Demo 10", "Demo 11", "Demo 12", "Demo 13", "Demo 14"];

  const uniqueCourses = Array.from(new Set(trainingData.data.map(item => item.course)));
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
       {isPopupOpen && (
         <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50" onClick={() => setPopupOpen(false)} >
<CoursesBoard 
ref={popupRef}
  data={fackdata} 

/></div>
       )}
      <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-semibold">{description}</h1>
      <div className="flex items-center justify-start space-x-4 p-2 max-w-full mb-8 overflow-visible">
  <Pillars selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
  <Levels selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} selectedFilter={selectedFilter} uniqueCourses={uniqueCourses} uniqueAdsm={uniqueAdsm} uniqueRoles={uniqueRoles}/>
</div>

      {/* Carousel */}
      <Carousel courses={trainingData.data} selectedLevel={selectedLevel} selectedFilter={selectedFilter} uniqueRoles={uniqueRoles} onOpenPopup={() => setPopupOpen(true)}/>
    </div>

  );
};

export default SpFxWebpartSalesTools;