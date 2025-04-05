
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useIntersectionAnimation } from '@/lib/animations';
import AddressLookupHero from './address/AddressLookupHero';
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Energielabel voor uw woning',
    subtitle: 'Vanaf €285',
    content: 'Krijg snel en professioneel uw energielabel voor uw woning. EPA gecertificeerde adviseurs. Geldig voor 10 jaar en geregistreerd bij RVO.'
  });
  
  const sectionRef = useIntersectionAnimation('animate-fade-in', 0.1, 0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('title, subtitle, content')
          .eq('section_name', 'hero')
          .single();
        
        if (error) {
          console.error('Error fetching hero content:', error);
          return;
        }
        
        if (data) {
          setHeroContent({
            title: data.title || heroContent.title,
            subtitle: data.subtitle || heroContent.subtitle,
            content: data.content || heroContent.content
          });
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };
    
    fetchContent();
  }, []);

  const scrollToProcess = () => {
    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-32 pb-24 relative overflow-hidden" ref={sectionRef as React.RefObject<HTMLDivElement>}>
      <div className="absolute inset-0 bg-gradient-to-b from-epa-green-light/20 to-white -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{heroContent.title}</h1>
            <p className="text-2xl text-epa-green font-semibold mb-4">{heroContent.subtitle}</p>
            <p className="text-lg text-gray-600 mb-8">{heroContent.content}</p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-epa-green hover:bg-epa-green-dark text-white"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Direct aanvragen
              </Button>
              <Button 
                variant="outline" 
                className="border-epa-green text-epa-green hover:bg-epa-green-light"
                onClick={scrollToProcess}
              >
                Bekijk werkwijze
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative rounded-xl shadow-xl overflow-hidden">
              {/* Background image for the form */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80')" 
                }}
              ></div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-epa-green/60 to-blue-500/40"></div>
              
              {/* Form content */}
              <div className="relative p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">Bereken uw energielabel</h3>
                <div className="bg-white/90 p-5 rounded-lg shadow-lg">
                  <AddressLookupHero />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
