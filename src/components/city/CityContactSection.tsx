
import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

interface CityContactSectionProps {
  city: string;
  calculatedPrice: number | null;
  setCalculatedPrice: React.Dispatch<React.SetStateAction<number | null>>;
  addressDetails: any;
  setAddressDetails: React.Dispatch<React.SetStateAction<any>>;
  formData: {
    propertyType: string;
    rushService: boolean;
  };
  id?: string; // Added id property as optional
}

const CityContactSection = ({ 
  city, 
  calculatedPrice, 
  setCalculatedPrice, 
  addressDetails, 
  setAddressDetails,
  formData,
  id
}: CityContactSectionProps) => {
  return (
    <section id={id} className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vraag direct een energielabel aan in {city}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vul het formulier in om een energielabel aan te vragen voor uw woning in {city}. 
            Wij nemen zo spoedig mogelijk contact met u op.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ContactForm 
              calculatedPrice={calculatedPrice} 
              setCalculatedPrice={setCalculatedPrice}
              addressDetails={addressDetails}
              setAddressDetails={setAddressDetails}
              prefillCity={city}
            />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo 
              calculatedPrice={calculatedPrice}
              formData={formData}
              addressDetails={addressDetails}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityContactSection;
