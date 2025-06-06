
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2, Mail, Edit2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AddressLookup from './AddressLookup';
import { supabase } from "@/integrations/supabase/client";

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

// Formspark form ID - dit moet worden vervangen door uw eigen Formspark formulier ID
const FORMSPARK_FORM_ID = "hoSoiHD6n";

const ContactForm = ({
  calculatedPrice,
  setCalculatedPrice,
  addressDetails,
  setAddressDetails,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    propertyType: 'apartment',
    rushService: false,
    postcode: '',
    houseNumber: '',
    houseNumberAddition: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isEditingSurfaceArea, setIsEditingSurfaceArea] = useState(false);
  const [manualSurfaceArea, setManualSurfaceArea] = useState<string>('');
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  useEffect(() => {
    const { postcode, houseNumber } = formData;
    if (postcode && postcode.length >= 6 && houseNumber && !isLoadingAddress) {
      const timeoutId = setTimeout(() => {
        lookupAddress();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData.postcode, formData.houseNumber, formData.houseNumberAddition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    if (addressDetails) {
      calculatePrice(addressDetails.surfaceArea, formData.propertyType, name === 'rushService' ? checked : formData.rushService);
    }
  };

  const applyManualSurfaceArea = () => {
    const surfaceValue = parseInt(manualSurfaceArea);
    if (isNaN(surfaceValue) || surfaceValue <= 0) {
      toast({
        title: "Fout",
        description: "Voer een geldig oppervlakte in",
        variant: "destructive"
      });
      return;
    }
    
    if (addressDetails) {
      const updatedAddressDetails = {
        ...addressDetails,
        surfaceArea: surfaceValue
      };
      setAddressDetails(updatedAddressDetails);
      calculatePrice(surfaceValue, formData.propertyType, formData.rushService);
      toast({
        title: "Oppervlakte bijgewerkt",
        description: `Oppervlakte bijgewerkt naar ${surfaceValue}m²`,
        variant: "default"
      });
    }
    
    setIsEditingSurfaceArea(false);
  };

  const calculatePrice = (surfaceArea: number, propertyType: string, rushService: boolean) => {
    let basePrice = 0;
    
    if (propertyType === 'detached') {
      basePrice = 350;
      
      if (surfaceArea > 200) {
        const extraSurface = surfaceArea - 200;
        const extraChunks = Math.ceil(extraSurface / 10);
        basePrice += extraChunks * 15;
      }
    } else {
      basePrice = 285;
      
      if (surfaceArea > 150) {
        const extraSurface = surfaceArea - 150;
        const extraChunks = Math.ceil(extraSurface / 10);
        basePrice += extraChunks * 15;
      }
    }
    
    if (rushService) {
      basePrice += 95;
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
      const formattedPostcode = postcode.replace(/\s+/g, '');
      
      console.log(`Looking up address: ${formattedPostcode} ${houseNumber}${houseNumberAddition ? ' ' + houseNumberAddition : ''}`);
      
      const adressenResponse = await fetch(`https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=${formattedPostcode}&huisnummer=${houseNumber}${houseNumberAddition ? `&huisnummertoevoeging=${houseNumberAddition}` : ''}`, {
        headers: {
          'X-Api-Key': 'l7f8360199ce744def90a8439b335344d6',
          'Accept': 'application/hal+json',
          'Accept-Crs': 'epsg:28992'
        }
      });
      
      if (!adressenResponse.ok) {
        throw new Error(`AdressenUitgebreid API returned status: ${adressenResponse.status}`);
      }
      
      const adressenData = await adressenResponse.json();
      console.log('AdressenUitgebreid API response:', adressenData);
      
      if (adressenData._embedded && adressenData._embedded.adressen && adressenData._embedded.adressen.length > 0) {
        const addressData = adressenData._embedded.adressen[0];
        
        const street = addressData.openbareRuimteNaam || '';
        const houseNumberFull = `${addressData.huisnummer}${addressData.huisletter || ''}${addressData.huisnummertoevoeging || ''}`;
        const city = addressData.woonplaatsNaam || '';
        const municipality = city;
        const oppervlakte = addressData.oppervlakte || 0;
        
        const fullAddress = `${street} ${houseNumberFull}, ${formattedPostcode} ${city}`;
        
        let surfaceArea = oppervlakte;
        
        if (!surfaceArea && addressData.adresseerbaarObjectIdentificatie) {
          const buildingId = addressData.adresseerbaarObjectIdentificatie;
          
          try {
            console.log(`Getting building data for ID: ${buildingId}`);
            
            const buildingResponse = await fetch(`https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/verblijfsobjecten/${buildingId}?acceptCrs=epsg:28992`, {
              headers: {
                'X-Api-Key': 'l7f8360199ce744def90a8439b335344d6',
                'Accept': 'application/hal+json',
                'Accept-Crs': 'epsg:28992'
              }
            });
            
            if (buildingResponse.ok) {
              const buildingData = await buildingResponse.json();
              console.log('Building data response:', buildingData);
              
              surfaceArea = buildingData.oppervlakte || 0;
              console.log(`Retrieved surface area: ${surfaceArea}m²`);
            } else {
              console.error('Error fetching building data, status:', buildingResponse.status);
              const errorText = await buildingResponse.text();
              console.error('Error response:', errorText);
              
              surfaceArea = formData.propertyType === 'detached' ? 150 : 85;
            }
          } catch (buildingError) {
            console.error('Error fetching building data:', buildingError);
            surfaceArea = formData.propertyType === 'detached' ? 150 : 85;
          }
        }
        
        const address: Address = {
          street,
          city,
          municipality,
          province: 'Unknown',
          surfaceArea
        };
        
        setAddressDetails(address);
        setManualSurfaceArea(surfaceArea.toString());
        
        setFormData(prev => ({ ...prev, address: fullAddress }));
        
        calculatePrice(
          address.surfaceArea,
          formData.propertyType,
          formData.rushService
        );
        
        toast({
          title: "Adres gevonden",
          description: "Adres succesvol gevonden!",
          variant: "default"
        });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting form data to Formspark:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        propertyType: formData.propertyType,
        surfaceArea: addressDetails?.surfaceArea,
        rushService: formData.rushService,
        message: formData.message,
        calculatedPrice: calculatedPrice,
        postcode: formData.postcode,
        houseNumber: formData.houseNumber,
        houseNumberAddition: formData.houseNumberAddition
      });
      
      const formsparkData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        propertyType: formData.propertyType,
        surfaceArea: addressDetails?.surfaceArea,
        rushService: formData.rushService ? 'Ja' : 'Nee',
        message: formData.message,
        calculatedPrice: calculatedPrice,
        postcode: formData.postcode,
        houseNumber: formData.houseNumber,
        houseNumberAddition: formData.houseNumberAddition,
        _redirect: window.location.href,
        _email: {
          from: 'EPA Woninglabel <noreply@epawoninglabel.nl>',
          subject: 'Nieuwe energielabel aanvraag',
          replyTo: formData.email
        }
      };
      
      const response = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formsparkData)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response from Formspark:", errorData);
        throw new Error('Er ging iets mis bij het versturen van het formulier.');
      }
      
      console.log('Formspark submission successful');
      
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          property_type: formData.propertyType,
          surface_area: addressDetails?.surfaceArea,
          rush_service: formData.rushService,
          message: formData.message,
          calculated_price: calculatedPrice,
          postcode: formData.postcode,
          house_number: formData.houseNumber,
          house_number_addition: formData.houseNumberAddition
        });
      
      if (supabaseError) {
        console.error("Error storing submission in Supabase:", supabaseError);
      }
      
      setIsSubmitting(false);
      setSubmitted(true);
      setShowThankYouMessage(true);
      
      toast({
        title: "Aanvraag succesvol verzonden!",
        description: "Bedankt voor uw aanvraag. Wij nemen zo snel mogelijk contact met u op om een afspraak in te plannen.",
        variant: "default",
        duration: 5000,
      });
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: '',
          propertyType: 'apartment',
          rushService: false,
          postcode: '',
          houseNumber: '',
          houseNumberAddition: ''
        });
        setAddressDetails(null);
        setCalculatedPrice(null);
      }, 1000);
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      toast({
        title: "Er is een fout opgetreden",
        description: "Er is een fout opgetreden bij het versturen van uw aanvraag. Probeer het later nog eens of neem telefonisch contact met ons op.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <>
      {showThankYouMessage ? (
        <div className="glass-card rounded-xl p-6 md:p-8 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Aanvraag verstuurd!</h3>
            <p className="text-gray-600 mb-4">
              Hartelijk dank voor uw aanvraag voor een energielabel. Wij zullen zo spoedig mogelijk contact met u opnemen om een afspraak in te plannen.
            </p>
            <p className="text-gray-600">
              U ontvangt een bevestiging per e-mail met de details van uw aanvraag.
            </p>
          </div>
          <Button 
            onClick={() => setShowThankYouMessage(false)}
            className="bg-epa-green hover:bg-epa-green-dark text-white"
          >
            Nieuwe aanvraag
          </Button>
        </div>
      ) : (
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
          
          <AddressLookup 
            formData={formData}
            isLoadingAddress={isLoadingAddress}
            addressError={addressError}
            addressDetails={addressDetails}
            calculatedPrice={calculatedPrice}
            isEditingSurfaceArea={isEditingSurfaceArea}
            manualSurfaceArea={manualSurfaceArea}
            setIsEditingSurfaceArea={setIsEditingSurfaceArea}
            setManualSurfaceArea={setManualSurfaceArea}
            handleChange={handleChange}
            applyManualSurfaceArea={applyManualSurfaceArea}
          />
          
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
      )}
    </>
  );
};

export default ContactForm;
