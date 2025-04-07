
import React from 'react';
import CityLanding from '@/components/CityLanding';

const AmersfoortLanding = () => {
  return (
    <CityLanding
      city="Amersfoort"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Amersfoort is een stad met een diverse woningvoorraad, van historische panden in de binnenstad tot moderne nieuwbouw in wijken zoals Vathorst. Het verduurzamen van deze woningen is een belangrijke stap in de energietransitie."
      neighborhoods={["Soesterkwartier", "Vathorst"]}
      testimonial={{
        text: "Zeer tevreden met het energielabel voor mijn woning in Vathorst. De adviseur was op tijd, vriendelijk en kon al mijn vragen beantwoorden. Binnen 2 dagen had ik het energielabel in huis. Aanrader voor iedereen in Amersfoort!",
        author: "- Mark de Vries, Amersfoort"
      }}
    />
  );
};

export default AmersfoortLanding;
