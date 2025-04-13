
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Sitemap = () => {
  useEffect(() => {
    document.title = "Sitemap | EPA Woninglabel";
    window.scrollTo(0, 0);
  }, []);

  const mainPages = [
    { title: "Home", path: "/" },
    { title: "Werkgebieden", path: "/werkgebieden" },
    { title: "Privacybeleid", path: "/privacy-beleid" },
    { title: "Algemene Voorwaarden", path: "/algemene-voorwaarden" }
  ];

  const homeSections = [
    { title: "Voordelen", path: "/#features" },
    { title: "Werkwijze", path: "/#process" },
    { title: "Werkgebied", path: "/#service-area" },
    { title: "Over Ons", path: "/#about" },
    { title: "Testimonials", path: "/#testimonials" },
    { title: "Veelgestelde Vragen", path: "/#faq" },
    { title: "Contact & Prijzen", path: "/#contact-section" }
  ];

  const cityPages = [
    { title: "Amersfoort", path: "/werkgebieden/amersfoort" },
    { title: "Utrecht", path: "/werkgebieden/utrecht" },
    { title: "Amsterdam", path: "/werkgebieden/amsterdam" },
    { title: "Rotterdam", path: "/werkgebieden/rotterdam" },
    { title: "Den Haag", path: "/werkgebieden/den-haag" },
    { title: "Apeldoorn", path: "/werkgebieden/apeldoorn" },
    { title: "Arnhem", path: "/werkgebieden/arnhem" },
    { title: "Nijmegen", path: "/werkgebieden/nijmegen" },
    { title: "Hilversum", path: "/werkgebieden/hilversum" },
    { title: "Zwolle", path: "/werkgebieden/zwolle" },
    { title: "Amstelveen", path: "/werkgebieden/amstelveen" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hoofdpagina's</h2>
              <ul className="space-y-2">
                {mainPages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.path} className="flex items-center text-epa-green hover:underline">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Secties op Homepagina</h2>
              <ul className="space-y-2">
                {homeSections.map((section, index) => (
                  <li key={index}>
                    <Link to={section.path} className="flex items-center text-gray-700 hover:text-epa-green">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Werkgebieden</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {cityPages.map((city, index) => (
                  <li key={index}>
                    <Link to={city.path} className="flex items-center text-gray-700 hover:text-epa-green">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {city.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
