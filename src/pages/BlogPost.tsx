
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft, Phone, Mail, Clock, User } from 'lucide-react';

interface BlogPost {
  id: string;
  section_name: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  page_path: string | null;
  last_updated: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
      fetchRelatedPosts();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('page_path', `/blog/${slug}`)
        .eq('section_name', 'blog_article')
        .single();

      if (error) throw error;
      setPost(data);
      
      // Update page title and meta description
      if (data?.title) {
        document.title = `${data.title} | EPA Woninglabel Blog`;
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_name', 'blog_article')
        .neq('page_path', `/blog/${slug}`)
        .neq('page_path', '/blog/alle-kosten-voor-een-energielabel-op-een-rij')
        .limit(3);

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      console.error('Error fetching related posts:', error);
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

  const getHeroImage = (slug: string) => {
    // Map different blog topics to relevant images
    if (slug.includes('isolatie')) {
      return 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop';
    } else if (slug.includes('zonnepanelen')) {
      return 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=600&fit=crop';
    } else if (slug.includes('subsidie')) {
      return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop';
    } else if (slug.includes('energielabel-d-naar-b')) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop';
    } else {
      return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop';
    }
  };

  const formatContent = (content: string | null) => {
    if (!content) return '';
    
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Check if it's a header (contains words like "De Basis:", "Maatregelen", etc.)
      if (paragraph.includes(':') && paragraph.length < 100 && !paragraph.includes('•')) {
        return (
          <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-l-4 border-epa-green pl-4">
            {paragraph.replace(':', '')}
          </h3>
        );
      }
      
      // Check if it's a bullet point
      if (paragraph.startsWith('•')) {
        return (
          <div key={index} className="flex items-start mb-3">
            <div className="w-2 h-2 bg-epa-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-700 leading-relaxed">{paragraph.substring(1).trim()}</p>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-left">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Artikel niet gevonden</h1>
            <p className="text-xl text-gray-600 mb-8">Het artikel dat u zoekt bestaat niet of is verplaatst.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center bg-epa-green text-white px-6 py-3 rounded-lg hover:bg-epa-green-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Image Section */}
      <div className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden mt-16">
        <img 
          src={getHeroImage(slug || '')}
          alt={post.title || 'Energielabel artikel'}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-left">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight text-left">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl text-white/90 font-medium max-w-3xl text-left">
                {post.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Article Meta */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto py-4">
            <div className="flex items-center text-sm text-gray-600 space-x-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-epa-green" />
                {formatDate(post.last_updated)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-epa-green" />
                5 min leestijd
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-epa-green" />
                EPA Woninglabel Expert
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <div className="prose prose-lg max-w-none text-left">
              {formatContent(post.content)}
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-br from-epa-green to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <div className="relative text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Energielabel nodig voor uw woning?
                </h3>
                <p className="text-lg mb-6 opacity-90 max-w-2xl">
                  Vraag direct uw officieel energielabel aan bij onze gecertificeerde EPA-adviseurs. 
                  Snel, betrouwbaar en tegen een scherpe prijs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/#contact-section"
                    className="inline-flex items-center justify-center bg-white text-epa-green px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg"
                  >
                    Direct Aanvragen
                  </Link>
                  <a 
                    href="tel:085-250 2302"
                    className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-epa-green transition-colors text-lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    085-250 2302
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 text-left">
                Gerelateerde Artikelen
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="h-48 bg-gradient-to-br from-epa-green to-green-600 relative overflow-hidden">
                      <img 
                        src={getHeroImage(extractSlug(relatedPost.page_path))}
                        alt={relatedPost.title || 'Energielabel artikel'}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-6 text-left">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">
                        <Link 
                          to={`/blog/${extractSlug(relatedPost.page_path)}`}
                          className="hover:text-epa-green transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      {relatedPost.subtitle && (
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {relatedPost.subtitle.length > 100 
                            ? relatedPost.subtitle.substring(0, 100) + '...' 
                            : relatedPost.subtitle}
                        </p>
                      )}
                      <Link 
                        to={`/blog/${extractSlug(relatedPost.page_path)}`}
                        className="inline-flex items-center text-epa-green hover:text-epa-green-dark font-semibold transition-colors"
                      >
                        Lees meer
                        <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
