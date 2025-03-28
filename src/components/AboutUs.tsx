
import React from 'react';
import { Check, Star, ArrowRight, Wrench, Award, Clock } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';

const AboutUs = () => {
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  return (
    <section
      id="about"
      className="section-padding bg-white"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Over Ons</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Al 15 jaar expertise in het opstellen van energielabels, met een no-nonsense aanpak en diepgaande kennis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">15 jaar ervaring</h3>
                    <p className="text-gray-600">
                      Met meer dan 15 jaar ervaring en duizenden opgestelde energielabels, 
                      brengen we een schat aan kennis naar elke woning die we beoordelen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Diepgaand onderzoek</h3>
                    <p className="text-gray-600">
                      Wij gaan verder waar anderen stoppen. Bij onbekende isolatiewaarden doen we diepgaander onderzoek, 
                      zoals het boren van een klein gat op een onzichtbare plek om het isolatiemateriaal te achterhalen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Kwaliteit maakt verschil</h3>
                    <p className="text-gray-600">
                      De kwaliteit van een energielabelopname maakt een significant verschil in de uitkomst. 
                      Conservatieve aannames kunnen tot een onnodig lager label leiden. Wij zorgen voor een 
                      nauwkeurige beoordeling die uw woning recht doet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">No-nonsense mentaliteit</h3>
              <p className="text-gray-600 mb-5">
                Na het leiden van een bedrijf met 15 energieadviseurs, ben ik voor mijzelf begonnen 
                om échte meerwaarde te leveren. Met een nuchtere, pragmatische aanpak focus ik op 
                wat echt belangrijk is: een eerlijk en nauwkeurig energielabel voor uw woning.
              </p>
              
              <h4 className="text-lg font-medium mb-3">Waarom kiezen voor ons?</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Eerlijk advies zonder overbodige kosten</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Persoonlijke betrokkenheid bij elke opdracht</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Transparante werkwijze en heldere communicatie</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Meedenken over energiebesparende maatregelen</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact" 
              className="inline-flex items-center text-epa-green hover:text-epa-green-dark font-medium gap-2 transition-colors"
            >
              Direct een aanvraag doen <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
