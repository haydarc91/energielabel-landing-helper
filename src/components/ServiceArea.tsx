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
        // Center coordinates for Netherlands
        const center: [number, number] = [52.1326, 5.2913];
        
        // Create the map
        mapInstance = window.L.map(mapRef.current).setView(center, 7);
        leafletMapRef.current = mapInstance;
        
        // Add the tile layer (map styling)
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
        // Add Netherlands outline - simplified GeoJSON
        fetch('/netherlands-outline.json')
          .then(response => response.json())
          .then(data => {
            window.L.geoJSON(data, {
              style: {
                color: '#10B981',
                weight: 3,
                fillColor: '#10B981',
                fillOpacity: 0.1
              }
            }).addTo(mapInstance!);

            // Add marker to indicate service area
            const mainCities = [
              { name: "Amsterdam", coords: [52.3676, 4.9041] as [number, number] },
              { name: "Rotterdam", coords: [51.9244, 4.4777] as [number, number] },
              { name: "Den Haag", coords: [52.0705, 4.3007] as [number, number] },
              { name: "Utrecht", coords: [52.0907, 5.1214] as [number, number] },
              { name: "Eindhoven", coords: [51.4416, 5.4697] as [number, number] },
              { name: "Groningen", coords: [53.2194, 6.5665] as [number, number] }
            ];
            
            // Add markers for main cities
            mainCities.forEach(city => {
              window.L.marker(city.coords)
                .addTo(mapInstance!)
                .bindPopup(`<b>${city.name}</b><br>Energielabel service beschikbaar`);
            });
            
            // Disable zoom to keep the map clean and focused
            mapInstance!.scrollWheelZoom.disable();
            mapInstance!.doubleClickZoom.disable();
          })
          .catch(error => {
            console.error('Error loading Netherlands GeoJSON:', error);
            // Fallback to just showing the map without outline
          });
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
            Wij verlenen onze diensten in heel Nederland. Onze EPA-adviseurs komen naar u toe, waar u ook woont.
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
              <h3 className="text-2xl font-semibold mb-4">Landelijke dekking</h3>
              <p className="text-gray-600 mb-4">
                Onze ervaren EPA-adviseurs zijn actief in heel Nederland. Of u nu in een drukke stad of een rustig dorp woont, 
                wij komen bij u langs voor het opnemen en afgeven van een officieel energielabel.
              </p>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-epa-green flex-shrink-0 mt-1" />
                <p>Beschikbaar in alle provincies en gemeenten van Nederland</p>
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
