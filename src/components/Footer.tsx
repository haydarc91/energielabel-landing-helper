
import React from 'react';
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationLink from './ui/navigation-link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const phoneNumber = '085-250 2302';
  const whatsappNumber = '31852502302'; // Without spaces or dashes for WhatsApp link
  
  // Force scroll to top for werkgebieden link
  const handlePageNavigation = () => {
    // Use setTimeout to ensure this runs after the navigation occurs
    setTimeout(() => {
      window.scrollTo(0, 0);
      console.log("Force scroll to top after navigation");
    }, 0);
  };

  return (
    <footer className="bg-gray-50 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-left">epawoninglabel.nl</h3>
            <p className="text-gray-600 mb-4 text-left">
              Professionele en betrouwbare energielabels voor woningen in heel Nederland.
            </p>
            <p className="text-gray-500 text-sm text-left">
              EPA-gecertificeerd en geregistreerd bij RVO.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-left">Diensten</h3>
            <ul className="space-y-2 text-gray-600 text-left">
              <li>
                <NavigationLink to="/#contact-section" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Energielabel voor woningen
                </NavigationLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-left">Informatie</h3>
            <ul className="space-y-2 text-gray-600 text-left">
              <li>
                <NavigationLink to="#features" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Voordelen
                </NavigationLink>
              </li>
              <li>
                <NavigationLink to="#process" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Werkwijze
                </NavigationLink>
              </li>
              <li>
                <NavigationLink to="#faq" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Veelgestelde vragen
                </NavigationLink>
              </li>
              <li>
                <NavigationLink to="#contact-section" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Contact
                </NavigationLink>
              </li>
              <li>
                {/* Use direct window.location to ensure page refresh and proper scroll behavior */}
                <a
                  href="/werkgebieden"
                  className="hover:text-epa-green flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Werkgebieden clicked in footer - using direct navigation");
                    window.location.href = "/werkgebieden";
                  }}
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Werkgebieden
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-epa-green flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-left">Contact</h3>
            <address className="not-italic text-gray-600 space-y-2 text-left">
              <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" />Waterscheerling 93, 3824 GB Amersfoort</p>
              <p className="flex items-center"><Phone className="h-4 w-4 mr-2" />{phoneNumber}</p>
              <p className="flex items-center"><Mail className="h-4 w-4 mr-2" />info@epawoninglabel.nl</p>
              <p className="flex items-center"><Clock className="h-4 w-4 mr-2" />Ma-vr: 9:00 - 17:00</p>
              
              {/* WhatsApp link with updated number */}
              <a 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center mt-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <div className="relative mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-green-500">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                </div>
                <span>{phoneNumber}</span>
              </a>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} epawoninglabel.nl - Alle rechten voorbehouden
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="/privacy-beleid" 
                className="text-gray-500 hover:text-epa-green text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Privacy policy link clicked - using direct navigation");
                  window.location.href = "/privacy-beleid";
                }}
              >
                Privacybeleid
              </a>
              <a 
                href="/algemene-voorwaarden" 
                className="text-gray-500 hover:text-epa-green text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Terms link clicked - using direct navigation");
                  window.location.href = "/algemene-voorwaarden";
                }}
              >
                Algemene voorwaarden
              </a>
              <a 
                href="/sitemap" 
                className="text-gray-500 hover:text-epa-green text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Sitemap link clicked - using direct navigation");
                  window.location.href = "/sitemap";
                }}
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
