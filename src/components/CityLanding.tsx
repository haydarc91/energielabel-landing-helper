
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Check, Star, ArrowRight, Building, Clock, User, Euro } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CityLandingProps {
  city: string;
  image: string;
  description: string;
  specialFeature?: string;
  neighborhoods?: string[];
  testimonial?: {
    text: string;
    author: string;
  };
}

const CityLanding = ({ 
  city, 
  image, 
  description, 
  specialFeature, 
  neighborhoods = [],
  testimonial
}: CityLandingProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const [formData, setFormData] = useState({
    propertyType: 'apartment',
    rushService: false
  });
  
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
                  <span>{city}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Energielabel woning aanvragen in <span className="text-epa-green">{city}</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Vraag snel en eenvoudig een officieel energielabel aan voor uw woning in {city}. 
                  Onze EPA-adviseurs zijn lokaal actief en kennen de woningen in {city} goed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-epa-green hover:bg-epa-green-dark text-white"
                    onClick={() => {
                      const contactSection = document.getElementById('contact-section');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
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
                    <span className="text-gray-700">Ervaren met {city}se woningen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-epa-green" />
                    <span className="text-gray-700">Vanaf €285 inclusief BTW</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={image}
                  alt={`Energielabel woning aanvragen in ${city}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <h2 className="text-3xl font-bold mb-10 text-center">Energielabel in {city}</h2>
            
            <div className="max-w-4xl mx-auto">
              {/* City Description Card */}
              <Card className="mb-10 border-t-4 border-t-epa-green shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-epa-green">Over {city}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {description}
                  </p>
                  
                  {specialFeature && (
                    <div className="mt-4 p-3 bg-epa-green/5 rounded-md border border-epa-green/10">
                      {specialFeature}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Local Expertise Card */}
              <Card className="mb-10 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Building className="text-epa-green h-5 w-5" />
                    <span>Lokale expertise voor {city}se woningen</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Onze EPA-adviseurs zijn bekend met de typische woningen in {city}
                    {neighborhoods.length > 0 && (
                      <>, van de oudere woningen in {neighborhoods[0]} tot de nieuwere woningen in {neighborhoods[1]}</>
                    )}. 
                    Deze lokale kennis helpt ons om een nauwkeurige beoordeling te maken van uw woning.
                  </p>
                </CardContent>
              </Card>
              
              {/* How It Works Card */}
              <Card className="mb-10 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Clock className="text-epa-green h-5 w-5" />
                    <span>Energielabel aanvragen in {city}: hoe werkt het?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Het proces is eenvoudig:
                  </p>
                  <ol className="space-y-3 list-decimal ml-5 text-gray-700">
                    <li className="pl-2">Vraag een energielabel aan via ons contactformulier</li>
                    <li className="pl-2">Wij nemen contact op om een afspraak in te plannen</li>
                    <li className="pl-2">Een EPA-adviseur komt bij u langs voor de opname (ca. 45-60 minuten)</li>
                    <li className="pl-2">U ontvangt het officiële energielabel binnen 3 werkdagen</li>
                  </ol>
                </CardContent>
              </Card>
              
              {/* Why Choose Us Card */}
              <Card className="bg-epa-green/5 border border-epa-green/20 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-epa-green flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>Waarom kiezen voor EPA Woninglabel in {city}?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
                      <span>Lokale expertise en kennis van {city}se woningen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
                      <span>Snelle service: binnen 3 werkdagen uw energielabel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
                      <span>Persoonlijke aanpak en duidelijke communicatie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-0.5" />
                      <span>Transparante prijzen vanaf €285 inclusief BTW</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {testimonial && (
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
                      {testimonial.text}
                    </p>
                    <p className="text-gray-700 font-medium mt-2">{testimonial.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="contact-section" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vraag direct een energielabel aan in {city}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Vul het formulier in om een energielabel aan te vragen voor uw woning in {city}. 
                Wij nemen zo spoedig mogelijk contact met u op.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <ContactForm 
                  calculatedPrice={calculatedPrice} 
                  setCalculatedPrice={setCalculatedPrice}
                  addressDetails={addressDetails}
                  setAddressDetails={setAddressDetails}
                />
              </div>
              <div className="lg:col-span-2">
                <ContactInfo 
                  calculatedPrice={calculatedPrice}
                  formData={formData}
                  addressDetails={addressDetails}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CityLanding;
