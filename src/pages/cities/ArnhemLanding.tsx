
import React from 'react';
import CityLanding from '@/components/CityLanding';

const ArnhemLanding = () => {
  return (
    <CityLanding
      city="Arnhem"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Arnhem heeft een gevarieerd woningbestand, van herenhuizen in Sonsbeek tot moderne woningen in nieuwere wijken als Schuytgraaf. Voor al deze woningen is een energielabel van belang om inzicht te krijgen in de energieprestatie."
      neighborhoods={["Sonsbeek", "Schuytgraaf"]}
      testimonial={{
        text: "De EPA-adviseur was zeer grondig tijdens de opname van mijn woning in Arnhem. Hij gaf veel tips over mogelijke verbeteringen. Het energielabel was keurig op tijd binnen en zag er professioneel uit.",
        author: "- Marloes Jansen, Arnhem"
      }}
    />
  );
};

export default ArnhemLanding;
