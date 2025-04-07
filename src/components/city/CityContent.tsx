
import React from 'react';
import CityInfo from './CityInfo';
import CityProcess from './CityProcess';

interface CityContentProps {
  city: string;
  description: string;
  specialFeature?: string;
  neighborhoods?: string[];
}

const CityContent = ({ city, description, specialFeature, neighborhoods }: CityContentProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Energielabel in {city}</h2>
        <CityInfo 
          city={city} 
          description={description} 
          specialFeature={specialFeature}
          neighborhoods={neighborhoods} 
        />
        <CityProcess city={city} />
      </div>
    </section>
  );
};

export default CityContent;
