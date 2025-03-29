
import React from 'react';
import { Check, Star, ArrowRight, Wrench, Award, Clock, Send } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  return (
    <section
      id="about"
      className="py-12 md:py-16 px-6 md:px-8 lg:px-12 bg-white"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-3">Over Ons</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Al 15 jaar expertise in het opstellen van energielabels, met een no-nonsense aanpak en diepgaande kennis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">No-nonsense mentaliteit</h3>
            <p className="text-gray-600 mb-4">
              Na het leiden van een bedrijf met 15 energieadviseurs, ben ik voor mijzelf begonnen 
              om échte meerwaarde te leveren. Met een nuchtere, pragmatische aanpak focus ik op 
              wat echt belangrijk is: een eerlijk en nauwkeurig energielabel voor uw woning.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Eerlijk advies zonder overbodige kosten</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Persoonlijke betrokkenheid bij elke opdracht</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Transparante werkwijze en communicatie</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Meedenken over energiebesparende maatregelen</span>
              </div>
            </div>
            
            <Button
              className="bg-epa-green hover:bg-epa-green-dark text-white"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Send className="h-4 w-4 mr-2" /> Direct aanvragen
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="glass-card p-4 rounded-xl">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">15 jaar ervaring</h3>
                  <p className="text-gray-600 text-sm">
                    Met meer dan 15 jaar ervaring en duizenden opgestelde energielabels, 
                    brengen we een schat aan kennis naar elke woning.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Diepgaand onderzoek</h3>
                  <p className="text-gray-600 text-sm">
                    Wij gaan verder waar anderen stoppen. Bij onbekende isolatiewaarden doen we diepgaander 
                    onderzoek voor een nauwkeurig label.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Kwaliteit maakt verschil</h3>
                  <p className="text-gray-600 text-sm">
                    De kwaliteit van een energielabelopname maakt een significant verschil in de uitkomst.
                    Wij zorgen voor een nauwkeurige beoordeling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            className="text-epa-green border-epa-green hover:bg-epa-green/10"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowRight className="h-4 w-4 mr-2" /> Aanvraag energielabel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
