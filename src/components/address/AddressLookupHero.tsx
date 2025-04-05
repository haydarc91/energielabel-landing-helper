import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Component for the hero section address lookup
const AddressLookupHero = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState<any>(null);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  
  const formSchema = z.object({
    postcode: z.string()
      .min(6, { message: "Postcode moet minimaal 6 karakters zijn" })
      .max(7, { message: "Postcode kan maximaal 7 karakters zijn" })
      .regex(/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/, { 
        message: "Voer een geldige postcode in (bijv. 1234AB)" 
      }),
    houseNumber: z.string()
      .min(1, { message: "Huisnummer is verplicht" })
      .regex(/^[0-9]+$/, { message: "Alleen cijfers toegestaan voor huisnummer" }),
    houseNumberAddition: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postcode: "",
      houseNumber: "",
      houseNumberAddition: "",
    },
  });
  
  // Helper function to format postcode
  const formatPostcode = (postcode: string) => {
    // Remove all spaces
    let formatted = postcode.replace(/\s/g, '');
    // Convert to uppercase
    formatted = formatted.toUpperCase();
    
    // If the postcode has the correct length, add a space after the first 4 characters
    if (formatted.length >= 6) {
      formatted = formatted.substring(0, 4) + ' ' + formatted.substring(4);
    }
    
    return formatted;
  };
  
  // Handle postcode input changes
  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPostcode(e.target.value);
    form.setValue('postcode', formatted);
  };
  
  // Fetch address information from BAG API
  const fetchAddress = async (postcode: string, houseNumber: string) => {
    setIsLoading(true);
    
    try {
      // Format the postcode by removing spaces and converting to lowercase
      const formattedPostcode = postcode.replace(/\s/g, '').toLowerCase();
      
      // API Key for BAG API
      const apiKey = 'l7f8360199ce744def90a8439b335344d6';
      
      // Build API URL
      const url = `https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=${formattedPostcode}&huisnummer=${houseNumber}`;
      
      // Make API request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/hal+json',
          'Accept-Crs': 'epsg:28992',
          'X-Api-Key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`BAG API responded with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data._embedded && data._embedded.adressen && data._embedded.adressen.length > 0) {
        const address = data._embedded.adressen[0];
        
        // Create formatted address
        const formattedAddress = `${address.openbareRuimteNaam} ${address.huisnummer}${form.getValues('houseNumberAddition') || ''}`;
        const fullAddress = `${formattedAddress}, ${address.postcode} ${address.woonplaatsNaam}`;
        
        // Extract property information
        const propertyData = {
          address: formattedAddress,
          postcode: address.postcode,
          city: address.woonplaatsNaam,
          houseNumber: address.huisnummer,
          houseNumberAddition: form.getValues('houseNumberAddition') || '',
          propertyType: address.gebruiksdoelen && address.gebruiksdoelen[0] === 'woonfunctie' ? 'Woning' : 'Anders',
          surfaceArea: address.oppervlakte || 0,
          constructionYear: address.oorspronkelijkBouwjaar && address.oorspronkelijkBouwjaar[0] || 'onbekend'
        };
        
        setPropertyInfo(propertyData);
        setShowPropertyInfo(true);
        
        // Store in localStorage for use in contact form
        localStorage.setItem('propertyInfo', JSON.stringify(propertyData));
        
        return propertyData;
      } else {
        throw new Error('Geen adres gevonden voor deze combinatie van postcode en huisnummer.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast({
        title: "Fout bij ophalen adresgegevens",
        description: error.message || "Er is een fout opgetreden bij het ophalen van het adres. Controleer de postcode en het huisnummer.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const propertyData = await fetchAddress(values.postcode, values.houseNumber);
    
    if (propertyData) {
      // Success, auto-scroll to contact section
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  };
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="1234 AB" 
                      {...field} 
                      onChange={handlePostcodeChange}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="col-span-2 sm:col-span-1 grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="houseNumber"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Huisnr</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123" 
                        {...field} 
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="houseNumberAddition"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Toevoeging</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="A" 
                        {...field} 
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-epa-green hover:bg-epa-green-dark" 
              disabled={isLoading}
            >
              {isLoading ? "Laden..." : "Bereken prijs"}
            </Button>
          </div>
        </form>
      </Form>
      
      {showPropertyInfo && propertyInfo && (
        <div className="highlight-section mt-4 p-4 bg-white/90 rounded-lg">
          <h4 className="font-medium text-lg mb-2">Gegevens gevonden!</h4>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Adres:</strong> {propertyInfo.address}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Postcode:</strong> {propertyInfo.postcode}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Plaats:</strong> {propertyInfo.city}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Oppervlakte:</strong> {propertyInfo.surfaceArea} m²
          </p>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Bouwjaar:</strong> {propertyInfo.constructionYear}
          </p>
          
          <Button 
            className="w-full text-sm mt-2 bg-epa-green hover:bg-epa-green-dark"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Aanvragen voor €{Math.max(285, Math.round(propertyInfo.surfaceArea * 2.3))},-
          </Button>
        </div>
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
    </>
  );
};

export default AddressLookupHero;
