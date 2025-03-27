
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';

const AboutUs = () => {
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  return (
    <section 
      id="about" 
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)'
      }}
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Over Ons</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Al 15 jaar ervaring met het opstellen van energielabels en een no-nonsense mentaliteit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-epa-green">Onze aanpak maakt het verschil</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold">No-nonsense mentaliteit.</span> Wij geloven in eerlijk advies en direct resultaat, zonder onnodige omwegen of extra kosten.
                </p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold">Uitgebreide expertise.</span> Met 15 jaar ervaring en duizenden opgestelde energielabels kennen wij de regelgeving door en door.
                </p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold">Verder dan de standaard.</span> Waar anderen stoppen met conservatieve aannames, gaan wij verder met diepgaander onderzoek zoals het boren van een gat op een onzichtbare plek om isolatiemateriaal te achterhalen.
                </p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-epa-green mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  <span className="font-semibold">Kwaliteit bepaalt het resultaat.</span> Een zorgvuldige inspectie en precieze metingen maken een groot verschil in de uitkomst van uw energielabel.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-2 text-epa-green">Van bedrijf naar persoonlijke service</h4>
              <p className="text-gray-700">
                Na het leiden van een bedrijf met 15 energieadviseurs, heb ik bewust gekozen voor een nieuwe start: een persoonlijke aanpak waarbij ik zelf alle inspecties uitvoer en rapportages opstel. Dit om echte meerwaarde te leveren voor elke woningeigenaar.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-2 text-epa-green">Waarom wij anders zijn</h4>
              <p className="text-gray-700">
                Een energielabel is meer dan een verplicht document. Het is een waardevol inzicht in de energieprestatie van uw woning. Wij zien elke inspectie als een kans om u van de meest nauwkeurige informatie te voorzien, met oog voor detail en doelgerichte adviezen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
