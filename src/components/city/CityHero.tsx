
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Check, ArrowRight, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CityHeroProps {
  city: string;
  image: string;
}

const CityHero = ({ city, image }: CityHeroProps) => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-epa-green flex items-center gap-1">
                <Home size={14} />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link to="/werkgebieden" className="text-sm font-medium text-gray-600 hover:text-epa-green">
                Werkgebieden
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-epa-green">{city}</span>
            </div>
            <div className="text-sm font-medium text-epa-green flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4" />
              <span>{city}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Energielabel woning aanvragen in <span className="text-epa-green">{city}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Vraag snel en eenvoudig een officieel energielabel aan voor uw woning in {city}. 
              Onze EPA-adviseurs zijn lokaal actief en kennen de woningen in {city} goed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-epa-green hover:bg-epa-green-dark text-white"
                onClick={() => {
                  const contactSection = document.getElementById('contact-section');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Direct aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-gray-300"
                onClick={() => window.location.href = "/#process"}
              >
                Bekijk werkwijze
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-epa-green" />
                <span className="text-gray-700">Binnen 3 werkdagen geregeld</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-epa-green" />
                <span className="text-gray-700">Ervaren met {city}se woningen</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-epa-green" />
                <span className="text-gray-700">Vanaf €285 inclusief BTW</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] rounded-xl overflow-hidden shadow-xl">
            <img 
              src={image}
              alt={`Energielabel woning aanvragen in ${city}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityHero;
