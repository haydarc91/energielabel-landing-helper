
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Home, Building, Clock, MapPin, Euro, Upload } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIntersectionAnimation } from '@/lib/animations';
import { lookupAddress, calculatePrice } from '@/lib/addressLookup';

const PricingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    houseNumber: '',
    address: '',
    city: '',
    surfaceArea: 0,
    message: '',
    propertyType: 'apartment',
    rushService: false,
    hasFloorplans: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(285);
  const [totalPrice, setTotalPrice] = useState(285);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  // Calculate price when relevant inputs change
  useEffect(() => {
    const basePrice = calculatePrice(formData.propertyType, formData.surfaceArea);
    setCalculatedPrice(basePrice);
    
    // Add rush service fee if selected
    let total = basePrice + (formData.rushService ? 95 : 0);
    
    // Subtract discount for floorplans if selected
    if (formData.hasFloorplans) {
      total -= 10;
    }
    
    setTotalPrice(total);
  }, [formData.propertyType, formData.surfaceArea, formData.rushService, formData.hasFloorplans]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setFormData(prev => ({ ...prev, hasFloorplans: true }));
      toast.success("Plattegrond geselecteerd. €10 korting toegepast!");
    }
  };

  const handlePostcodeSearch = async () => {
    if (!formData.postcode || !formData.houseNumber) {
      toast.error("Vul een postcode en huisnummer in");
      return;
    }
    
    setIsLookingUpAddress(true);
    setFormData(prev => ({ ...prev, address: '' })); // Clear address to prevent showing old data
    
    try {
      const addressData = await lookupAddress(formData.postcode, formData.houseNumber);
      
      if (addressData) {
        setFormData(prev => ({
          ...prev,
          address: `${addressData.street} ${addressData.number}`,
          city: addressData.city,
          surfaceArea: addressData.surfaceArea || 0
        }));
        toast.success("Adres gevonden en ingevuld");
      } else {
        toast.error("Geen adres gevonden voor deze postcode en huisnummer");
      }
    } catch (error) {
      toast.error("Er is een fout opgetreden bij het ophalen van het adres");
    } finally {
      setIsLookingUpAddress(false);
    }
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
        postcode: '',
        houseNumber: '',
        address: '',
        city: '',
        surfaceArea: 0,
        message: '',
        propertyType: 'apartment',
        rushService: false,
        hasFloorplans: false
      });
      setSelectedFile(null);
      
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
                src="/dutch-house.jpg" 
                alt="Appartementen en tussenwoningen" 
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
                src="/detached-house.jpg" 
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
                  <span>Vrijstaande woningen tot 200m²</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-epa-green mr-2 flex-shrink-0 mt-0.5" />
                  <span>+€50 per extra 25m² boven 200m²</span>
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

          {/* Rush Service Card */}
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-amber-200">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/rush-service.jpg" 
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
        <div id="contactForm" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Aanvraagformulier</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Naam
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Uw volledige naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefoonnummer
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
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
              
              {/* Postcode lookup */}
              <div className="mt-5">
                <p className="text-sm font-medium text-gray-700 mb-3">Adresgegevens</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode
                    </label>
                    <Input
                      id="postcode"
                      name="postcode"
                      type="text"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="1234 AB"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Huisnummer
                    </label>
                    <Input
                      id="houseNumber"
                      name="houseNumber"
                      type="text"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      placeholder="12"
                    />
                  </div>
                  <div className="col-span-1 flex items-end">
                    <button
                      type="button"
                      onClick={handlePostcodeSearch}
                      disabled={isLookingUpAddress}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors h-10"
                    >
                      {isLookingUpAddress ? "Zoeken..." : "Zoek adres"}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Straat en huisnummer
                    </label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Straat en huisnummer"
                      readOnly={formData.postcode !== '' && formData.houseNumber !== ''}
                      className={formData.postcode !== '' && formData.houseNumber !== '' ? "bg-gray-100" : ""}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Woonplaats
                    </label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Woonplaats"
                      readOnly={formData.postcode !== '' && formData.houseNumber !== ''}
                      className={formData.postcode !== '' && formData.houseNumber !== '' ? "bg-gray-100" : ""}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="surfaceArea" className="block text-sm font-medium text-gray-700 mb-1">
                    Woonoppervlakte (m²)
                  </label>
                  <Input
                    id="surfaceArea"
                    name="surfaceArea"
                    type="number"
                    min="0"
                    value={formData.surfaceArea || ""}
                    onChange={handleChange}
                    placeholder="Oppervlakte in m²"
                  />
                  {formData.propertyType === "detached" && formData.surfaceArea > 200 && (
                    <p className="text-amber-600 text-sm mt-1">
                      Toeslag van €{Math.ceil((formData.surfaceArea - 200) / 25) * 50} voor {Math.ceil((formData.surfaceArea - 200) / 25) * 25}m² extra oppervlakte.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-5 space-y-3">
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
                
                <div className="flex items-start">
                  <input
                    id="hasFloorplans"
                    name="hasFloorplans"
                    type="checkbox"
                    checked={formData.hasFloorplans}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-epa-green rounded border-gray-300 focus-ring mt-0.5"
                  />
                  <label htmlFor="hasFloorplans" className="ml-2 block text-sm text-gray-700">
                    <span className="font-medium">Ik heb actuele plattegronden (-€10 korting)</span>
                    <p className="text-gray-500 text-xs mt-1">
                      Actuele plattegronden van de woning met duidelijke maatvoering
                    </p>
                  </label>
                </div>
                
                {formData.hasFloorplans && (
                  <div className="ml-7">
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 mt-2 hover:border-epa-green transition-colors">
                      <input
                        type="file"
                        id="floorplan"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-center">
                        <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">
                          {selectedFile ? selectedFile.name : "Klik om plattegrond te uploaden"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG of PNG (max. 10MB)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-5">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Bericht (optioneel)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Eventuele opmerkingen of vragen"
                />
              </div>
              
              {/* Price calculation summary */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Euro className="h-5 w-5 text-epa-green" />
                  Prijsberekening
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Basistarief ({formData.propertyType === 'detached' ? 'vrijstaand' : 'woning/appartement'}):</span>
                    <span className="font-medium">€{formData.propertyType === 'detached' ? '350' : '285'}</span>
                  </div>
                  
                  {formData.propertyType === 'detached' && formData.surfaceArea > 200 && (
                    <div className="flex justify-between text-sm">
                      <span>Toeslag grote woning ({Math.ceil((formData.surfaceArea - 200) / 25) * 25}m² extra):</span>
                      <span className="font-medium">€{Math.ceil((formData.surfaceArea - 200) / 25) * 50}</span>
                    </div>
                  )}
                  
                  {formData.rushService && (
                    <div className="flex justify-between text-sm">
                      <span>Spoedservice toeslag:</span>
                      <span className="font-medium text-amber-600">€95</span>
                    </div>
                  )}
                  
                  {formData.hasFloorplans && (
                    <div className="flex justify-between text-sm">
                      <span>Korting voor plattegronden:</span>
                      <span className="font-medium text-green-600">-€10</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="font-semibold">Totaalprijs (incl. BTW):</span>
                    <span className="font-bold text-epa-green">€{totalPrice}</span>
                  </div>
                </div>
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

          <div className="lg:col-span-1">
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
                  Wij zijn actief in een straal van 80km rondom Amersfoort, waaronder de provincies Utrecht, Gelderland, Noord-Holland, Flevoland en delen van Overijssel.
                </p>
                <div className="flex items-start gap-2 mt-3 text-epa-green">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">
                    Kantoor Amersfoort: Voorbeeldstraat 123, 3822 AB Amersfoort
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
