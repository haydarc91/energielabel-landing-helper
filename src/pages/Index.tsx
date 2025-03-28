
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Process from '@/components/Process';
import AboutUs from '@/components/AboutUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import PricingSection from '@/components/ContactForm';
import ServiceArea from '@/components/ServiceArea';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title = "EPA Woninglabel | Officieel Energielabel Vanaf €285";
    
    // Set meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Krijg snel en professioneel een officieel energielabel voor uw woning. EPA gecertificeerde adviseurs, geldig voor 10 jaar en geregistreerd bij RVO.");
    }
    
    // Use Unsplash images instead of local files to ensure they load
    const preloadImages = [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', // Dutch house
      'https://images.unsplash.com/photo-1550093786-fdca3c19c416?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80', // Energy label colors
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', // Detached house
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', // Apartment building
      'https://images.unsplash.com/photo-1429041966141-44d228a42775?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' // Rush service
    ];
    
    preloadImages.forEach(imgSrc => {
      const img = new Image();
      img.src = imgSrc;
    });
    
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

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <Process />
        <ServiceArea />
        <Testimonials />
        <FAQ />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
