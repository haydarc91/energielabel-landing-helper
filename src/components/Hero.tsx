
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HeroContent {
  title: string | null;
  subtitle: string | null;
  content: string | null;
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    content: 'Innovatief energielabel voor moderne, duurzame woningen'
  });

  useEffect(() => {
    // Fetch content from Supabase
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('title, subtitle, content')
          .eq('section_name', 'hero')
          .single();
        
        if (error) throw error;
        
        if (data) {
          setContent({
            title: data.title,
            subtitle: data.subtitle,
            content: data.content
          });
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };
    
    fetchContent();

    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;

    if (hero && title && subtitle && cta && image) {
      hero.style.opacity = '1';
      setTimeout(() => {
        title.classList.add('animate-fade-in');
      }, 200);
      setTimeout(() => {
        subtitle.classList.add('animate-fade-in');
      }, 400);
      setTimeout(() => {
        cta.classList.add('animate-fade-in');
      }, 600);
      setTimeout(() => {
        image.classList.add('animate-fade-in');
      }, 800);
    }
  }, []);

  return <section ref={heroRef} id="home" aria-label="Energielabel voor woningen" className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-16 px-6 md:px-8 lg:px-12 transition-opacity duration-1000 opacity-0 overflow-hidden" style={{
    background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
  }}>
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-40 animate-float" style={{
      animationDelay: '0s'
    }} aria-hidden="true" />
      <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-30 animate-float" style={{
      animationDelay: '2s'
    }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left z-10">
          <h1 ref={titleRef} className="opacity-0 font-bold mb-6 leading-tight text-balance">
            Energielabel voor uw woning <br />
            <span className="text-epa-green">Vanaf €375</span>
          </h1>
          
          <p ref={subtitleRef} className="opacity-0 text-lg md:text-xl text-gray-600 max-w-3xl mb-10 text-balance">
            {content.subtitle || 'Krijg snel en professioneel uw energielabel voor uw woning. EPA gecertificeerde adviseurs. Geldig voor 10 jaar en geregistreerd bij RVO.'}
          </p>
          
          <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-start gap-4">
            <a href="#contact" className="button-transition bg-epa-green hover:bg-epa-green-dark text-white px-8 py-3 rounded-md text-base md:text-lg font-medium flex items-center gap-2 group w-64 sm:w-auto justify-center" rel="nofollow">
              Direct aanvragen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#process" className="button-transition border border-gray-300 hover:border-epa-green-dark text-gray-800 px-8 py-3 rounded-md text-base md:text-lg font-medium w-64 sm:w-auto text-center">
              Bekijk werkwijze
            </a>
          </div>
        </div>
        
        <div ref={imageRef} className="opacity-0 relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
          <picture>
            <source 
              media="(min-width: 1024px)" 
              srcSet="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png 1200w" 
              sizes="(min-width: 1024px) 600px" 
            />
            <source 
              media="(min-width: 640px)" 
              srcSet="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png 800w" 
              sizes="(min-width: 640px) 500px" 
            />
            <img 
              src="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png" 
              alt="Energielabel woning aanvragen" 
              loading="eager" 
              width="1170" 
              height="780" 
              className="w-full h-full object-cover"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 500px, 600px"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg max-w-[260px]">
            <div className="text-epa-green font-bold text-xl mb-1">Energie-efficiënt</div>
            <p className="text-gray-700 text-sm">{content.content || 'Innovatief energielabel voor moderne, duurzame woningen'}</p>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-32 text-center w-full max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">Erkend en geregistreerd bij</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="w-24 h-12 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">RVO</div>
          <div className="w-24 h-12 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">Rijksoverheid</div>
          <div className="w-24 h-12 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">EPBD</div>
        </div>
      </div>
    </section>;
};

export default Hero;
