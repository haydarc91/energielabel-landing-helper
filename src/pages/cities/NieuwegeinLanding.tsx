
import React from 'react';
import CityLanding from '@/components/CityLanding';

const NieuwegeinLanding = () => {
  return (
    <CityLanding
      city="Nieuwegein"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Nieuwegein is een moderne stad met voornamelijk woningen uit de jaren '70 en '80, aangevuld met nieuwere ontwikkelingen. Voor deze woningvoorraad is een energielabel essentieel om de energieprestatie en verbetermogelijkheden in kaart te brengen."
      neighborhoods={["Batau-Noord", "Jutphaas"]}
      testimonial={{
        text: "Geweldige service in Nieuwegein! De EPA-adviseur was punctueel, vriendelijk en zeer kundig. Hij nam uitgebreid de tijd voor de opname en leverde het energielabel binnen de afgesproken tijd.",
        author: "- Sandra Mulder, Nieuwegein"
      }}
    />
  );
};

export default NieuwegeinLanding;
