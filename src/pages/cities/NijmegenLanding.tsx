
import React from 'react';
import CityLanding from '@/components/CityLanding';

const NijmegenLanding = () => {
  return (
    <CityLanding
      city="Nijmegen"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Nijmegen, de oudste stad van Nederland, heeft een divers woningaanbod van historische panden in het centrum tot nieuwbouwwijken zoals Waalsprong. Een energielabel is een waardevolle indicator voor de duurzaamheid van deze woningen."
      neighborhoods={["Benedenstad", "Waalsprong"]}
      testimonial={{
        text: "Ik was zeer tevreden met de service van EPA Woninglabel in Nijmegen. Ze waren flexibel met het maken van een afspraak en het energielabel werd snel geleverd, precies zoals beloofd.",
        author: "- Bas Willems, Nijmegen"
      }}
    />
  );
};

export default NijmegenLanding;
