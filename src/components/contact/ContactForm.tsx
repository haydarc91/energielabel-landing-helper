
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2, Mail } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AddressLookup from './AddressLookup';

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

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

  // Auto-lookup address when postcode and house number are filled
  useEffect(() => {
    const { postcode, houseNumber } = formData;
    // Make sure we have both postcode and house number with minimum length
    if (postcode && postcode.length >= 6 && houseNumber && !isLoadingAddress) {
      const timeoutId = setTimeout(() => {
        lookupAddress();
      }, 500); // Delay to prevent too many requests while typing
      
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
      toast.error("Voer een geldig oppervlakte in");
      return;
    }
    
    if (addressDetails) {
      const updatedAddressDetails = {
        ...addressDetails,
        surfaceArea: surfaceValue
      };
      setAddressDetails(updatedAddressDetails);
      calculatePrice(surfaceValue, formData.propertyType, formData.rushService);
      toast.success(`Oppervlakte bijgewerkt naar ${surfaceValue}m²`);
    }
    
    setIsEditingSurfaceArea(false);
  };

  const calculatePrice = (surfaceArea: number, propertyType: string, rushService: boolean) => {
    let basePrice = 0;
    
    if (propertyType === 'detached' || propertyType === 'semi-detached') {
      basePrice = 350;
      
      if (surfaceArea > 200) {
        const extraSurface = surfaceArea - 200;
        const extraChunks = Math.ceil(extraSurface / 25);
        basePrice += extraChunks * 50;
      }
    } else {
      basePrice = 285;
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
      
      // Using the adressenuitgebreid endpoint for more detailed information
      console.log(`Looking up address: ${formattedPostcode} ${houseNumber}${houseNumberAddition ? ' ' + houseNumberAddition : ''}`);
      
      // Try using the adressenuitgebreid endpoint which includes surface area directly
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
        
        // If oppervlakte is already present in the adressenuitgebreid response
        let surfaceArea = oppervlakte;
        
        // If not, try to get it from the verblijfsobject endpoint
        if (!surfaceArea && addressData.adresseerbaarObjectIdentificatie) {
          const buildingId = addressData.adresseerbaarObjectIdentificatie;
          
          try {
            console.log(`Getting building data for ID: ${buildingId}`);
            
            // Make a separate call to get the verblijfsobject (building) details including surface area
            // Adding the acceptCrs parameter to fix the 412 error
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
              
              // The surface area is in the 'oppervlakte' property
              surfaceArea = buildingData.oppervlakte || 0;
              console.log(`Retrieved surface area: ${surfaceArea}m²`);
            } else {
              console.error('Error fetching building data, status:', buildingResponse.status);
              const errorText = await buildingResponse.text();
              console.error('Error response:', errorText);
              
              // Fall back to default values
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare email content
    const emailContent = `
      Nieuwe energielabel aanvraag:
      
      Naam: ${formData.name}
      Email: ${formData.email}
      Telefoon: ${formData.phone}
      
      Adres: ${formData.address}
      Type woning: ${formData.propertyType}
      Oppervlakte: ${addressDetails?.surfaceArea || 'Niet bekend'} m²
      
      Spoedservice: ${formData.rushService ? 'Ja' : 'Nee'}
      
      Bericht: ${formData.message || 'Geen bericht'}
      
      Berekende prijs: €${calculatedPrice}
    `;
    
    console.log('Sending email to haydarcay@gmail.com and', formData.email);
    console.log('Email content:', emailContent);
    
    // Simulate email sending
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Bedankt voor uw aanvraag! We nemen zo snel mogelijk contact met u op.");
      
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
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
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
        <p className="text-xs text-gray-500 mt-2 text-center">
          <Mail className="h-3 w-3 inline mr-1" />
          Een kopie van uw aanvraag wordt verzonden naar haydarcay@gmail.com en uw e-mailadres
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
