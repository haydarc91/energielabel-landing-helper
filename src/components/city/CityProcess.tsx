
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Shield, User, Euro, MapPin } from 'lucide-react';

interface CityProcessProps {
  city: string;
}

const CityProcess = ({ city }: CityProcessProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
      {/* How It Works Card */}
      <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="text-epa-green h-5 w-5" />
            <span>Energielabel aanvragen in {city}: hoe werkt het?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Ons proces is eenvoudig en efficiënt:
          </p>
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <div className="bg-epa-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="font-medium">Aanvraag indienen</p>
                <p className="text-sm text-gray-600">Vul het contactformulier in of bel ons</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-epa-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="font-medium">Afspraak inplannen</p>
                <p className="text-sm text-gray-600">Wij nemen snel contact op voor een afspraak</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-epa-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="font-medium">Opname door EPA-adviseur</p>
                <p className="text-sm text-gray-600">De opname duurt ongeveer 45-60 minuten</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-epa-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</div>
              <div>
                <p className="font-medium">Energielabel ontvangen</p>
                <p className="text-sm text-gray-600">Binnen 3 werkdagen uw officiële label</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
      
      {/* Why Choose Us Card */}
      <Card className="bg-epa-green/5 border border-epa-green/20 shadow-md hover:shadow-lg transition-shadow h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-epa-green flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Waarom kiezen voor EPA Woninglabel in {city}?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-2 shadow-sm flex-shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-epa-green" />
              </div>
              <div>
                <p className="font-medium">Lokale expertise</p>
                <p className="text-sm text-gray-600">Specialistische kennis van {city}se woningen en hun karakteristieken</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-2 shadow-sm flex-shrink-0 mt-0.5">
                <Clock className="h-4 w-4 text-epa-green" />
              </div>
              <div>
                <p className="font-medium">Snelle service</p>
                <p className="text-sm text-gray-600">Binnen 3 werkdagen uw energielabel in huis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-2 shadow-sm flex-shrink-0 mt-0.5">
                <User className="h-4 w-4 text-epa-green" />
              </div>
              <div>
                <p className="font-medium">Persoonlijke aanpak</p>
                <p className="text-sm text-gray-600">Duidelijke communicatie en service op maat</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-2 shadow-sm flex-shrink-0 mt-0.5">
                <Euro className="h-4 w-4 text-epa-green" />
              </div>
              <div>
                <p className="font-medium">Transparante prijzen</p>
                <p className="text-sm text-gray-600">Vanaf €285 inclusief BTW, zonder verborgen kosten</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CityProcess;
