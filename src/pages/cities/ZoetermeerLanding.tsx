
import React from 'react';
import CityLanding from '@/components/CityLanding';

const ZoetermeerLanding = () => {
  return (
    <CityLanding
      city="Zoetermeer"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Zoetermeer heeft een gevarieerde woningvoorraad van jaren '70 woningen tot moderne nieuwbouw. Van Driemanspolder tot Oosterheem, elk stadsdeel heeft zijn eigen woningkarakteristieken. Een energielabel biedt inzicht in de energieprestatie van deze woningen."
      neighborhoods={["Driemanspolder", "Oosterheem"]}
      testimonial={{
        text: "Uitstekende ervaring met EPA Woninglabel in Zoetermeer. De adviseur was punctueel, professioneel en zeer deskundig. Het energielabel werd netjes op tijd opgeleverd en zag er professioneel uit.",
        author: "- Tom Hendriks, Zoetermeer"
      }}
    />
  );
};

export default ZoetermeerLanding;
