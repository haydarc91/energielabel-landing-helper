
import React from 'react';
import CityLanding from '@/components/CityLanding';

const GoudaLanding = () => {
  return (
    <CityLanding
      city="Gouda"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Gouda combineert een historische binnenstad met karakteristieke panden en moderne woonwijken aan de rand van de stad. Voor deze diverse woningvoorraad is een energielabel belangrijk om de energieprestatie en verbetermogelijkheden in kaart te brengen."
      neighborhoods={["Kort Haarlem", "Goverwelle"]}
      testimonial={{
        text: "Zeer tevreden met de service van EPA Woninglabel in Gouda. De adviseur was vriendelijk, professioneel en nam alle tijd om mijn vragen te beantwoorden. Het energielabel werd snel en correct geleverd.",
        author: "- Karin Bakker, Gouda"
      }}
    />
  );
};

export default GoudaLanding;
