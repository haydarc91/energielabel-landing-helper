
import React from 'react';
import CityLanding from '@/components/CityLanding';

const ZaanstadLanding = () => {
  return (
    <CityLanding
      city="Zaanstad"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Zaanstad bestaat uit diverse kernen met elk hun eigen woningkarakter, van karakteristieke Zaanse huizen tot moderne appartementencomplexen in Zaandam. Een energielabel biedt inzicht in de energieprestatie van deze diverse woningvoorraad."
      neighborhoods={["Zaandam-Centrum", "Assendelft"]}
      testimonial={{
        text: "Zeer tevreden met de service van EPA Woninglabel in Zaanstad. De adviseur was professioneel en nam alle tijd om mijn vragen te beantwoorden. Het energielabel werd snel en correct opgeleverd.",
        author: "- Rob Keizer, Zaanstad"
      }}
    />
  );
};

export default ZaanstadLanding;
