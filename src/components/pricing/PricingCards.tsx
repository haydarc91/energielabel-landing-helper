
import React from 'react';
import { Send, CheckCircle, Home, Building, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const PricingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="h-48 overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
            alt="Standaard woning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              <span className="font-medium">Woningen tot 150m²</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-4">
            <span className="text-3xl font-bold text-epa-green">€285</span>
            <span className="text-gray-500 ml-2">incl. BTW</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Appartementen, tussenwoningen, hoekwoningen</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Geldig voor 10 jaar</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Geregistreerd bij RVO</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Professionele EPA-adviseur</span>
            </li>
          </ul>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-epa-green hover:bg-epa-green-dark text-white"
          >
            <Send className="h-5 w-5" /> Direct aanvragen
          </button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="h-48 overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
            alt="Vrijstaande woning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span className="font-medium">Vrijstaande woningen</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-4">
            <span className="text-3xl font-bold text-epa-green">€350</span>
            <span className="text-gray-500 ml-2">incl. BTW</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Vrijstaande woningen tot 200m²</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>€50 toeslag per extra 25m²</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Geregistreerd bij RVO</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
              <span>Professionele EPA-adviseur</span>
            </li>
          </ul>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-epa-green hover:bg-epa-green-dark text-white"
          >
            <Send className="h-5 w-5" /> Direct aanvragen
          </button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-amber-200">
        <div className="h-48 overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1609921141835-710b7290f500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
            alt="Spoedservice energielabel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">Spoedservice</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-4">
            <span className="text-3xl font-bold text-amber-600">+€95</span>
            <span className="text-gray-500 ml-2">incl. BTW</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Binnen 24 uur een opname en energielabel</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Zelfde kwaliteit en geldigheid</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Voorrang op reguliere aanvragen</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Toeslag bovenop standaard tarief</span>
            </li>
          </ul>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Clock className="h-5 w-5" /> Direct aanvragen
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCards;
