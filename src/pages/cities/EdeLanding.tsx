
import React from 'react';
import CityLanding from '@/components/CityLanding';

const EdeLanding = () => {
  return (
    <CityLanding
      city="Ede"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Ede, gelegen in het hart van de Veluwe, heeft een diverse woningvoorraad van karakteristieke jaren '30 woningen tot moderne nieuwbouwwijken. Voor deze woningen is een energielabel belangrijk om inzicht te krijgen in de energieprestatie en duurzaamheidsmogelijkheden."
      neighborhoods={["Kernhem", "Veldhuizen"]}
      testimonial={{
        text: "EPA Woninglabel heeft uitstekend werk geleverd voor mijn woning in Ede. De adviseur was punctueel, deskundig en nam uitgebreid de tijd om alles te controleren. Het energielabel werd snel geleverd zoals beloofd.",
        author: "- Jan Vermeulen, Ede"
      }}
    />
  );
};

export default EdeLanding;
