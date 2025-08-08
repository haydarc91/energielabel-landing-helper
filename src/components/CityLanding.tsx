
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CityHero from './city/CityHero';
import CityContent from './city/CityContent';
import CityTestimonial from './city/CityTestimonial';
import CityContactSection from './city/CityContactSection';
import Seo from '@/components/Seo';
import CityNearbyLinks from './city/CityNearbyLinks';

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
        <Seo
          title={`Energielabel woning aanvragen ${city} | Officieel & Snel`}
          description={`Vraag een officieel energielabel aan voor uw woning in ${city}. Binnen 3 werkdagen geregeld door EPA-gecertificeerde adviseurs. Vast tarief vanaf €285.`}
          jsonLd={[
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
                { '@type': 'ListItem', position: 2, name: 'Werkgebieden', item: `${window.location.origin}/werkgebieden` },
                { '@type': 'ListItem', position: 3, name: `Energielabel ${city}`, item: window.location.href },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `Energielabel woning aanvragen ${city}`,
              areaServed: { '@type': 'City', name: city },
              provider: { '@type': 'Organization', name: 'EPA Woninglabel', url: window.location.origin },
            },
          ]}
        />
        <CityHero city={city} image={image} />
        <CityContent 
          city={city} 
          description={description} 
          specialFeature={specialFeature} 
          neighborhoods={neighborhoods} 
        />
        {testimonial && <CityTestimonial testimonial={testimonial} />}
        <CityNearbyLinks city={city} />
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
