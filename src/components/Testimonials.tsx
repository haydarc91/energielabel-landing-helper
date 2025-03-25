
import React, { useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Martijn de Vries",
    location: "Amsterdam",
    text: "Zeer tevreden over de snelle service. Na één telefoontje werd er snel een afspraak ingepland. Het energielabel was binnen 2 dagen na inspectie in mijn inbox. Aanrader!",
    rating: 5
  },
  {
    name: "Laura Bakker",
    location: "Utrecht",
    text: "Professionele en vriendelijke adviseur die duidelijk uitlegde wat er nodig was voor het energielabel. Het proces was eenvoudig en de prijs was zeer redelijk.",
    rating: 5
  },
  {
    name: "Thomas Jansen",
    location: "Rotterdam",
    text: "Geweldige ervaring met epawoninglabel.nl. Alles werd duidelijk uitgelegd en de inspectie werd grondig uitgevoerd. Precies wat ik nodig had voor de verkoop van mijn woning.",
    rating: 5
  },
  {
    name: "Sophie van Dijk",
    location: "Den Haag",
    text: "Snelle afhandeling en goede communicatie. De adviseur nam de tijd om al mijn vragen te beantwoorden. Binnen 3 dagen had ik mijn energielabel.",
    rating: 4
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef<HTMLButtonElement>(null);
  const scrollRightRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-padding bg-epa-gray"
      style={{
        background: 'linear-gradient(180deg, #F5F9F7 0%, #FFFFFF 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 opacity-0">
          <h2 className="mb-4">Wat onze klanten zeggen</h2>
          <p className="text-gray-600 text-lg">
            Ontdek waarom huiseigenaren voor ons kiezen
          </p>
        </div>

        <div className="relative">
          <div 
            ref={testimonialsRef}
            className="flex overflow-x-auto scrollbar-none gap-6 pb-8 px-4 snap-x"
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card rounded-xl p-6 flex-shrink-0 w-full md:w-[350px] snap-center"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="mt-auto">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            ref={scrollLeftRef}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center focus-ring button-transition hover:bg-epa-green hover:text-white z-10 hidden md:flex"
            aria-label="Scroll links"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            ref={scrollRightRef}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center focus-ring button-transition hover:bg-epa-green hover:text-white z-10 hidden md:flex"
            aria-label="Scroll rechts"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-epa-green font-medium">Gemiddelde beoordeling: 4.9/5 ⭐</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
