
import React, { useState, useRef } from 'react';
import { Send, CheckCircle, Home, Building, Clock, Upload, Check, Loader2, AlertCircle } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIntersectionAnimation } from '@/lib/animations';

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

const PricingSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    propertyType: 'apartment',
    rushService: false,
    floorplanDiscount: false,
    postcode: '',
    houseNumber: '',
    houseNumberAddition: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressDetails, setAddressDetails] = useState<Address | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // If enabling floorplan discount
    if (name === 'floorplanDiscount' && checked && !uploadedFileName) {
      // Prompt user to upload floorplan
      fileInputRef.current?.click();
    }
    
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Recalculate price when checkboxes change
    if (addressDetails) {
      calculatePrice(addressDetails.surfaceArea, formData.propertyType, name === 'rushService' ? checked : formData.rushService, name === 'floorplanDiscount' ? checked : formData.floorplanDiscount);
    }
  };

  const calculatePrice = (surfaceArea: number, propertyType: string, rushService: boolean, floorplanDiscount: boolean) => {
    let basePrice = 0;
    
    // Determine base price by property type
    if (propertyType === 'detached' || propertyType === 'semi-detached') {
      basePrice = 350; // Base price for detached homes up to 200m²
      
      // Add surcharges for larger properties
      if (surfaceArea > 200) {
        const extraSurface = surfaceArea - 200;
        const extraChunks = Math.ceil(extraSurface / 25);
        basePrice += extraChunks * 50;
      }
    } else {
      basePrice = 285; // Apartments and terraced houses
    }
    
    // Add rush service fee if selected
    if (rushService) {
      basePrice += 95;
    }
    
    // Apply floorplan discount if selected
    if (floorplanDiscount) {
      basePrice -= 10;
    }
    
    setCalculatedPrice(basePrice);
    return basePrice;
  };

  const lookupAddress = async () => {
    const { postcode, houseNumber, houseNumberAddition } = formData;
    
    if (!postcode || !houseNumber) {
      setAddressError("Vul een postcode en huisnummer in");
      return;
    }
    
    setIsLoadingAddress(true);
    setAddressError(null);
    
    try {
      // Format postcode to meet BAG API requirements (remove spaces)
      const formattedPostcode = postcode.replace(/\s+/g, '');
      
      // Call the BAG API to get the address data
      const response = await fetch(`https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressen?postcode=${formattedPostcode}&huisnummer=${houseNumber}${houseNumberAddition ? `&huisnummertoevoeging=${houseNumberAddition}` : ''}`, {
        headers: {
          'X-Api-Key': 'l7f8360199ce744def90a8439b335344d6',
          'Accept': 'application/hal+json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`BAG API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('BAG API response:', data);
      
      if (data._embedded && data._embedded.adressen && data._embedded.adressen.length > 0) {
        const addressData = data._embedded.adressen[0];
        
        // Extract address details
        const street = addressData.openbareRuimte.naam;
        const houseNumberFull = `${addressData.nummeraanduiding.huisnummer}${addressData.nummeraanduiding.huisnummertoevoeging || ''}`;
        const city = addressData.woonplaats.naam;
        const municipality = addressData.gemeenteWoonplaats?.naam || city;
        
        // Create a full address string
        const fullAddress = `${street} ${houseNumberFull}, ${formattedPostcode} ${city}`;
        
        // Fetch additional building data to get the surface area
        const buildingId = addressData.nummeraanduiding.identificatiecode;
        let surfaceArea = 0;
        
        try {
          // Try to get building info to retrieve surface area
          const buildingResponse = await fetch(`https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/verblijfsobjecten/${buildingId}`, {
            headers: {
              'X-Api-Key': 'l7f8360199ce744def90a8439b335344d6',
              'Accept': 'application/hal+json'
            }
          });
          
          if (buildingResponse.ok) {
            const buildingData = await buildingResponse.json();
            surfaceArea = buildingData.oppervlakte || 0;
          }
        } catch (buildingError) {
          console.error('Error fetching building data:', buildingError);
          // If we can't get the surface area, use a reasonable default based on property type
          surfaceArea = formData.propertyType === 'detached' ? 150 : 85;
        }
        
        // Set address details in state
        const address: Address = {
          street,
          city,
          municipality,
          province: 'Unknown', // BAG API doesn't directly provide province
          surfaceArea
        };
        
        setAddressDetails(address);
        
        // Update form data with full address
        setFormData(prev => ({ ...prev, address: fullAddress }));
        
        // Calculate price based on property type and surface area
        calculatePrice(
          address.surfaceArea,
          formData.propertyType,
          formData.rushService,
          formData.floorplanDiscount
        );
        
        toast.success("Adres succesvol gevonden!");
      } else {
        setAddressError("Geen adres gevonden. Controleer de gegevens.");
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddressError("Kon het adres niet vinden. Controleer de gegevens.");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFileName(files[0].name);
      setFormData(prev => ({ ...prev, floorplanDiscount: true }));
      
      // Recalculate price with floorplan discount
      if (addressDetails) {
        calculatePrice(
          addressDetails.surfaceArea, 
          formData.propertyType, 
          formData.rushService, 
          true
        );
      }
      
      toast.success("Plattegrond succesvol geüpload!");
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
        address: '',
        message: '',
        propertyType: 'apartment',
        rushService: false,
        floorplanDiscount: false,
        postcode: '',
        houseNumber: '',
        houseNumberAddition: ''
      });
      setAddressDetails(null);
      setCalculatedPrice(null);
      setUploadedFileName(null);
      
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
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
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
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
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
                  <span>€50 toeslag per extra 25m²</span>
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
                src="https://images.unsplash.com/photo-1609921141835-710b7290f500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
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
                    className="w-full"
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
                    className="w-full"
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
                    className="w-full"
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
              
              {/* Postcode API lookup section */}
              <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium mb-3">Adresgegevens</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode
                    </label>
                    <Input
                      id="postcode"
                      name="postcode"
                      type="text"
                      value={formData.postcode}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="1234 AB"
                    />
                  </div>
                  <div>
                    <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Huisnummer
                    </label>
                    <Input
                      id="houseNumber"
                      name="houseNumber"
                      type="text"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <label htmlFor="houseNumberAddition" className="block text-sm font-medium text-gray-700 mb-1">
                      Toevoeging
                    </label>
                    <Input
                      id="houseNumberAddition"
                      name="houseNumberAddition"
                      type="text"
                      value={formData.houseNumberAddition}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="A"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={lookupAddress}
                    disabled={isLoadingAddress}
                    className="inline-flex items-center gap-2 text-sm py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                  >
                    {isLoadingAddress ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adres ophalen...
                      </>
                    ) : (
                      <>Adres zoeken</>
                    )}
                  </button>
                  {addressError && (
                    <div className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {addressError}
                    </div>
                  )}
                </div>

                {/* Show address details when available */}
                {addressDetails && (
                  <div className="mt-3 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Gevonden adres:</span> {formData.address}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Oppervlakte:</span> {addressDetails.surfaceArea} m²
                    </p>
                    {calculatedPrice && (
                      <p className="mt-1 font-medium text-epa-green">
                        Berekende prijs: €{calculatedPrice} incl. BTW
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-5">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Volledig adres
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Adres wordt automatisch ingevuld na postcode check"
                  readOnly={!!addressDetails}
                />
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
                    id="floorplanDiscount"
                    name="floorplanDiscount"
                    type="checkbox"
                    checked={formData.floorplanDiscount}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-epa-green rounded border-gray-300 focus-ring mt-0.5"
                  />
                  <label htmlFor="floorplanDiscount" className="ml-2 block text-sm text-gray-700">
                    <span className="font-medium">Plattegrond uploaden (-€10 korting)</span>
                    <p className="text-gray-500 text-xs mt-1">
                      Upload een actuele plattegrond met duidelijke maatvoering en ontvang €10 korting
                    </p>
                  </label>
                </div>
                
                {/* Hidden file input for floor plan */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="floorPlanUpload"
                />
                
                {/* Show upload button if checkbox is checked */}
                {formData.floorplanDiscount && (
                  <div className="ml-7">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 text-sm py-2 px-4 bg-epa-green/10 hover:bg-epa-green/20 text-epa-green-dark rounded-md transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      {uploadedFileName ? 'Wijzig plattegrond' : 'Upload plattegrond'}
                    </button>
                    {uploadedFileName && (
                      <p className="mt-1 text-xs text-gray-600 flex items-center gap-1">
                        <Check className="h-3 w-3 text-epa-green" />
                        Geüpload: {uploadedFileName}
                      </p>
                    )}
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
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full"
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
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Verzenden...
                    </>
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
            <div className="glass-card rounded-xl p-6 md:p-8 sticky top-24">
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
                  Wij zijn actief in een straal van 80km rondom Amersfoort, inclusief steden als Utrecht, Amsterdam en Apeldoorn.
                </p>
              </div>
              
              {calculatedPrice && (
                <div className="mt-6 p-4 bg-epa-green/10 rounded-lg border border-epa-green/20">
                  <h4 className="font-medium text-epa-green-dark">Uw offerte</h4>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Basistarief:</span>
                      <span>€{
                        formData.propertyType === 'detached' || formData.propertyType === 'semi-detached' ? 
                        '350' : '285'
                      }</span>
                    </div>
                    
                    {addressDetails && addressDetails.surfaceArea > 200 && 
                     (formData.propertyType === 'detached' || formData.propertyType === 'semi-detached') && (
                      <div className="flex justify-between">
                        <span>Toeslag grote woning:</span>
                        <span>€{Math.ceil((addressDetails.surfaceArea - 200) / 25) * 50}</span>
                      </div>
                    )}
                    
                    {formData.rushService && (
                      <div className="flex justify-between">
                        <span>Spoedservice:</span>
                        <span>+€95</span>
                      </div>
                    )}
                    
                    {formData.floorplanDiscount && (
                      <div className="flex justify-between">
                        <span>Korting plattegrond:</span>
                        <span>-€10</span>
                      </div>
                    )}
                    
                    <div className="border-t border-epa-green/20 pt-2 font-medium flex justify-between">
                      <span>Totaal (incl. BTW):</span>
                      <span>€{calculatedPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
