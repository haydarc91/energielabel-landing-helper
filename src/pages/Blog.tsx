
import React, { useEffect, useState } from 'react';
import NavigationLink from '../components/ui/navigation-link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '@/components/Seo';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Send, ArrowUp, MessageSquare, Zap, CheckCircle } from 'lucide-react';

interface BlogPost {
  id: string;
  section_name: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  page_path: string | null;
  last_updated: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const phoneNumber = '085-250 2302';

  useEffect(() => {
    fetchBlogPosts();

    // Scroll behavior
    const handleScroll = (() => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const newScrollPosition = window.scrollY;
            setShowScrollTop(newScrollPosition > 300);
            setShowFloatingCTA(newScrollPosition > 600 && newScrollPosition < 2000);
            ticking = false;
          });
          ticking = true;
        }
      };
    })();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll as EventListener);
    };
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_name', 'blog_article')
        .neq('page_path', '/blog/alle-kosten-voor-een-energielabel-op-een-rij')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractSlug = (pagePath: string | null) => {
    if (!pagePath) return '';
    return pagePath.replace('/blog/', '');
  };

  const getExcerpt = (content: string | null) => {
    if (!content) return '';
    const cleanContent = content.replace(/\n/g, ' ').trim();
    return cleanContent.length > 150 ? cleanContent.substring(0, 150) + '...' : cleanContent;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    window.location.href = "/#contact-section";
  };

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "EPA Woninglabel Blog",
    "description": "Ontdek alles over energielabels voor woningen. Praktische tips, stappenplannen en actuele informatie over energiebesparing en duurzaamheid.",
    "url": "https://www.epawoninglabel.nl/blog",
    "publisher": {
      "@type": "Organization",
      "name": "EPA Woninglabel",
      "url": "https://www.epawoninglabel.nl"
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Seo
        title="Energielabel Blog | Alles over Energielabels voor Woningen"
        description="Ontdek alles over energielabels voor woningen. Praktische tips, stappenplannen en actuele informatie over energiebesparing en duurzaamheid."
        canonical="https://www.epawoninglabel.nl/blog"
        jsonLd={blogListSchema}
      />
      <Navbar />
      
      <main className="w-full">
        {/* Hero Section */}
        <section id="blog-hero" aria-label="Energielabel Blog" className="min-h-[70vh] flex flex-col justify-center items-center relative pt-20 pb-16 px-6 md:px-8 lg:px-12 overflow-hidden" style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F9F7 100%)'
        }}>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-40 animate-float" style={{
            animationDelay: '0s'
          }} aria-hidden="true" />
          <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-epa-green-light blur-3xl opacity-30 animate-float" style={{
            animationDelay: '2s'
          }} aria-hidden="true" />

          <div className="max-w-4xl mx-auto text-center z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-epa-green/10 p-4 rounded-full animate-scale-in">
                <BookOpen className="h-12 w-12 text-epa-green" />
              </div>
            </div>
            
            <h1 className="font-bold mb-6 leading-tight text-balance animate-fade-in">
              Energielabel <span className="text-epa-green">Kennisbank</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 text-balance animate-fade-in">
              Praktische gidsen, expert tips en actuele informatie over energielabels voor woningen
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Zap className="h-5 w-5 text-epa-green" />
                  <span className="font-medium">Expert Advies</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-epa-green" />
                  <span className="font-medium">Actuele Informatie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick CTA Section */}
        <div className="py-8 bg-epa-green/5 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium">Heeft u direct een energielabel nodig?</h3>
            <Button 
              className="bg-epa-green hover:bg-epa-green-dark text-white"
              onClick={scrollToContact}
            >
              <Send className="mr-2 h-4 w-4" /> Direct aanvragen
            </Button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-epa-green border-t-transparent mx-auto mb-6"></div>
                  <p className="text-xl text-gray-600">Artikelen laden...</p>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-50 rounded-xl shadow-lg p-12 max-w-md mx-auto">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Geen artikelen gevonden</h3>
                    <p className="text-gray-600">Binnenkort voegen we interessante artikelen toe over energielabels.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-16">
                    <h2 className="font-bold text-gray-900 mb-4">
                      Laatste Artikelen
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Ontdek alles wat je moet weten over energielabels, van basis informatie tot geavanceerde tips voor verbetering.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                      <article key={post.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="bg-gradient-to-br from-epa-green to-epa-green-dark h-2"></div>
                        <div className="p-8">
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar className="h-4 w-4 mr-2 text-epa-green" />
                            {formatDate(post.last_updated)}
                            {index === 0 && (
                              <span className="ml-3 bg-epa-green text-white text-xs px-2 py-1 rounded-full">
                                Nieuw
                              </span>
                            )}
                          </div>
                          
                          <h2 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-epa-green transition-colors leading-tight">
                            <NavigationLink to={`/blog/${extractSlug(post.page_path)}`}>
                              {post.title}
                            </NavigationLink>
                          </h2>
                          
                          {post.subtitle && (
                            <p className="text-gray-700 mb-4 font-medium leading-relaxed">
                              {post.subtitle}
                            </p>
                          )}
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {getExcerpt(post.content)}
                          </p>
                          
                          <NavigationLink 
                            to={`/blog/${extractSlug(post.page_path)}`}
                            className="inline-flex items-center bg-epa-green text-white px-6 py-3 rounded-lg font-medium hover:bg-epa-green-dark transition-all duration-200 group-hover:shadow-lg"
                          >
                            Lees artikel
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </NavigationLink>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Middle CTA Section */}
        <div className="py-8 bg-epa-green/10 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium">Nog vragen over energielabels?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-epa-green text-epa-green hover:bg-epa-green/10"
                onClick={() => window.location.href = "/#faq"}
              >
                Bekijk veelgestelde vragen
              </Button>
              <Button 
                className="bg-epa-green hover:bg-epa-green-dark text-white"
                onClick={scrollToContact}
              >
                <Send className="mr-2 h-4 w-4" /> Direct contact
              </Button>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA Section */}
        <div className="py-12 bg-green-50 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="mb-4 text-2xl font-medium text-green-800">Snel contact via WhatsApp</h3>
            <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
              Heeft u direct vragen over uw energielabel? Neem snel contact op via WhatsApp. 
              Wij zijn bereikbaar van 08:00 tot 22:00 uur en staan klaar om u te helpen.
            </p>
            <a 
              href={`https://wa.me/31852502302`}
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

        {/* Final CTA Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-bold mb-6 text-gray-900">
                Heeft u een energielabel nodig?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Een energielabel is verplicht bij verkoop of verhuur van een woning. Onze gecertificeerde EPA-adviseurs helpen u snel en professioneel aan een officieel energielabel.
              </p>
              <div className="bg-gradient-to-r from-epa-green to-epa-green-dark rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Vanaf €375 - Geldig 10 jaar
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Officieel geregistreerd bij RVO • EPA-gecertificeerd • Binnen 5 werkdagen
                  </p>
                  <Button 
                    className="bg-white text-epa-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    onClick={scrollToContact}
                  >
                    Direct Energielabel Aanvragen
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Floating Elements */}
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

export default Blog;
