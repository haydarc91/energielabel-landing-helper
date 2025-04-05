
import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

interface AddressLookupHeroProps {
  onAddressFound?: (addressDetails: {
    postcode: string;
    houseNumber: string;
    houseNumberAddition: string;
    address: string;
    addressDetails: Address;
  }) => void;
}

const AddressLookupHero: React.FC<AddressLookupHeroProps> = ({ onAddressFound }) => {
  const [postcode, setPostcode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [houseNumberAddition, setHouseNumberAddition] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressDetails, setAddressDetails] = useState<Address | null>(null);
  const [address, setAddress] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const calculatePrice = (surfaceArea: number) => {
    let basePrice = 0;
    
    // Default to apartment pricing (most common)
    basePrice = 285;
    
    // For detached and semi-detached houses (this is an approximation since we don't know the house type)
    if (surfaceArea > 150) {
      basePrice = 350;
      
      // Additional charges for very large homes
      if (surfaceArea > 200) {
        const extraSurface = surfaceArea - 200;
        const extraChunks = Math.ceil(extraSurface / 25);
        basePrice += extraChunks * 50;
      }
    }
    
    setCalculatedPrice(basePrice);
    return basePrice;
  };

  const lookupAddress = async () => {
    if (!postcode || !houseNumber) {
      setAddressError("Vul een postcode en huisnummer in");
      return;
    }
    
    setIsLoadingAddress(true);
    setAddressError(null);
    setSearchCompleted(false);
    
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
              surfaceArea = 85;
            }
          } catch (buildingError) {
            console.error('Error fetching building data:', buildingError);
            surfaceArea = 85;
          }
        }
        
        const addressObj: Address = {
          street,
          city,
          municipality,
          province: 'Unknown',
          surfaceArea
        };
        
        setAddressDetails(addressObj);
        setAddress(fullAddress);
        
        // Calculate price based on the surface area
        calculatePrice(addressObj.surfaceArea);
        
        // Store address in local storage
        localStorage.setItem('epaSearchPostcode', postcode);
        localStorage.setItem('epaSearchHouseNumber', houseNumber);
        localStorage.setItem('epaSearchHouseNumberAddition', houseNumberAddition || '');
        localStorage.setItem('epaSearchFullAddress', fullAddress);
        localStorage.setItem('epaSearchSurfaceArea', surfaceArea.toString());
        
        // Callback to parent component if provided
        if (onAddressFound) {
          onAddressFound({
            postcode,
            houseNumber,
            houseNumberAddition,
            address: fullAddress,
            addressDetails: addressObj
          });
        }
        
        setSearchCompleted(true);
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
    lookupAddress();
  };
  
  const proceedToForm = () => {
    // Scroll to contact form
    const contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      
      // Highlight the form temporarily
      contactForm.classList.add('pulsing-highlight');
      setTimeout(() => {
        contactForm.classList.remove('pulsing-highlight');
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-epa-green" /> 
          Vind uw energielabel
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div>
            <label htmlFor="hero-postcode" className="block text-sm font-medium text-gray-700 mb-1">
              Postcode
            </label>
            <Input
              id="hero-postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="1234 AB"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="hero-housenumber" className="block text-sm font-medium text-gray-700 mb-1">
              Huisnummer
            </label>
            <Input
              id="hero-housenumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="123"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="hero-addition" className="block text-sm font-medium text-gray-700 mb-1">
              Toevoeging
            </label>
            <Input
              id="hero-addition"
              value={houseNumberAddition}
              onChange={(e) => setHouseNumberAddition(e.target.value)}
              placeholder="A"
              className="w-full"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoadingAddress}
          className="w-full bg-epa-green hover:bg-epa-green-dark text-white"
        >
          {isLoadingAddress ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Zoeken...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Zoek adres
            </>
          )}
        </Button>
        
        {addressError && (
          <div className="mt-3 text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {addressError}
          </div>
        )}
        
        {addressDetails && searchCompleted && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">Adresgegevens gevonden</h4>
            <p className="text-gray-800">{address}</p>
            <p className="text-gray-800 mt-1">
              <span className="font-medium">Oppervlakte:</span> {addressDetails.surfaceArea} m²
            </p>
            {calculatedPrice && (
              <p className="text-green-800 font-medium mt-2">
                Geschatte prijs: €{calculatedPrice} incl. BTW
              </p>
            )}
            <Button 
              onClick={proceedToForm} 
              className="mt-3 bg-epa-green hover:bg-epa-green-dark text-white w-full flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Verder met aanvraag
            </Button>
          </div>
        )}
      </form>
      
      <style>{`
        .pulsing-highlight {
          animation: pulse-border 2s ease-in-out;
        }
        
        @keyframes pulse-border {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(74, 222, 128, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default AddressLookupHero;
