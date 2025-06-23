
import React from 'react';
import CityLanding from '@/components/CityLanding';

const LeidenLanding = () => {
  return (
    <CityLanding
      city="Leiden"
      image="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
      description="Leiden combineert een rijke geschiedenis met moderne woningbouw. Van historische grachtenpanden in het centrum tot moderne woningen in wijken zoals Merenwijk. Een energielabel is cruciaal voor het bepalen van de energieprestatie van deze gevarieerde woningvoorraad."
      neighborhoods={["Merenwijk", "De Mors"]}
      testimonial={{
        text: "Zeer professionele service in Leiden! De EPA-adviseur was vriendelijk en grondig. Hij gaf ook nuttige tips voor energiebesparing. Het energielabel was binnen twee dagen klaar. Absoluut een aanrader!",
        author: "- Maria Janssen, Leiden"
      }}
    />
  );
};

export default LeidenLanding;
