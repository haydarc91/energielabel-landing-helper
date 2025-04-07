
import React from 'react';
import CityLanding from '@/components/CityLanding';

const HilversumLanding = () => {
  return (
    <CityLanding
      city="Hilversum"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Hilversum, bekend als mediastad, heeft een unieke woningvoorraad met veel villa's en karakteristieke jaren '30 woningen. Een energielabel geeft eigenaren van deze woningen inzicht in de energieprestatie en mogelijkheden voor verduurzaming."
      neighborhoods={["Trompenberg", "Kerkelanden"]}
      testimonial={{
        text: "Uitstekende service in Hilversum! De EPA-adviseur nam alle tijd om mijn woning goed te bekijken en legde duidelijk uit wat er allemaal in het rapport zou komen. Ik kreeg het energielabel precies op tijd zoals beloofd.",
        author: "- Sophie de Groot, Hilversum"
      }}
    />
  );
};

export default HilversumLanding;
