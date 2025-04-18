
import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, Check } from 'lucide-react';
import { useIntersectionAnimation } from '@/lib/animations';
import type { Map } from 'leaflet';

const ServiceArea = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<Map | null>(null);
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);
  
  useEffect(() => {
    if (!mapRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    
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
        const amersfoortCoords: [number, number] = [52.1561, 5.3878];
        
        // Use a smaller zoom level (7 instead of 8) to show more area on mobile
        const isMobile = window.innerWidth < 640;
        const zoomLevel = isMobile ? 7 : 7.5;
        
        mapInstance = window.L.map(mapRef.current).setView(amersfoortCoords, zoomLevel);
        leafletMapRef.current = mapInstance;
        
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
        const serviceCities = [
          { name: "Amsterdam", coords: [52.3676, 4.9041] as [number, number] },
          { name: "Rotterdam", coords: [51.9225, 4.4792] as [number, number] },
          { name: "Utrecht", coords: [52.0908, 5.1222] as [number, number] },
          { name: "Den Haag", coords: [52.0705, 4.3007] as [number, number] },
          { name: "Leiden", coords: [52.1601, 4.4835] as [number, number] },
          { name: "Haarlem", coords: [52.3874, 4.6462] as [number, number] },
          { name: "Zwolle", coords: [52.5200, 6.0833] as [number, number] },
          { name: "Arnhem", coords: [51.9851, 5.8987] as [number, number] }
        ];
        
        serviceCities.forEach(city => {
          window.L.marker(city.coords)
            .addTo(mapInstance!)
            .bindPopup(`<b>${city.name}</b><br>Energielabel service beschikbaar`);
        });
        
        window.L.circle(amersfoortCoords, {
          color: '#10B981',
          fillColor: '#10B981',
          fillOpacity: 0.1,
          radius: 80000 // 80 km radius
        }).addTo(mapInstance);
        
        mapInstance!.scrollWheelZoom.disable();
        mapInstance!.doubleClickZoom.disable();
      }
    };
    
    return () => {
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
            Wij verlenen onze diensten in alle provincies binnen een straal van 80 km rondom Amersfoort. 
            Onze EPA-adviseurs komen naar u toe voor een professionele opname in deze regio's.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[500px] rounded-xl overflow-hidden shadow-xl">
            <div ref={mapRef} className="w-full h-full" aria-label="Kaart van werkgebied rondom Amersfoort"></div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Werkgebied rondom Amersfoort</h3>
              <p className="text-gray-600 mb-4">
                Onze service beslaat een gebied van 80 km rondom Amersfoort, 
                wat nagenoeg de gehele provincies Utrecht, Gelderland, Noord-Holland en Zuid-Holland omvat.
              </p>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-epa-green flex-shrink-0 mt-1" />
                <p>Beschikbaar in een groot deel van Midden- en West-Nederland</p>
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
