
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">epawoninglabel.nl</h3>
            <p className="text-gray-600 mb-4">
              Professionele en betrouwbare energielabels voor woningen in heel Nederland.
            </p>
            <p className="text-gray-500 text-sm">
              EPA-gecertificeerd en geregistreerd bij RVO.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Diensten</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Energielabel voor woningen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Energieadvies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Maatwerkrapport
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Duurzaamheidsadvies
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Informatie</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#features" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Voordelen
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Werkwijze
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Veelgestelde vragen
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p>Energielaan 123</p>
              <p>1234 AB Amsterdam</p>
              <p>020 - 123 4567</p>
              <p>info@epawoninglabel.nl</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} epawoninglabel.nl - Alle rechten voorbehouden
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-epa-green text-sm">Privacybeleid</a>
              <a href="#" className="text-gray-500 hover:text-epa-green text-sm">Algemene voorwaarden</a>
              <a href="#" className="text-gray-500 hover:text-epa-green text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
