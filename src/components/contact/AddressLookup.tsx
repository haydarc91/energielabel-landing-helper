
import React from 'react';
import { Edit2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Address {
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea: number;
}

interface AddressLookupProps {
  formData: {
    postcode: string;
    houseNumber: string;
    houseNumberAddition: string;
    address: string;
  };
  isLoadingAddress: boolean;
  addressError: string | null;
  addressDetails: Address | null;
  calculatedPrice: number | null;
  isEditingSurfaceArea: boolean;
  manualSurfaceArea: string;
  setIsEditingSurfaceArea: (value: boolean) => void;
  setManualSurfaceArea: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyManualSurfaceArea: () => void;
}

const AddressLookup = ({
  formData,
  isLoadingAddress,
  addressError,
  addressDetails,
  calculatedPrice,
  isEditingSurfaceArea,
  manualSurfaceArea,
  setIsEditingSurfaceArea,
  setManualSurfaceArea,
  handleChange,
  applyManualSurfaceArea
}: AddressLookupProps) => {
  
  const handleSurfaceAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualSurfaceArea(e.target.value);
  };

  return (
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

      {isLoadingAddress && (
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Adres ophalen...
        </div>
      )}

      {addressError && (
        <div className="mt-3 text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {addressError}
        </div>
      )}

      {addressDetails && (
        <div className="mt-3 text-sm">
          <p className="text-gray-700">
            <span className="font-medium">Gevonden adres:</span> {formData.address}
          </p>
          <div className="flex items-center">
            <p className="text-gray-700">
              <span className="font-medium">Oppervlakte:</span> {addressDetails.surfaceArea} m²
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 text-epa-green flex items-center" 
              onClick={() => setIsEditingSurfaceArea(true)}
            >
              <Edit2 className="h-3 w-3 mr-1" /> Wijzigen
            </Button>
          </div>
          
          {isEditingSurfaceArea && (
            <div className="mt-2 flex items-start gap-2">
              <Input
                type="number"
                value={manualSurfaceArea}
                onChange={handleSurfaceAreaChange}
                className="w-24 text-sm"
                placeholder="Oppervlakte"
              />
              <span className="mt-2">m²</span>
              <Button 
                size="sm" 
                className="bg-epa-green text-white" 
                onClick={applyManualSurfaceArea}
              >
                Toepassen
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditingSurfaceArea(false)}
              >
                Annuleren
              </Button>
            </div>
          )}
          
          {calculatedPrice && (
            <p className="mt-1 font-medium text-epa-green">
              Berekende prijs: €{calculatedPrice} incl. BTW
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressLookup;
