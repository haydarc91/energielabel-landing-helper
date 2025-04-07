
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Werkgebieden = () => {
  const cities = [
    { name: "Amersfoort", url: "/werkgebieden/amersfoort" },
    { name: "Utrecht", url: "/werkgebieden/utrecht" },
    { name: "Amsterdam", url: "/werkgebieden/amsterdam" },
    { name: "Rotterdam", url: "/werkgebieden/rotterdam" },
    { name: "Den Haag", url: "/werkgebieden/den-haag" },
    { name: "Apeldoorn", url: "/werkgebieden/apeldoorn" },
    { name: "Arnhem", url: "/werkgebieden/arnhem" },
    { name: "Nijmegen", url: "/werkgebieden/nijmegen" },
    { name: "Hilversum", url: "/werkgebieden/hilversum" },
    { name: "Zwolle", url: "/werkgebieden/zwolle" },
    { name: "Amstelveen", url: "/werkgebieden/amstelveen" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="section-padding bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Energielabel in uw regio</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Wij verlenen onze diensten in heel Nederland, met speciale focus op de regio's binnen 
                80km van Amersfoort. Bekijk hieronder onze werkgebieden.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {cities.map((city) => (
                <Link 
                  key={city.name}
                  to={city.url}
                  className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-epa-green/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-epa-green" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg">{city.name}</h3>
                      <p className="text-gray-500 text-sm">Energielabel voor woningen</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 p-6 bg-epa-green/5 rounded-xl">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Energielabel nodig in uw regio?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Wij zijn actief in heel Nederland en komen graag bij u langs voor een professionele opname
                  van uw woning. Vraag direct een offerte aan.
                </p>
                <Button 
                  size="lg"
                  className="bg-epa-green hover:bg-epa-green-dark text-white"
                  onClick={() => window.location.href = "/#contact"}
                >
                  Vraag direct aan
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Werkgebieden;
