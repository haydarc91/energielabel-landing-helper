
import React from 'react';
import { Send, CheckCircle, Home, Building, Clock, CircleDollarSign, Gauge, BarChart4 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const PricingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-epa-green/10 mb-4">
                <Building className="h-10 w-10 text-epa-green" strokeWidth={1.5} />
              </div>
              <div className="font-medium text-gray-700">Woningen tot 150m²</div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <div className="mb-4 text-center">
              <span className="text-3xl font-bold text-epa-green">€375</span>
              <span className="text-gray-500 ml-2">incl. BTW</span>
            </div>
            <ul className="space-y-2 mb-6 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Appartementen, tussenwoningen, hoekwoningen</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Toeslag: €15 per 10m² boven 150m²</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Geldig voor 10 jaar</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Geregistreerd bij RVO</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-epa-green hover:bg-epa-green-dark text-white"
          >
            <Send className="h-5 w-5" /> Direct aanvragen
          </button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-500/10 mb-4">
                <Home className="h-10 w-10 text-blue-500" strokeWidth={1.5} />
              </div>
              <div className="font-medium text-gray-700">Vrijstaande woningen</div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <div className="mb-4 text-center">
              <span className="text-3xl font-bold text-epa-green">€450</span>
              <span className="text-gray-500 ml-2">incl. BTW</span>
            </div>
            <ul className="space-y-2 mb-6 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Vrijstaande woningen tot 200m²</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Toeslag: €15 per 10m² boven 200m²</span>
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
          </div>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-epa-green hover:bg-epa-green-dark text-white"
          >
            <Send className="h-5 w-5" /> Direct aanvragen
          </button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-amber-200 h-full">
        <div className="h-48 bg-gradient-to-br from-amber-50 to-amber-100 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-amber-500/10 mb-4">
                <Clock className="h-10 w-10 text-amber-600" strokeWidth={1.5} />
              </div>
              <div className="font-medium text-gray-700">Spoedservice</div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <div className="mb-4 text-center">
              <span className="text-3xl font-bold text-amber-600">+€95</span>
              <span className="text-gray-500 ml-2">incl. BTW</span>
            </div>
            <ul className="space-y-2 mb-6 text-left">
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
          </div>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Clock className="h-5 w-5" /> Direct aanvragen
          </button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-blue-200 h-full">
        <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-500/10 mb-4">
                <Gauge className="h-10 w-10 text-blue-600" strokeWidth={1.5} />
              </div>
              <div className="font-medium text-gray-700">Label Check</div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <div className="mb-4 text-center">
              <span className="text-3xl font-bold text-blue-600">+€150</span>
              <span className="text-gray-500 ml-2">incl. BTW</span>
            </div>
            <ul className="space-y-2 mb-6 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Gratis vooraf beoordeling op afstand</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>No-cure no-pay principe</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Pas betalen bij succes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Zekerheid vooraf over haalbaarheid</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Gauge className="h-5 w-5" /> Label Check aanvragen
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCards;
