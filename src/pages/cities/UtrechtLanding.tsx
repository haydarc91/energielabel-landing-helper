
import React from 'react';
import CityLanding from '@/components/CityLanding';

const UtrechtLanding = () => {
  return (
    <CityLanding
      city="Utrecht"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Utrecht is een stad met een diverse woningvoorraad, van monumentale panden in de binnenstad tot moderne nieuwbouwwijken aan de rand van de stad. Het verduurzamen van deze woningen is een belangrijke stap in de energietransitie en een energielabel geeft inzicht in de energieprestatie van uw woning."
      neighborhoods={["Lombok", "Leidsche Rijn"]}
      testimonial={{
        text: "Zeer professionele service! De EPA-adviseur nam uitgebreid de tijd om alles in mijn woning in Utrecht te bekijken en gaf nuttige adviezen over verdere verduurzaming. Het energielabel werd netjes op tijd geleverd.",
        author: "- Joost de Vries, Utrecht"
      }}
    />
  );
};

export default UtrechtLanding;
