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

// Define content for a section directly without nesting
type SectionContent = {
  title: string | null;
  subtitle: string | null;
  content: string | null;
};

// Simple flat map of section names to their content
type PageContentMap = {
  [sectionName: string]: SectionContent;
};

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
          const contentMap: PageContentMap = {};
          
          for (const item of data) {
            contentMap[item.section_name] = {
              title: item.title,
              subtitle: item.subtitle,
              content: item.content
            };
          }
          
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
        {pageContent.hero && (
          <Hero
            title={pageContent.hero.title}
            subtitle={pageContent.hero.subtitle}
            description={pageContent.hero.content}
          />
        )}
        {pageContent.features && (
          <Features
            title={pageContent.features.title}
            subtitle={pageContent.features.subtitle}
            content={pageContent.features.content}
          />
        )}
        {pageContent.process && (
          <Process
            title={pageContent.process.title}
            subtitle={pageContent.process.subtitle}
            content={pageContent.process.content}
          />
        )}
        {pageContent.faq && (
          <FAQ
            title={pageContent.faq.title}
            subtitle={pageContent.faq.subtitle}
            content={pageContent.faq.content}
          />
        )}
        <PricingSection />
        {pageContent.about && (
          <AboutUs
            title={pageContent.about.title}
            subtitle={pageContent.about.subtitle}
            content={pageContent.about.content}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
