
import React from 'react';
import CityLanding from '@/components/CityLanding';

const ApeldoornLanding = () => {
  return (
    <CityLanding
      city="Apeldoorn"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Apeldoorn is een groene stad met veel verschillende type woningen, van vrijstaande huizen in bosrijke gebieden tot rijtjeshuizen in de wijken. Een energielabel biedt Apeldoornse woningeigenaren inzicht in de energieprestatie van hun woning."
      neighborhoods={["De Maten", "Zuidbroek"]}
      testimonial={{
        text: "Goede ervaring met EPA Woninglabel in Apeldoorn. De adviseur was punctueel en professioneel. Het energielabel werd binnen de toegezegde tijd geleverd, waardoor ik snel verder kon met de verkoop van mijn woning.",
        author: "- Peter Verhoeven, Apeldoorn"
      }}
    />
  );
};

export default ApeldoornLanding;
