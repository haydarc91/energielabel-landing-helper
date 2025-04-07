
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Check } from 'lucide-react';

interface CityInfoProps {
  city: string;
  description: string;
  specialFeature?: string;
  neighborhoods?: string[];
}

const CityInfo = ({ city, description, specialFeature, neighborhoods = [] }: CityInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* City Description Card */}
      <Card className="border-t-4 border-t-epa-green shadow-md hover:shadow-lg transition-shadow h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-epa-green">Over {city}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>
          
          {specialFeature && (
            <div className="mt-4 p-4 bg-epa-green/5 rounded-md border border-epa-green/10">
              <p className="font-medium text-epa-green-dark">{specialFeature}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Local Expertise Card */}
      <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building className="text-epa-green h-5 w-5" />
            <span>Lokale expertise voor {city}se woningen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">
            Onze gecertificeerde EPA-adviseurs kennen de typische woningen in {city} door en door
            {neighborhoods.length > 0 && (
              <>, van de oudere woningen in {neighborhoods[0]} tot de nieuwere woningen in {neighborhoods[1]}</>
            )}. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            Deze lokale kennis helpt ons om snel en accuraat:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
              <span>Een nauwkeurige energieprestatie te berekenen</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
              <span>Passend advies te geven voor verduurzaming</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
              <span>De waarde van uw woning te optimaliseren</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CityInfo;
