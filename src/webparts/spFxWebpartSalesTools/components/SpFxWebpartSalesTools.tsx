import * as React from 'react';
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css';
import Carousel from './Carousel';
import Filters from './Filters';
import DropDownProducts from './DropDownProducts';
import { useState, useEffect } from 'react';

const SpFxWebpartSalesTools: React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const { trainingData, description, uniqueAdsm, uniqueRoles } = props;
  // console.log('trainingData', trainingData);
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [userId, setUserId] = useState<string | null>(null);

  // Get unique courses from the training data
  const uniqueCourses = Array.from(new Set(trainingData.modules.map((item: { course: string }) => item.course)));

  // Function to reset the selected product to all 
  const onProductReset = (): void => {
    setSelectedProduct('All');
  };

    // Handle user ID storage and retrieval
    useEffect(() => {
      // Try to get userId from localStorage
      const storedUserId = localStorage.getItem('lmsUserId');
      
      if (storedUserId) {
        setUserId(storedUserId);
        console.log("Retrieved userId from localStorage:", storedUserId);
      } else {
        // If we have a userId in the training data, store it
        if (trainingData.userId) {
          console.log(userId);
          localStorage.setItem('lmsUserId', trainingData.userId);
          setUserId(trainingData.userId);
          console.log("Stored userId in localStorage:", trainingData.userId);
        }
      }
    }, [trainingData]);

  return (
    <div className="w-[960px] mx-auto relative overflow-visible m-8">

      {/* description */}
      <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-Poppins font-semibold">{description}</h1>

      {/* filters and products controls */}
      <div className="flex items-center justify-start space-x-4 max-w-full mb-8 overflow-visible">
        <Filters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} onProductReset={onProductReset} />
        <DropDownProducts selectedProduct={selectedProduct} onProductChange={setSelectedProduct} selectedFilter={selectedFilter} uniqueCourses={uniqueCourses} uniqueAdsm={uniqueAdsm} uniqueRoles={uniqueRoles} />
      </div>

      {/* Carousel displaying the courses */}
      <div id="carousel" className="flex gap-4 overflow-visible scrollbar-hide scroll-smooth"
        style={{ scrollSnapType: 'x mandatory', width: '100%', display: 'flex', flexWrap: 'nowrap' }}>
      <Carousel courses={trainingData.modules} selectedProduct={selectedProduct} selectedFilter={selectedFilter} uniqueRoles={uniqueRoles} />
      </div>
    </div>

  );
};

export default SpFxWebpartSalesTools;