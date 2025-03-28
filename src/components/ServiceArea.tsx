import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, Check } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';
import type { Map } from 'leaflet';

const ServiceArea = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<Map | null>(null);
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);
  
  useEffect(() => {
    // Only load and initialize if the map ref exists
    if (!mapRef.current) return;

    // Initialize map script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    
    // Add CSS for the map
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    
    document.head.appendChild(link);
    document.body.appendChild(script);
    
    let mapInstance: Map | null = null;
    
    script.onload = () => {
      if (mapRef.current && window.L) {
        // Center coordinates for Amersfoort
        const amersfoortCoords: [number, number] = [52.1561, 5.3878];
        
        // Create the map centered on Amersfoort
        mapInstance = window.L.map(mapRef.current).setView(amersfoortCoords, 9);
        leafletMapRef.current = mapInstance;
        
        // Add the tile layer (map styling)
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
        // Add Amersfoort marker
        const amersfoortMarker = window.L.marker(amersfoortCoords)
          .addTo(mapInstance)
          .bindPopup('<b>Amersfoort</b><br>Ons hoofdkantoor');
        
        // Draw 80km radius circle around Amersfoort
        window.L.circle(amersfoortCoords, {
          color: '#10B981',
          fillColor: '#10B981',
          fillOpacity: 0.1,
          radius: 80000 // 80km in meters
        }).addTo(mapInstance);
        
        // Add markers for cities within the service area
        const serviceCities = [
          { name: "Utrecht", coords: [52.0907, 5.1214] as [number, number] },
          { name: "Amsterdam", coords: [52.3676, 4.9041] as [number, number] },
          { name: "Apeldoorn", coords: [52.2112, 5.9699] as [number, number] },
          { name: "Zwolle", coords: [52.5168, 6.0830] as [number, number] },
          { name: "Enschede", coords: [52.2215, 6.8936] as [number, number] },
          { name: "Arnhem", coords: [51.9851, 5.8987] as [number, number] },
          { name: "Nijmegen", coords: [51.8425, 5.8372] as [number, number] },
          { name: "Den Bosch", coords: [51.6998, 5.3042] as [number, number] }
        ];
        
        // Add markers for cities in service area
        serviceCities.forEach(city => {
          window.L.marker(city.coords)
            .addTo(mapInstance!)
            .bindPopup(`<b>${city.name}</b><br>Energielabel service beschikbaar`);
        });
        
        // Disable zoom to keep the map clean and focused
        mapInstance!.scrollWheelZoom.disable();
        mapInstance!.doubleClickZoom.disable();
      }
    };
    
    return () => {
      // Clean up
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section 
      id="service-area" 
      className="section-padding bg-white"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Ons werkgebied</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Wij verlenen onze diensten in een straal van 80 kilometer rondom Amersfoort. Onze EPA-adviseurs komen naar u toe voor een professionele opname.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map container */}
          <div className="h-[500px] rounded-xl overflow-hidden shadow-xl">
            <div ref={mapRef} className="w-full h-full"></div>
          </div>

          {/* Service details */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Werkgebied Amersfoort en omgeving</h3>
              <p className="text-gray-600 mb-4">
                Onze ervaren EPA-adviseurs zijn actief in een straal van 80 kilometer rondom Amersfoort. Dit omvat grote steden zoals Utrecht, Amsterdam, Apeldoorn en diverse gemeenten in de provincies Utrecht, Noord-Holland, Flevoland en Gelderland.
              </p>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-epa-green flex-shrink-0 mt-1" />
                <p>Beschikbaar in Amersfoort en omliggende gemeenten binnen 80km</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Spoedservice binnen 24 uur</h3>
              <p className="text-gray-600 mb-4">
                Heeft u met spoed een energielabel nodig? Wij bieden een spoedservice waarbij we binnen 24 uur 
                een opname kunnen inplannen en het energielabel kunnen afgeven.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-amber-800">Spoedtoeslag: €95 incl. BTW</p>
                    <p className="text-amber-700 text-sm">Opname en afgifte binnen 24 uur mogelijk</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Check className="h-5 w-5 text-epa-green flex-shrink-0 mt-1" />
                <p>Dezelfde kwaliteit en geldigheid als bij reguliere aanvragen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
