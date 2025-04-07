
import React from 'react';
import CityLanding from '@/components/CityLanding';

const RotterdamLanding = () => {
  return (
    <CityLanding
      city="Rotterdam"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Rotterdam heeft een unieke woningvoorraad met veel naoorlogse bouw en moderne architectuur. Voor deze woningen is een goed energielabel van grote waarde, zowel voor het comfort als voor de waarde van de woning bij verkoop of verhuur."
      neighborhoods={["Kralingen", "Nesselande"]}
      testimonial={{
        text: "EPA Woninglabel heeft voor mij het energielabel in Rotterdam verzorgd. De afspraak was binnen een week gemaakt, de opname was grondig en het label was binnen drie dagen in mijn bezit. Zeer aan te bevelen!",
        author: "- Tim Jansen, Rotterdam"
      }}
    />
  );
};

export default RotterdamLanding;
