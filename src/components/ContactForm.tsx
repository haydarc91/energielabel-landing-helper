import React, { useState } from 'react';
import { Send, CheckCircle, Home, Building, Clock } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionAnimation } from '@/lib/animations';

const PricingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    propertyType: 'apartment',
    rushService: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Bedankt voor uw aanvraag! We nemen zo snel mogelijk contact met u op.");
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        propertyType: 'apartment',
        rushService: false
      });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
      }}
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Onze vaste tarieven</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Transparante prijzen zonder verrassingen. Direct uw energielabel aanvragen zonder offerte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Standard Housing Card */}
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Standaard woning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="font-medium">Woningen tot 150m²</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold text-epa-green">€285</span>
                <span className="text-gray-500 ml-2">incl. BTW</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Appartementen, tussenwoningen, hoekwoningen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Geldig voor 10 jaar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Geregistreerd bij RVO</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Professionele EPA-adviseur</span>
                </li>
              </ul>
              <button
                onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-epa-green hover:bg-epa-green-dark text-white"
              >
                <Send className="h-5 w-5" /> Direct aanvragen
              </button>
            </CardContent>
          </Card>

          {/* Detached Housing Card */}
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Vrijstaande woning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  <span className="font-medium">Vrijstaande woningen</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold text-epa-green">€350</span>
                <span className="text-gray-500 ml-2">incl. BTW</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Vrijstaande woningen, villa's, landhuizen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Geldig voor 10 jaar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Geregistreerd bij RVO</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>Professionele EPA-adviseur</span>
                </li>
              </ul>
              <button
                onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-epa-green hover:bg-epa-green-dark text-white"
              >
                <Send className="h-5 w-5" /> Direct aanvragen
              </button>
            </CardContent>
          </Card>

          {/* New Rush Service Card */}
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-amber-200">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Spoedservice energielabel" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">Spoedservice</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold text-amber-600">+€95</span>
                <span className="text-gray-500 ml-2">incl. BTW</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Binnen 24 uur een opname en energielabel</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Zelfde kwaliteit en geldigheid</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Voorrang op reguliere aanvragen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Toeslag bovenop standaard tarief</span>
                </li>
              </ul>
              <button
                onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Clock className="h-5 w-5" /> Direct aanvragen
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div id="contactForm" className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Aanvraagformulier</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Naam
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                    placeholder="Uw volledige naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefoonnummer
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                    placeholder="06 - 12345678"
                  />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type woning
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring bg-white"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="terraced">Tussenwoning</option>
                    <option value="semi-detached">Hoekwoning</option>
                    <option value="detached">Vrijstaande woning</option>
                    <option value="other">Anders</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-5">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Adres
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                  placeholder="Straat, huisnummer, postcode en plaats"
                />
              </div>
              
              <div className="mt-5">
                <div className="flex items-start">
                  <input
                    id="rushService"
                    name="rushService"
                    type="checkbox"
                    checked={formData.rushService}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-amber-600 rounded border-gray-300 focus-ring mt-0.5"
                  />
                  <label htmlFor="rushService" className="ml-2 block text-sm text-gray-700">
                    <span className="font-medium">Spoedservice (+€95 incl. BTW)</span>
                    <p className="text-gray-500 text-xs mt-1">
                      Opname en afgifte van het energielabel binnen 24 uur
                    </p>
                  </label>
                </div>
              </div>
              
              <div className="mt-5">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Bericht (optioneel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus-ring"
                  placeholder="Eventuele opmerkingen of vragen"
                />
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full button-transition py-3 px-6 rounded-md flex items-center justify-center gap-2 font-medium ${
                    submitted 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-epa-green hover:bg-epa-green-dark text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>Verzenden...</>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" /> Verzonden
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" /> Aanvraag versturen
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Contact informatie</h3>
              
              <div className="space-y-4 text-gray-600 mb-6">
                <p>
                  <span className="font-medium block">Email:</span>
                  info@epawoninglabel.nl
                </p>
                <p>
                  <span className="font-medium block">Telefoon:</span>
                  020 - 123 4567
                </p>
                <p>
                  <span className="font-medium block">Openingstijden:</span>
                  Maandag t/m vrijdag: 9:00 - 17:00
                </p>
              </div>
              
              <div className="mt-auto">
                <h4 className="font-medium mb-3 text-lg">Werkgebied</h4>
                <p className="text-gray-600">
                  Wij zijn actief in heel Nederland en kunnen in elke provincie een energielabel verzorgen voor uw woning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
