
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import PricingSection from '@/components/ContactForm';
import ServiceArea from '@/components/ServiceArea';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Send, ArrowUp } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    // Update document title for SEO
    document.title = "EPA Woninglabel | Officieel Energielabel Vanaf €285";
    
    // Set meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Krijg snel en professioneel een officieel energielabel voor uw woning. EPA gecertificeerde adviseurs, geldig voor 10 jaar en geregistreerd bij RVO.");
    }
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const id = href.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 80, // Account for navbar height
          behavior: 'smooth'
        });
      }
    };

    // Check scroll position for showing back-to-top and floating CTA
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contactSection = document.getElementById('contact');
      const contactPosition = contactSection?.offsetTop || 0;
      
      setShowScrollTop(scrollPosition > 300);
      
      // Show floating CTA when scrolled beyond hero but not yet at contact form
      setShowFloatingCTA(
        scrollPosition > 600 && 
        scrollPosition < (contactPosition - 300)
      );
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Process />
        
        {/* Call to action after Process */}
        <div className="py-8 bg-epa-green/10 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium">Klaar voor een officieel energielabel?</h3>
            <p className="mb-6 text-gray-600">
              Vraag direct uw energielabel aan en profiteer van onze expertise en scherpe tarieven.
            </p>
            <Button 
              size="lg" 
              className="bg-epa-green hover:bg-epa-green-dark text-white"
              onClick={scrollToContact}
            >
              <Send className="mr-2 h-4 w-4" /> Direct aanvragen
            </Button>
          </div>
        </div>
        
        <ServiceArea />
        <AboutUs />
        
        {/* Call to action after Testimonials */}
        <div className="py-8 bg-epa-green/5 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium">Wilt u weten wat anderen van onze service vinden?</h3>
            <Button 
              variant="outline" 
              className="mr-4 border-epa-green text-epa-green hover:bg-epa-green/10"
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Bekijk reviews
            </Button>
            <Button 
              className="bg-epa-green hover:bg-epa-green-dark text-white"
              onClick={scrollToContact}
            >
              <Send className="mr-2 h-4 w-4" /> Direct aanvragen
            </Button>
          </div>
        </div>
        
        <Testimonials />
        <FAQ />
        <PricingSection />
      </main>
      <Footer />
      
      {/* Floating back to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-epa-green text-white shadow-lg hover:bg-epa-green-dark transition-all duration-300"
          aria-label="Terug naar boven"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      {/* Floating CTA button */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 left-6 z-50 shadow-lg transition-all duration-300">
          <Button 
            size="lg" 
            className="bg-epa-green hover:bg-epa-green-dark text-white"
            onClick={scrollToContact}
          >
            <Send className="mr-2 h-4 w-4" /> Aanvraag energielabel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
