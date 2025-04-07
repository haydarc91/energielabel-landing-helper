
import React from 'react';
import CityLanding from '@/components/CityLanding';

const DenHaagLanding = () => {
  return (
    <CityLanding
      city="Den Haag"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Den Haag heeft een grote diversiteit aan woningen, van statige herenhuizen in het Statenkwartier tot moderne appartementen aan de kust. Een energielabel geeft inzicht in de energieprestatie van deze woningen en is belangrijk bij verkoop of verhuur."
      neighborhoods={["Scheveningen", "Ypenburg"]}
      testimonial={{
        text: "Vlotte service in Den Haag, vanaf het eerste contact tot de afgifte van het energielabel. De adviseur was kundig en nam de tijd om alles goed uit te leggen. Ik wist direct waar ik aan toe was.",
        author: "- Linda van der Meer, Den Haag"
      }}
    />
  );
};

export default DenHaagLanding;
