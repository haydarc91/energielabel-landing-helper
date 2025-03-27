
interface Address {
  postcode: string;
  number: string;
  street: string;
  city: string;
  municipality: string;
  province: string;
  surfaceArea?: number;
}

export async function lookupAddress(postcode: string, houseNumber: string): Promise<Address | null> {
  try {
    // Remove spaces and convert to uppercase for consistent format
    const formattedPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    // For demo purposes: Simulate API call and return mock data
    // In production, you would use the real PostcodeAPI:
    // const response = await fetch(`https://api.postcodeapi.nu/v2/addresses/?postcode=${formattedPostcode}&number=${houseNumber}`, {
    //   headers: {
    //     'X-Api-Key': 'YOUR_API_KEY'
    //   }
    // });
    // const data = await response.json();
    
    // Mock response simulation
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Generate some fake data based on the input
    const mockAddresses: {[key: string]: Address} = {
      "1234AB": {
        postcode: "1234 AB",
        number: "10",
        street: "Voorbeeldstraat",
        city: "Amsterdam",
        municipality: "Amsterdam",
        province: "Noord-Holland",
        surfaceArea: 125
      },
      "4321ZY": {
        postcode: "4321 ZY",
        number: "42",
        street: "Testlaan",
        city: "Utrecht",
        municipality: "Utrecht",
        province: "Utrecht",
        surfaceArea: 180
      },
      "5678CD": {
        postcode: "5678 CD",
        number: "7",
        street: "Monstertstraat",
        city: "Amersfoort",
        municipality: "Amersfoort",
        province: "Utrecht",
        surfaceArea: 210
      }
    };
    
    // Check if we have mock data for this postcode
    const mockPostcode = formattedPostcode.substring(0, 4) + formattedPostcode.substring(4, 6);
    if (mockAddresses[mockPostcode] && mockAddresses[mockPostcode].number === houseNumber) {
      return mockAddresses[mockPostcode];
    }
    
    // Random data for any postcode
    return {
      postcode: formattedPostcode.substring(0, 4) + " " + formattedPostcode.substring(4, 6),
      number: houseNumber,
      street: "Teststraat",
      city: "Amersfoort",
      municipality: "Amersfoort",
      province: "Utrecht",
      surfaceArea: Math.floor(Math.random() * 300) + 50 // Random surface area between 50 and 350 m²
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

export function calculatePrice(propertyType: string, surfaceArea: number): number {
  // Base prices
  const basePrices = {
    apartment: 285,
    terraced: 285,
    "semi-detached": 285,
    detached: 350,
    other: 285
  };
  
  // Get base price
  const basePrice = basePrices[propertyType as keyof typeof basePrices] || 285;
  
  // Additional cost for larger properties (for detached homes)
  let additionalCost = 0;
  
  if (propertyType === "detached" && surfaceArea > 200) {
    // Calculate how many 25m² increments above 200m²
    const extraIncrements = Math.ceil((surfaceArea - 200) / 25);
    additionalCost = extraIncrements * 50;
  }
  
  return basePrice + additionalCost;
}
