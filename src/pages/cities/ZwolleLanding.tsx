
import React from 'react';
import CityLanding from '@/components/CityLanding';

const ZwolleLanding = () => {
  return (
    <CityLanding
      city="Zwolle"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Zwolle combineert een historische binnenstad met moderne woonwijken zoals Stadshagen. Voor deze diverse woningvoorraad is een energielabel belangrijk om de energieprestatie inzichtelijk te maken en de waarde van de woning te optimaliseren."
      neighborhoods={["Assendorp", "Stadshagen"]}
      testimonial={{
        text: "EPA Woninglabel heeft voor mij het energielabel in Zwolle verzorgd. De adviseur was deskundig en vriendelijk. Hij legde alles goed uit en gaf ook nuttige tips om energie te besparen. Zeer tevreden!",
        author: "- Erik Smit, Zwolle"
      }}
    />
  );
};

export default ZwolleLanding;
