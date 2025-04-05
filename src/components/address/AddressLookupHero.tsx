
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

const AddressLookupHero = () => {
  const [formData, setFormData] = useState({
    postcode: '',
    houseNumber: '',
    houseNumberAddition: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressDetails, setAddressDetails] = useState<Address | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const lookupAddress = async () => {
    const { postcode, houseNumber, houseNumberAddition } = formData;
    
    if (!postcode || !houseNumber) {
      setAddressError("Vul een postcode en huisnummer in");
      return;
    }
    
    setIsLoading(true);
    setAddressError(null);
    
    try {
      const formattedPostcode = postcode.replace(/\s+/g, '');
      
      // Using the adressenuitgebreid endpoint for more detailed information
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
            const buildingResponse = await fetch(`https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/verblijfsobjecten/${buildingId}?acceptCrs=epsg:28992`, {
              headers: {
                'X-Api-Key': 'l7f8360199ce744def90a8439b335344d6',
                'Accept': 'application/hal+json',
                'Accept-Crs': 'epsg:28992'
              }
            });
            
            if (buildingResponse.ok) {
              const buildingData = await buildingResponse.json();
              
              // The surface area is in the 'oppervlakte' property
              surfaceArea = buildingData.oppervlakte || 0;
            } else {
              // Fall back to default values
              surfaceArea = 85;
            }
          } catch (buildingError) {
            console.error('Error fetching building data:', buildingError);
            surfaceArea = 85;
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
        
        // Calculate price based on surface area
        const basePrice = surfaceArea > 150 ? 350 : 285;
        setCalculatedPrice(basePrice);
        
        // Store in localStorage for persistence and for the contact form to use
        localStorage.setItem('epaSearchPostcode', postcode);
        localStorage.setItem('epaSearchHouseNumber', houseNumber);
        localStorage.setItem('epaSearchHouseNumberAddition', houseNumberAddition || '');
        localStorage.setItem('epaSearchFullAddress', fullAddress);
        localStorage.setItem('epaSearchSurfaceArea', surfaceArea.toString());
        
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
      setIsLoading(false);
    }
  };

  const continueWithApplication = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Highlight the contact form section when scrolled to it
      setTimeout(() => {
        const addressLookupSection = document.querySelector('.address-lookup-section');
        if (addressLookupSection) {
          addressLookupSection.classList.add('highlight-section');
          setTimeout(() => {
            addressLookupSection.classList.remove('highlight-section');
          }, 2000);
        }
      }, 1000); // Wait for the scroll to complete
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
            Postcode
          </label>
          <Input
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="1234 AB"
            className="w-full"
          />
        </div>
        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Huisnummer
          </label>
          <Input
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            placeholder="123"
            className="w-full"
          />
        </div>
        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="houseNumberAddition" className="block text-sm font-medium text-gray-700 mb-1">
            Toevoeging
          </label>
          <Input
            id="houseNumberAddition"
            name="houseNumberAddition"
            value={formData.houseNumberAddition}
            onChange={handleChange}
            placeholder="A"
            className="w-full"
          />
        </div>
      </div>
      
      {addressError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
          <p className="text-sm text-red-600">{addressError}</p>
        </div>
      )}
      
      {!addressDetails && (
        <Button 
          onClick={lookupAddress} 
          className="w-full bg-epa-green hover:bg-epa-green-dark text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Zoeken...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              Zoek adres
            </>
          )}
        </Button>
      )}
      
      {addressDetails && (
        <>
          <div className="bg-green-50 border border-green-100 rounded-md p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="font-medium text-green-800">Adres gevonden</h4>
            </div>
            <p className="text-green-700 mb-1">
              {formData.postcode.toUpperCase()} {formData.houseNumber}{formData.houseNumberAddition}
            </p>
            <p className="text-sm text-green-600">
              Oppervlakte: {addressDetails.surfaceArea} m²
            </p>
            {calculatedPrice && (
              <div className="mt-2 pt-2 border-t border-green-100">
                <p className="font-medium text-green-800">
                  Geschat tarief: €{calculatedPrice}
                </p>
              </div>
            )}
          </div>
          
          <Button 
            onClick={continueWithApplication} 
            className="w-full bg-epa-green hover:bg-epa-green-dark text-white"
          >
            Verder met aanvraag <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </>
      )}
      
      <style>
        {`
        .highlight-section {
          border: 2px solid #10b981;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
          transform: scale(1.01);
        }
        `}
      </style>
    </div>
  );
};

export default AddressLookupHero;
