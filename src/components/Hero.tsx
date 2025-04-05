
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
          .is('page_path', null)
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
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{heroContent.title}</h1>
            <p className="text-2xl text-epa-green font-semibold mb-4">{heroContent.subtitle}</p>
            <p className="text-lg text-gray-600 mb-8">{heroContent.content}</p>
            
            <AddressLookupHero />
            
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
          
          <div className="hidden md:block">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Modern home with energy label" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-2xl mr-3">A</div>
                  <div>
                    <span className="block font-medium">Energielabel A</span>
                    <span className="text-sm text-green-200">Zeer energiezuinig</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-epa-green mr-1" />
                  <span className="text-sm">Woningen in heel Nederland</span>
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
