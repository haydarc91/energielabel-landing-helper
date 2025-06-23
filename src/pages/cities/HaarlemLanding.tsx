
import React from 'react';
import CityLanding from '@/components/CityLanding';

const HaarlemLanding = () => {
  return (
    <CityLanding
      city="Haarlem"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Haarlem heeft een unieke mix van monumentale panden in de historische binnenstad en moderne woningen in nieuwere wijken zoals Schalkwijk. Voor al deze woningtypes is een professioneel energielabel van groot belang bij verkoop of verhuur."
      neighborhoods={["Schalkwijk", "Haarlem-Oost"]}
      testimonial={{
        text: "Uitstekende ervaring met EPA Woninglabel in Haarlem. De adviseur was op tijd, vriendelijk en zeer deskundig. Het energielabel werd precies op tijd geleverd zoals afgesproken. Zeker een aanrader!",
        author: "- Petra van der Berg, Haarlem"
      }}
    />
  );
};

export default HaarlemLanding;
