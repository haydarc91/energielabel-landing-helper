
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CityHero from './city/CityHero';
import CityContent from './city/CityContent';
import CityTestimonial from './city/CityTestimonial';
import CityContactSection from './city/CityContactSection';

interface CityLandingProps {
  city: string;
  image: string;
  description: string;
  specialFeature?: string;
  neighborhoods?: string[];
  testimonial?: {
    text: string;
    author: string;
  };
}

const CityLanding = ({ 
  city, 
  image, 
  description, 
  specialFeature, 
  neighborhoods = [],
  testimonial
}: CityLandingProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const [formData, setFormData] = useState({
    propertyType: 'apartment',
    rushService: false
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <CityHero city={city} image={image} />
        
        <CityContent 
          city={city} 
          description={description} 
          specialFeature={specialFeature} 
          neighborhoods={neighborhoods} 
        />
        
        {testimonial && <CityTestimonial testimonial={testimonial} />}

        <CityContactSection 
          city={city}
          calculatedPrice={calculatedPrice}
          setCalculatedPrice={setCalculatedPrice}
          addressDetails={addressDetails}
          setAddressDetails={setAddressDetails}
          formData={formData}
          id="contact-section"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default CityLanding;
