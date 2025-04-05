
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import PricingSection from '@/components/pricing/PricingSection';
import ServiceArea from '@/components/ServiceArea';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Send, ArrowUp, MessageSquare } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const phoneNumber = '085-250 2302';
  const whatsappNumber = '31852502302'; // Without spaces or dashes for WhatsApp link

  useEffect(() => {
    document.title = "EPA Woninglabel | Officieel Energielabel Vanaf €285";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Krijg snel en professioneel een officieel energielabel voor uw woning. EPA gecertificeerde adviseurs, geldig voor 10 jaar en geregistreerd bij RVO.");
    }
    
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
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };

    const handleScroll = () => {
      const newScrollPosition = window.scrollY;
      setScrollPosition(newScrollPosition);
      
      const contactSection = document.getElementById('contact');
      const contactPosition = contactSection?.offsetTop || 0;
      
      setShowScrollTop(newScrollPosition > 300);
      
      setShowFloatingCTA(
        newScrollPosition > 600 && 
        newScrollPosition < (contactPosition - 300)
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
        
        <div className="py-8 bg-epa-green/5 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium">Weten wat een energielabel voor uw woning kost?</h3>
            <Button 
              className="bg-epa-green hover:bg-epa-green-dark text-white"
              onClick={scrollToContact}
            >
              <Send className="mr-2 h-4 w-4" /> Direct aanvragen
            </Button>
          </div>
        </div>
        
        <Process />
        
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
        
        <div className="py-8 bg-epa-green/10 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium">Nog vragen over het energielabel?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-epa-green text-epa-green hover:bg-epa-green/10"
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Bekijk veelgestelde vragen
              </Button>
              <Button 
                className="bg-epa-green hover:bg-epa-green-dark text-white"
                onClick={scrollToContact}
              >
                <Send className="mr-2 h-4 w-4" /> Direct aanvragen
              </Button>
            </div>
          </div>
        </div>
        
        <FAQ />
        
        <div className="py-12 bg-green-50 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium text-green-800">Snel contact via WhatsApp</h3>
            <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
              Heeft u direct vragen over uw energielabel? Neem snel contact op via WhatsApp. 
              Wij zijn bereikbaar van 08:00 tot 22:00 uur en staan klaar om u te helpen.
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg shadow-md"
            >
              <MessageSquare className="h-6 w-6" />
              Direct WhatsApp
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                Online
              </span>
            </a>
          </div>
        </div>
        
        <PricingSection />
      </main>
      <Footer />
      
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-epa-green text-white shadow-lg hover:bg-epa-green-dark transition-all duration-300"
          aria-label="Terug naar boven"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
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
