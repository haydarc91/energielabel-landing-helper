
import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';

const phoneHref = 'tel:0852502302';
const whatsappHref = 'https://wa.me/31852502302';

const StickyMobileCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-auto max-w-6xl px-4 pb-3 pt-2">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg border border-gray-200">
          <a
            href={phoneHref}
            aria-label="Bel direct"
            className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-l-xl"
          >
            <Phone className="h-5 w-5 text-epa-green" />
            Bel
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            <MessageCircle className="h-5 w-5 text-green-600" />
            WhatsApp
          </a>
          <a
            href="#contact-section"
            aria-label="Direct aanvragen"
            className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-epa-green hover:bg-epa-green-dark rounded-r-xl"
          >
            <Send className="h-5 w-5" />
            Aanvragen
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
