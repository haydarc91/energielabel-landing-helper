
import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left focus-ring rounded-md button-transition"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-lg">{question}</h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform duration-300",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 1000}px` : 0,
        }}
      >
        <div className="py-4 text-gray-600 pr-8">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Wat is een energielabel en waarom heb ik het nodig?",
      answer: "Een energielabel geeft inzicht in de energiezuinigheid van een woning. Het is verplicht bij verkoop, verhuur of oplevering van woningen. Het label loopt van A++++ (zeer zuinig) tot G (zeer onzuinig) en is 10 jaar geldig. Zonder geldig energielabel riskeert u een boete van de Inspectie Leefomgeving en Transport (ILT)."
    },
    {
      question: "Hoe lang duurt het proces van aanvraag tot ontvangst?",
      answer: "Na de inspectie ontvangt u binnen 1-3 werkdagen uw definitieve energielabel. De gehele procedure van aanvraag tot ontvangst duurt gemiddeld 3-5 werkdagen, afhankelijk van beschikbaarheid voor de inspectie."
    },
    {
      question: "Hoeveel kost een energielabel?",
      answer: "De kosten voor een energielabel zijn afhankelijk van het type en de grootte van uw woning. Voor een gemiddelde eengezinswoning liggen de kosten tussen €250 en €350. Neem contact met ons op voor een exacte prijsopgave voor uw specifieke situatie."
    },
    {
      question: "Wat moet ik voorbereiden voor de woninginspectie?",
      answer: "Voor de inspectie is het handig als u toegang heeft tot alle ruimtes in de woning, inclusief kruipruimte en zolder. Daarnaast is het goed om informatie te hebben over isolatie, installaties en eventuele verbouwingen. Dit helpt de adviseur bij een nauwkeurige beoordeling."
    },
    {
      question: "Kan ik mijn energielabel verbeteren?",
      answer: "Ja, u kunt uw energielabel verbeteren door energiebesparende maatregelen te nemen, zoals het aanbrengen van isolatie, plaatsen van HR++ glas, installeren van zonnepanelen of een zuinig verwarmingssysteem. Na het doorvoeren van verbeteringen kunt u een nieuw energielabel aanvragen."
    },
    {
      question: "Is het energielabel overdraagbaar bij verkoop?",
      answer: "Ja, het energielabel is gekoppeld aan de woning en niet aan de eigenaar. Bij verkoop van de woning gaat het label automatisch over op de nieuwe eigenaar. Het energielabel is 10 jaar geldig vanaf de registratiedatum."
    }
  ];
  // Build FAQ schema
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    };
    // Remove existing
    document.querySelectorAll('script[data-faq-json="true"]').forEach((el) => el.parentElement?.removeChild(el));
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-json', 'true');
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Veelgestelde vragen</h2>
          <p className="text-gray-600 text-lg">
            Antwoorden op de meest gestelde vragen over energielabels
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Heeft u een andere vraag? <a href="#contact" className="text-epa-green font-medium hover:underline">Neem contact met ons op</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
