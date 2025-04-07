
import React from 'react';
import { Check, Star, ArrowRight, Wrench, Award, Clock, Send } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  return (
    <section
      id="about"
      className="py-10 md:py-14 px-6 md:px-8 lg:px-12 bg-white"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="mb-2 text-2xl md:text-3xl">Over Ons</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Al 15 jaar expertise in het opstellen van energielabels, met een no-nonsense aanpak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-card p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">No-nonsense mentaliteit</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Na het leiden van een bedrijf met 15 energieadviseurs, ben ik voor mijzelf begonnen 
              om échte meerwaarde te leveren. Met een nuchtere aanpak focus ik op 
              wat belangrijk is: een eerlijk energielabel voor uw woning.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <div className="flex items-start">
                <Check className="h-4 w-4 text-epa-green mr-1 flex-shrink-0 mt-0.5" />
                <span className="text-xs">Eerlijk advies zonder overbodige kosten</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-epa-green mr-1 flex-shrink-0 mt-0.5" />
                <span className="text-xs">Persoonlijke betrokkenheid</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-epa-green mr-1 flex-shrink-0 mt-0.5" />
                <span className="text-xs">Transparante communicatie</span>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-epa-green mr-1 flex-shrink-0 mt-0.5" />
                <span className="text-xs">Energiebesparend advies</span>
              </div>
            </div>
            
            <Button
              className="bg-epa-green hover:bg-epa-green-dark text-white text-sm py-1 h-auto"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Send className="h-3 w-3 mr-1" /> Direct aanvragen
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="glass-card p-3 rounded-xl">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-0.5">15 jaar ervaring</h3>
                  <p className="text-gray-600 text-xs">
                    Met meer dan 15 jaar ervaring en duizenden opgestelde energielabels, 
                    brengen we een schat aan kennis naar elke woning.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-3 rounded-xl">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-0.5">Diepgaand onderzoek</h3>
                  <p className="text-gray-600 text-xs">
                    Wij gaan verder waar anderen stoppen. Bij onbekende isolatiewaarden doen we
                    diepgaander onderzoek voor een nauwkeurig label.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-3 rounded-xl">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-epa-green/10 text-epa-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-0.5">Kwaliteit maakt verschil</h3>
                  <p className="text-gray-600 text-xs">
                    De kwaliteit van een energielabelopname maakt een significant verschil in de uitkomst.
                    Wij zorgen voor een nauwkeurige beoordeling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Button 
            variant="outline" 
            className="text-epa-green border-epa-green hover:bg-epa-green/10 text-sm py-1 h-auto"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowRight className="h-3 w-3 mr-1" /> Aanvraag energielabel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
