
import React from 'react';

interface ContactInfoProps {
  calculatedPrice: number | null;
  formData: {
    propertyType: string;
    rushService: boolean;
  };
  addressDetails: {
    surfaceArea: number;
  } | null;
}

const ContactInfo = ({ calculatedPrice, formData, addressDetails }: ContactInfoProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="glass-card rounded-xl p-6 md:p-8 sticky top-24">
        <h3 className="text-xl font-semibold mb-4">Contact informatie</h3>
        
        <div className="space-y-4 text-gray-600 mb-6">
          <p>
            <span className="font-medium block">Email:</span>
            info@epawoninglabel.nl
          </p>
          <p>
            <span className="font-medium block">Telefoon:</span>
            020 - 123 4567
          </p>
          <p>
            <span className="font-medium block">Openingstijden:</span>
            Maandag t/m vrijdag: 9:00 - 17:00
          </p>
        </div>
        
        <div className="mt-auto">
          <h4 className="font-medium mb-3 text-lg">Werkgebied</h4>
          <p className="text-gray-600">
            Wij zijn actief in een straal van 80km rondom Amersfoort, inclusief steden als Utrecht, Amsterdam en Apeldoorn.
          </p>
        </div>
        
        {calculatedPrice && (
          <div className="mt-6 p-4 bg-epa-green/10 rounded-lg border border-epa-green/20">
            <h4 className="font-medium text-epa-green-dark">All-in tarief</h4>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Basistarief:</span>
                <span>€{
                  formData.propertyType === 'detached' || formData.propertyType === 'semi-detached' ? 
                  '350' : '285'
                }</span>
              </div>
              
              {addressDetails && addressDetails.surfaceArea > 200 && 
               (formData.propertyType === 'detached' || formData.propertyType === 'semi-detached') && (
                <div className="flex justify-between">
                  <span>Toeslag grote woning:</span>
                  <span>€{Math.ceil((addressDetails.surfaceArea - 200) / 25) * 50}</span>
                </div>
              )}
              
              {formData.rushService && (
                <div className="flex justify-between">
                  <span>Spoedservice:</span>
                  <span>+€95</span>
                </div>
              )}
              
              <div className="border-t border-epa-green/20 pt-2 font-medium flex justify-between">
                <span>Totaal (incl. BTW):</span>
                <span>€{calculatedPrice}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
