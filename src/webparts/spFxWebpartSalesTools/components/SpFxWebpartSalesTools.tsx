import * as React from 'react';
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css'; 
import Carousel from './Carousel';
import Pillars from './Pillars';
import Levels from './Levels';
import { useState } from 'react';




const SpFxWebpartSalesTools : React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const { trainingData } = props;
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const onLevelReset = () => {
    setSelectedLevel('All'); // כל פעם שמחליפים פילטר, הרמה מתאפסת ל-All
  };



    return (
      <div className="w-full relative overflow-hidden p-4">
      <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-semibold"> Sales Tools & Processes</h1>
      <div className="flex items-center justify-start space-x-2 p-2 max-w-[400px] mb-8">
      <Pillars selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} onLevelReset={onLevelReset}/>
      <Levels selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} courses={trainingData.data} selectedFilter={selectedFilter}/>
      </div>
      {/* Carousel */}
      <Carousel courses={trainingData.data} selectedLevel={selectedLevel} selectedFilter={selectedFilter}/>
    </div>

    );
  };

  export default SpFxWebpartSalesTools;
 