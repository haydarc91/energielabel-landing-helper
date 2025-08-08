
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AmersfoortLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-medium text-epa-green flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>Amersfoort</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Energielabel woning aanvragen in <span className="text-epa-green">Amersfoort</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Vraag snel en eenvoudig een officieel energielabel aan voor uw woning in Amersfoort. 
                  Onze EPA-adviseurs zijn lokaal actief en kennen de woningen in Amersfoort goed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-epa-green hover:bg-epa-green-dark text-white"
                    onClick={() => window.location.href = "/#contact"}
                  >
                    Direct aanvragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="border-gray-300"
                    onClick={() => window.location.href = "/#process"}
                  >
                    Bekijk werkwijze
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-epa-green" />
                    <span className="text-gray-700">Binnen 3 werkdagen geregeld</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-epa-green" />
                    <span className="text-gray-700">Ervaren met Amersfoortse woningen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-epa-green" />
                    <span className="text-gray-700">Vanaf €285 inclusief BTW</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png"
                  alt="Energielabel woning aanvragen in Amersfoort"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1200}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <h2 className="text-3xl font-bold mb-10 text-center">Energielabel in Amersfoort</h2>
            
            <div className="prose max-w-4xl mx-auto">
              <p>
                Amersfoort is een stad met een diverse woningvoorraad, van historische panden in de binnenstad 
                tot moderne nieuwbouw in wijken zoals Vathorst. Het verduurzamen van deze woningen is een belangrijke 
                stap in de energietransitie.
              </p>
              
              <p>
                Een energielabel geeft inzicht in de energieprestatie van uw woning en is verplicht bij verkoop of verhuur. 
                In Amersfoort zijn wij dagelijks actief om woningeigenaren te voorzien van een officieel energielabel.
              </p>
              
              <h3>Lokale expertise voor Amersfoortse woningen</h3>
              <p>
                Onze EPA-adviseurs zijn bekend met de typische woningen in Amersfoort, van de oudere woningen in 
                Soesterkwartier tot de nieuwere woningen in Vathorst. Deze lokale kennis helpt ons om een nauwkeurige 
                beoordeling te maken van uw woning.
              </p>
              
              <h3>Energielabel aanvragen in Amersfoort: hoe werkt het?</h3>
              <p>
                Het proces is eenvoudig:
              </p>
              <ol>
                <li>Vraag een energielabel aan via ons contactformulier</li>
                <li>Wij nemen contact op om een afspraak in te plannen</li>
                <li>Een EPA-adviseur komt bij u langs voor de opname (ca. 45-60 minuten)</li>
                <li>U ontvangt het officiële energielabel binnen 3 werkdagen</li>
              </ol>
              
              <div className="bg-epa-green/5 p-6 rounded-lg my-8">
                <h3 className="text-epa-green">Waarom kiezen voor EPA Woninglabel in Amersfoort?</h3>
                <ul>
                  <li>Lokale expertise en kennis van Amersfoortse woningen</li>
                  <li>Snelle service: binnen 3 werkdagen uw energielabel</li>
                  <li>Persoonlijke aanpak en duidelijke communicatie</li>
                  <li>Transparante prijzen vanaf €285 inclusief BTW</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                className="bg-epa-green hover:bg-epa-green-dark text-white"
                onClick={() => window.location.href = "/#contact"}
              >
                Energielabel aanvragen in Amersfoort
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="italic text-gray-600">
                    "Zeer tevreden met het energielabel voor mijn woning in Vathorst. De adviseur was op tijd, 
                    vriendelijk en kon al mijn vragen beantwoorden. Binnen 2 dagen had ik het energielabel in huis. 
                    Aanrader voor iedereen in Amersfoort!"
                  </p>
                  <p className="text-gray-700 font-medium mt-2">- Mark de Vries, Amersfoort</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AmersfoortLanding;
