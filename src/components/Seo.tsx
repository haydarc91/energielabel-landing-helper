
import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object | object[]; // Single schema object or array of schema objects
}

const Seo: React.FC<SeoProps> = ({ title, description, canonical, jsonLd }) => {
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
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default Seo;
