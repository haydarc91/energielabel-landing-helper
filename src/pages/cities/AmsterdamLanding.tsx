
import React from 'react';
import CityLanding from '@/components/CityLanding';

const AmsterdamLanding = () => {
  return (
    <CityLanding
      city="Amsterdam"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Amsterdam kent een zeer gevarieerde woningvoorraad, van historische grachtenpanden tot moderne appartementen. Het energielabel is voor veel Amsterdamse woningeigenaren een belangrijk instrument bij verkoop of verhuur en geeft inzicht in de energieprestatie van de woning."
      neighborhoods={["De Pijp", "IJburg"]}
      testimonial={{
        text: "Zeer tevreden met de service! De adviseur was op tijd, vriendelijk en professioneel. Het energielabel werd snel geleverd, wat erg prettig was omdat ik mijn woning in Amsterdam snel wilde verkopen.",
        author: "- Emma Bakker, Amsterdam"
      }}
    />
  );
};

export default AmsterdamLanding;
