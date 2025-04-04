
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import Footer from '@/components/Footer';
import PricingCards from './pricing/PricingCards';
import { Button } from '@/components/ui/button';
import { Send, ArrowRight, Check, Map, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'react-router-dom';

interface PageSectionContent {
  title: string | null;
  subtitle: string | null;
  content: string | null;
}

interface PageContent {
  [key: string]: PageSectionContent;
}

const LandingPage = () => {
  const { location } = useParams();
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [addressDetails, setAddressDetails] = useState<any | null>(null);
  
  useEffect(() => {
    document.title = `Energielabel ${location || ''} | Professioneel EPA Energielabel`;
    
    const fetchPageContent = async () => {
      setIsLoading(true);
      try {
        const pagePath = `/energielabel-${location}`;
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('page_path', pagePath);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform data into structured format by section_name
          const contentBySection = data.reduce((acc: PageContent, item) => {
            acc[item.section_name] = {
              title: item.title,
              subtitle: item.subtitle,
              content: item.content
            };
            return acc;
          }, {});
          
          setPageContent(contentBySection);
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (location) {
      fetchPageContent();
    }
  }, [location]);

  // Default content if not found in database
  const heroTitle = pageContent.hero?.title || `Energielabel voor uw woning in ${location || 'Nederland'}`;
  const heroSubtitle = pageContent.hero?.subtitle || 'Professioneel energielabel door EPA-adviseurs';
  const heroContent = pageContent.hero?.content || `Snel en professioneel uw energielabel voor uw woning in ${location || 'Nederland'} regelen met onze expertise.`;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center pt-24 pb-16 px-6 md:px-8 lg:px-12" style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
        }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left z-10">
              <h1 className="font-bold mb-6 leading-tight">
                {heroTitle} <br />
                <span className="text-epa-green">Vanaf €285</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
                {heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href="#contact" className="button-transition bg-epa-green hover:bg-epa-green-dark text-white px-8 py-3 rounded-md text-base md:text-lg font-medium flex items-center gap-2 group w-64 sm:w-auto justify-center" rel="nofollow">
                  Direct aanvragen
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#benefits" className="button-transition border border-gray-300 hover:border-epa-green-dark text-gray-800 px-8 py-3 rounded-md text-base md:text-lg font-medium w-64 sm:w-auto text-center">
                  Lees meer
                </a>
              </div>
              
              <div className="mt-10 space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-epa-green" /> Gecertificeerd EPA-adviseur
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-epa-green" /> Geldig voor 10 jaar
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-epa-green" /> Officieel geregistreerd bij RVO
                </p>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/b8ea83af-2c34-4288-ae0d-4fbe4f13a608.png" 
                alt={`Energielabel woning ${location || 'Nederland'}`}
                loading="eager" 
                width="1170" 
                height="780" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg max-w-[260px]">
                <div className="text-epa-green font-bold text-xl mb-1">EPA Energielabel</div>
                <p className="text-gray-700 text-sm">
                  {heroContent}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Intro Section */}
        <section id="intro" className="py-20 px-6 md:px-8 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-4 text-left">{pageContent.intro?.title || `Energielabel specialist in ${location || 'Nederland'}`}</h2>
                <h3 className="text-xl font-normal text-gray-600 mb-6 text-left">
                  {pageContent.intro?.subtitle || `Lokale EPA-adviseurs met kennis van ${location || 'Nederland'}`}
                </h3>
                <div className="text-gray-600 space-y-4 text-left">
                  <p>{pageContent.intro?.content || `Als u een woning wilt verkopen of verhuren in ${location || 'Nederland'}, heeft u een geldig energielabel nodig. Onze adviseurs kennen de lokale woningmarkt goed en kunnen u snel van dienst zijn met een officieel energielabel.`}</p>
                  
                  <p>Een energielabel geeft aan hoe energiezuinig uw woning is en waar mogelijke verbeterpunten liggen. Dit label is verplicht bij de verkoop, verhuur of oplevering van woningen.</p>
                </div>
                
                <div className="mt-8">
                  <Button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-epa-green hover:bg-epa-green-dark text-white"
                  >
                    <Send className="mr-2 h-4 w-4" /> Direct aanvragen
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-epa-green-light rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center mb-4">
                    <Star className="h-7 w-7 text-epa-green" />
                  </div>
                  <h4 className="font-medium mb-2">Onafhankelijk</h4>
                  <p className="text-sm text-gray-600">Professioneel en onafhankelijk advies door gecertificeerde adviseurs</p>
                </div>
                
                <div className="bg-epa-green-light rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center mb-4">
                    <Map className="h-7 w-7 text-epa-green" />
                  </div>
                  <h4 className="font-medium mb-2">Lokaal actief</h4>
                  <p className="text-sm text-gray-600">{`Experts met kennis van woningen in ${location || 'Nederland'} en omgeving`}</p>
                </div>
                
                <div className="col-span-2 bg-epa-green-light rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-white text-epa-green text-xl font-bold px-4 py-1 rounded-full">
                      €285
                    </div>
                    <p className="text-sm mt-1">Vanaf prijs incl. BTW</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-epa-green hover:bg-gray-100 w-full"
                    >
                      <Send className="mr-2 h-4 w-4" /> Offerte aanvragen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-6 md:px-8 lg:px-12 bg-epa-green/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">{pageContent.benefits?.title || `Voordelen van ons energielabel in ${location || 'Nederland'}`}</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {pageContent.benefits?.subtitle || `Waarom kiezen voor EPA Woninglabel in ${location || 'Nederland'}?`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageContent.benefits?.content?.split('\n').map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                  <div className="h-10 w-10 bg-epa-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-epa-green" />
                  </div>
                  <p>{benefit.replace(/^✓\s*/, '')}</p>
                </div>
              )) || (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                    <div className="h-10 w-10 bg-epa-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-epa-green" />
                    </div>
                    <p>{`Snelle service in heel ${location || 'Nederland'} en omgeving`}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                    <div className="h-10 w-10 bg-epa-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-epa-green" />
                    </div>
                    <p>Deskundige EPA-adviseurs met lokale kennis</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                    <div className="h-10 w-10 bg-epa-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-epa-green" />
                    </div>
                    <p>Scherpe tarieven zonder verborgen kosten</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6 md:px-8 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Onze tarieven voor uw energielabel</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Vaste tarieven zonder verrassingen achteraf. Inclusief opname, berekeningen en registratie.
              </p>
            </div>
            
            <PricingCards />
            
            <div className="bg-epa-green/5 p-8 rounded-lg mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Vraag direct uw energielabel aan</h3>
                  <p className="text-gray-600 mb-6">
                    {`Vul het formulier in en ontvang binnen 24 uur een reactie van ons team. Wij helpen u graag verder met het regelen van uw energielabel in ${location || 'Nederland'}.`}
                  </p>
                </div>
                
                <div id="contact" className="grid grid-cols-1 gap-6">
                  <ContactForm 
                    calculatedPrice={calculatedPrice}
                    setCalculatedPrice={setCalculatedPrice}
                    addressDetails={addressDetails}
                    setAddressDetails={setAddressDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
