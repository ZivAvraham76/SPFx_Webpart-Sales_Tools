import * as React from 'react';
import type { ISpFxWebpartSalesToolsProps } from './ISpFxWebpartSalesToolsProps';
import '../../../../assets/dist/tailwind.css';
import '../../../../assets/dist/tailwind.css';
import Carousel from './Carousel';
import Filters from './Filters';
import DropDownProducts from './DropDownProducts';
import { useState } from 'react';

const SpFxWebpartSalesTools: React.FC<ISpFxWebpartSalesToolsProps> = (props) => {
  const { trainingData, description, uniqueAdsm, uniqueRoles } = props;
  const [selectedFilter, setSelectedFilter] = useState('Tool');
  const [selectedProduct, setSelectedProduct] = useState('All');

  // Get unique courses from the training data
  const uniqueCourses = Array.from(new Set(trainingData.data.map(item => item.course)));

  // Function to reset the selected product to all 
  const onProductReset = (): void => {
    setSelectedProduct('All');
  };

  return (
    <div className="w-full max-w-[1217px] mx-auto relative overflow-hidden">

      {/* description */}
      <h1 className="text-[#ee0c5d] text-[22px] mb-8 font-Poppins font-semibold">{description}</h1>

      {/* filters and products controls */}
      <div className="flex items-center justify-start space-x-4 p-2 max-w-full mb-8 overflow-visible">
        <Filters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} onProductReset={onProductReset} />
        <DropDownProducts selectedProduct={selectedProduct} onProductChange={setSelectedProduct} selectedFilter={selectedFilter} uniqueCourses={uniqueCourses} uniqueAdsm={uniqueAdsm} uniqueRoles={uniqueRoles} />
      </div>

      {/* Carousel displaying the courses */}
      <Carousel courses={trainingData.data} selectedProduct={selectedProduct} selectedFilter={selectedFilter} uniqueRoles={uniqueRoles} />
    </div>

  );
};

export default SpFxWebpartSalesTools;