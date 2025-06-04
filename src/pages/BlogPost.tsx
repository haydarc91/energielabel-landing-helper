
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft, Phone, Mail } from 'lucide-react';

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

  const formatContent = (content: string | null) => {
    if (!content) return '';
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-epa-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Artikel laden...</p>
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
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Artikel niet gevonden</h1>
            <Link to="/blog" className="text-epa-green hover:text-epa-green-dark">
              ← Terug naar blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-epa-green hover:text-epa-green-dark mb-8 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar blog
            </Link>

            <header className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.last_updated)}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {post.title}
              </h1>
              
              {post.subtitle && (
                <p className="text-xl text-gray-600 font-medium leading-relaxed">
                  {post.subtitle}
                </p>
              )}
            </header>

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="prose prose-lg max-w-none text-gray-700">
                {formatContent(post.content)}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-epa-green to-epa-blue text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Energielabel nodig voor uw woning?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Vraag direct uw officieel energielabel aan bij onze gecertificeerde EPA-adviseurs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/#contact-section"
                  className="bg-white text-epa-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Direct Aanvragen
                </Link>
                <a 
                  href="tel:+31123456789"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-epa-green transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Direct Bellen
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                Gerelateerde Artikelen
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">
                      <Link 
                        to={`/blog/${extractSlug(relatedPost.page_path)}`}
                        className="hover:text-epa-green transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    {relatedPost.subtitle && (
                      <p className="text-gray-600 mb-4">
                        {relatedPost.subtitle}
                      </p>
                    )}
                    <Link 
                      to={`/blog/${extractSlug(relatedPost.page_path)}`}
                      className="text-epa-green hover:text-epa-green-dark font-medium"
                    >
                      Lees meer →
                    </Link>
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
