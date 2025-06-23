
import React from 'react';
import CityLanding from '@/components/CityLanding';

const AlmereLanding = () => {
  return (
    <CityLanding
      city="Almere"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Almere is een jonge stad met moderne woningbouw en innovatieve architectuur. Van eengezinswoningen in Almere Stad tot duurzame nieuwbouw in Almere Poort. Een energielabel geeft inzicht in de energieprestatie van deze moderne woningvoorraad."
      neighborhoods={["Almere Stad", "Almere Poort"]}
      testimonial={{
        text: "Zeer professionele service van EPA Woninglabel in Almere! De adviseur was op tijd, vriendelijk en nam alle tijd voor een grondige opname. Het energielabel werd snel geleverd zoals beloofd.",
        author: "- Jennifer van Dijk, Almere"
      }}
    />
  );
};

export default AlmereLanding;
