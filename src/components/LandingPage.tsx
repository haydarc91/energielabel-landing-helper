
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import PricingSection from '@/components/pricing/PricingSection';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'react-router-dom';

// Simple interface for section content
interface SectionContent {
  title: string | null;
  subtitle: string | null;
  content: string | null;
}

// Simple record type to avoid recursive type definition
type PageContentMap = Record<string, SectionContent>;

const LandingPage = () => {
  const { location } = useParams();
  const [pageContent, setPageContent] = useState<PageContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Energielabel ${location} | Officieel Energielabel voor uw woning`;
    
    const fetchPageContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('section_name, title, subtitle, content')
          .eq('page_path', `/energielabel-${location}`);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform the array into an object with section names as keys
          const contentMap = data.reduce<PageContentMap>((acc, item) => {
            acc[item.section_name] = {
              title: item.title,
              subtitle: item.subtitle,
              content: item.content
            };
            return acc;
          }, {});
          
          setPageContent(contentMap);
        }
        
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageContent();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Process />
        <FAQ />
        <PricingSection />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
