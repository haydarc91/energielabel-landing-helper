
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation for hero elements
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (hero && title && subtitle && cta) {
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
    }
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-16 px-6 md:px-8 lg:px-12 transition-opacity duration-1000 opacity-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
      }}
    >
      {/* Background Decoration */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-40 animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-30 animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="max-w-5xl mx-auto text-center z-10">
        <h1 
          ref={titleRef}
          className="opacity-0 font-bold mb-6 leading-tight text-balance"
        >
          Energielabel voor uw woning <br/>
          <span className="text-epa-green">Gemakkelijk en Betrouwbaar</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="opacity-0 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 text-balance"
        >
          Krijg snel en professioneel uw energielabel voor uw woning. EPA gecertificeerde adviseurs. Geldig voor 10 jaar en geregistreerd bij RVO.
        </p>
        
        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href="#contact" 
            className="button-transition bg-epa-green hover:bg-epa-green-dark text-white px-8 py-3 rounded-md text-base md:text-lg font-medium flex items-center gap-2 group w-64 sm:w-auto justify-center"
          >
            Vraag offerte aan
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a 
            href="#process" 
            className="button-transition border border-gray-300 hover:border-epa-green-dark text-gray-800 px-8 py-3 rounded-md text-base md:text-lg font-medium w-64 sm:w-auto"
          >
            Bekijk werkwijze
          </a>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="mt-20 md:mt-32 text-center w-full max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">Erkend en geregistreerd bij</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="w-24 h-12 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">RVO</div>
          <div className="w-24 h-12 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">Rijksoverheid</div>
          <div className="w-24 h-12 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">EPBD</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
