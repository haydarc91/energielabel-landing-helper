
import React from 'react';
import { Phone, Mail } from 'lucide-react';

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
  // Time-based online status for WhatsApp (8:00-22:00)
  const now = new Date();
  const currentHour = now.getHours();
  const isWhatsAppOnline = currentHour >= 8 && currentHour < 22;
  
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
            033-2007617
          </p>
          <p>
            <span className="font-medium block">Openingstijden:</span>
            Maandag t/m vrijdag: 9:00 - 17:00
          </p>
          
          {/* WhatsApp button with online status - more prominent */}
          <a 
            href="https://wa.me/31332007617" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block mt-4 bg-green-50 border border-green-200 rounded-lg p-3 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-green-600">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                {isWhatsAppOnline && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 animate-pulse ring-2 ring-white"></span>
                )}
              </div>
              <div>
                <p className="font-medium text-green-700">WhatsApp {isWhatsAppOnline ? 'Online' : 'Offline'}</p>
                <p className="text-xs text-gray-500">Bereikbaar van 8:00 tot 22:00 uur</p>
              </div>
            </div>
          </a>
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
            
            <div className="border-t border-epa-green/20 pt-2 mt-2 font-medium flex justify-between">
              <span>Totaal (incl. BTW):</span>
              <span>€{calculatedPrice}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
