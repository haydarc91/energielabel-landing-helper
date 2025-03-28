
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation for hero elements
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

  return (
    <section 
      ref={heroRef}
      id="home"
      aria-label="Energielabel voor woningen"
      className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-16 px-6 md:px-8 lg:px-12 transition-opacity duration-1000 opacity-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
      }}
    >
      {/* Background Decoration */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-40 animate-float"
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-30 animate-float"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left z-10">
          <div className="flex items-center mb-6">
            <h1 
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl opacity-0 font-bold leading-tight text-balance"
            >
              Energielabel voor uw woning <br/>
              <span className="text-epa-green">Vanaf €285</span>
            </h1>
            <div className="ml-4 hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1550093786-fdca3c19c416?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80" 
                alt="Energielabel kleuren A tot G" 
                className="h-20 w-auto" 
              />
            </div>
          </div>
          
          <p 
            ref={subtitleRef}
            className="opacity-0 text-lg md:text-xl text-gray-600 max-w-3xl mb-10 text-balance"
          >
            Krijg snel en professioneel uw energielabel voor uw woning. EPA gecertificeerde adviseurs. Geldig voor 10 jaar en geregistreerd bij RVO.
          </p>
          
          <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-start gap-4">
            <a 
              href="#contact" 
              className="button-transition bg-epa-green hover:bg-epa-green-dark text-white px-8 py-3 rounded-md text-base md:text-lg font-medium flex items-center gap-2 group w-64 sm:w-auto justify-center"
              rel="nofollow"
            >
              Direct aanvragen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#process" 
              className="button-transition border border-gray-300 hover:border-epa-green-dark text-gray-800 px-8 py-3 rounded-md text-base md:text-lg font-medium w-64 sm:w-auto text-center"
            >
              Bekijk werkwijze
            </a>
          </div>
        </div>
        
        <div 
          ref={imageRef} 
          className="opacity-0 relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
            alt="Nederlandse woning met energielabel" 
            className="w-full h-full object-cover"
            loading="eager"
            width="1170"
            height="780"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg max-w-[260px]">
            <div className="text-epa-green font-bold text-xl mb-1">Vaste tarieven</div>
            <p className="text-gray-700 text-sm">Transparante prijzen voor energielabels zonder verrassingen.</p>
          </div>
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
    </section>
  );
};

export default Hero;
