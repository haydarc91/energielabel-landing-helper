
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_name', 'blog_article')
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
    return content.substring(0, 160) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-epa-green to-epa-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Energielabel Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Alles wat je moet weten over energielabels voor woningen
            </p>
            <p className="text-lg opacity-80">
              Praktische tips, uitleg en actuele informatie over energielabels, duurzaamheid en energiebesparing
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-epa-green mx-auto"></div>
                <p className="mt-4 text-gray-600">Artikelen laden...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Geen artikelen gevonden.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(post.last_updated)}
                      </div>
                      
                      <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-epa-green transition-colors">
                        <Link to={`/blog/${extractSlug(post.page_path)}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      {post.subtitle && (
                        <p className="text-gray-600 mb-4 font-medium">
                          {post.subtitle}
                        </p>
                      )}
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {getExcerpt(post.content)}
                      </p>
                      
                      <Link 
                        to={`/blog/${extractSlug(post.page_path)}`}
                        className="inline-flex items-center text-epa-green hover:text-epa-green-dark font-medium transition-colors"
                      >
                        Lees meer 
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Meer over Energielabels
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Een energielabel is verplicht bij verkoop of verhuur van een woning. Ontdek in onze blog hoe je jouw energielabel kunt verbeteren, wat de kosten zijn en hoe het proces verloopt.
            </p>
            <Link 
              to="/#contact-section"
              className="bg-epa-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-epa-green-dark transition-colors"
            >
              Energielabel Aanvragen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
