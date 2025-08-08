
import React, { useEffect, useState } from 'react';
import NavigationLink from '../components/ui/navigation-link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

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

  useEffect(() => {
    document.title = "Energielabel Blog | Alles over Energielabels voor Woningen";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Ontdek alles over energielabels voor woningen. Praktische tips, stappenplannen en actuele informatie over energiebesparing en duurzaamheid.");
    }
    
    fetchBlogPosts();
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Improved */}
      <section className="bg-gradient-to-r from-epa-green via-green-600 to-epa-blue text-white py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Energielabel <span className="text-green-200">Kennisbank</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Praktische gidsen en expert tips voor energielabels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  <span>SEO Geoptimaliseerd</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  <span>Regelmatig Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-epa-green border-t-transparent mx-auto mb-6"></div>
                <p className="text-xl text-gray-600">Artikelen laden...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Geen artikelen gevonden</h3>
                  <p className="text-gray-600">Binnenkort voegen we interessante artikelen toe over energielabels.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Laatste Artikelen
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Ontdek alles wat je moet weten over energielabels, van basis informatie tot geavanceerde tips voor verbetering.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post, index) => (
                    <article key={post.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="bg-gradient-to-br from-epa-green to-green-600 h-2"></div>
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

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Heeft u een energielabel nodig?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Een energielabel is verplicht bij verkoop of verhuur van een woning. Onze gecertificeerde EPA-adviseurs helpen u snel en professioneel aan een officieel energielabel.
            </p>
            <div className="bg-gradient-to-r from-epa-green to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Vanaf €285 - Geldig 10 jaar</h3>
              <p className="text-lg mb-6 opacity-90">
                Officieel geregistreerd bij RVO • EPA-gecertificeerd • Binnen 5 werkdagen
              </p>
              <NavigationLink 
                to="/#contact-section"
                className="inline-flex items-center bg-white text-epa-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Direct Energielabel Aanvragen
                <ArrowRight className="h-5 w-5 ml-2" />
              </NavigationLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
