
import React from 'react';
import CityLanding from '@/components/CityLanding';

const AmsteveenLanding = () => {
  return (
    <CityLanding
      city="Amstelveen"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Amstelveen heeft een gevarieerd woningaanbod, van naoorlogse woningen tot moderne appartementen. Een energielabel geeft woningeigenaren in Amstelveen inzicht in de energieprestatie van hun woning en mogelijkheden voor verduurzaming."
      neighborhoods={["Elsrijk", "Westwijk"]}
      testimonial={{
        text: "Zeer professionele service in Amstelveen. De adviseur was op tijd, vriendelijk en grondig. Het energielabel werd binnen drie dagen digitaal geleverd, waardoor ik snel verder kon met de verkoop van mijn woning.",
        author: "- Annemieke van Dijk, Amstelveen"
      }}
    />
  );
};

export default AmsteveenLanding;
