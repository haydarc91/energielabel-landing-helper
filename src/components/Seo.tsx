
import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object | object[];
  image?: string;
  type?: 'website' | 'article';
}

const Seo: React.FC<SeoProps> = ({ title, description, canonical, jsonLd, image, type = 'website' }) => {
  useEffect(() => {
    // Title
    if (document.title !== title) document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical
    const canonicalHref = canonical || window.location.href;
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalHref);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalHref },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'EPA Woninglabel' },
      ...(image ? [{ property: 'og:image', content: image }] : []),
    ];

    ogTags.forEach(({ property, content }) => {
      let metaOg = document.querySelector(`meta[property="${property}"]`);
      if (!metaOg) {
        metaOg = document.createElement('meta');
        metaOg.setAttribute('property', property);
        document.head.appendChild(metaOg);
      }
      metaOg.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      ...(image ? [{ name: 'twitter:image', content: image }] : []),
    ];

    twitterTags.forEach(({ name, content }) => {
      let metaTwitter = document.querySelector(`meta[name="${name}"]`);
      if (!metaTwitter) {
        metaTwitter = document.createElement('meta');
        metaTwitter.setAttribute('name', name);
        document.head.appendChild(metaTwitter);
      }
      metaTwitter.setAttribute('content', content);
    });

    // JSON-LD structured data
    // Remove any existing injected SEO json-ld to avoid duplicates
    const existing = document.querySelectorAll('script[data-seo-json="true"]');
    existing.forEach((el) => el.parentElement?.removeChild(el));

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-json', 'true');
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [title, description, canonical, jsonLd, image, type]);

  return null;
};

export default Seo;
