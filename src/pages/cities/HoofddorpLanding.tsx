
import React from 'react';
import CityLanding from '@/components/CityLanding';

const HoofddorpLanding = () => {
  return (
    <CityLanding
      city="Hoofddorp"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Hoofddorp is een moderne stad in de Haarlemmermeer met een gevarieerd woningaanbod, van eengezinswoningen tot moderne appartementencomplexen. Een energielabel is belangrijk voor het inzicht in de energieprestatie van deze woningen."
      neighborhoods={["Toolenburg", "Floriande"]}
      testimonial={{
        text: "EPA Woninglabel heeft perfect werk geleverd in Hoofddorp. De adviseur was deskundig en professioneel. Het energielabel werd binnen de afgesproken termijn geleverd en zag er zeer netjes uit.",
        author: "- Marcel de Wit, Hoofddorp"
      }}
    />
  );
};

export default HoofddorpLanding;
