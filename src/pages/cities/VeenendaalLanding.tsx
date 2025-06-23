
import React from 'react';
import CityLanding from '@/components/CityLanding';

const VeenendaalLanding = () => {
  return (
    <CityLanding
      city="Veenendaal"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Veenendaal heeft een gevarieerd woningaanbod van oudere woningen in het centrum tot moderne nieuwbouwwijken. Voor deze woningen is een energielabel essentieel om inzicht te krijgen in de energieprestatie en mogelijkheden voor verduurzaming."
      neighborhoods={["De Rondeel", "Dragonder"]}
      testimonial={{
        text: "EPA Woninglabel heeft uitstekend werk geleverd in Veenendaal. De adviseur was punctueel, deskundig en zeer vriendelijk. Het energielabel werd binnen de afgesproken tijd geleverd en zag er professioneel uit.",
        author: "- Paul Verhoef, Veenendaal"
      }}
    />
  );
};

export default VeenendaalLanding;
