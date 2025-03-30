
import React, { useState, useRef } from 'react';
import { useIntersectionAnimation } from '@/lib/animations';
import PricingCards from './PricingCards';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

const PricingSection = () => {
  const [addressDetails, setAddressDetails] = useState<Address | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  return (
    <section 
      id="contact" 
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
      }}
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Onze vaste tarieven</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Transparante prijzen zonder verrassingen. Direct uw energielabel aanvragen zonder offerte.
          </p>
        </div>

        <PricingCards />

        <div id="contactForm" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm 
              calculatedPrice={calculatedPrice}
              setCalculatedPrice={setCalculatedPrice}
              addressDetails={addressDetails}
              setAddressDetails={setAddressDetails}
            />
          </div>

          <ContactInfo 
            calculatedPrice={calculatedPrice}
            formData={{
              propertyType: addressDetails ? 'detached' : 'apartment', // Default value
              rushService: false // Default value
            }}
            addressDetails={addressDetails}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
