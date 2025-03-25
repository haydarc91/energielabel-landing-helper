
import React, { useEffect, useRef } from 'react';
import { CalendarCheck, HomeIcon, ClipboardCheck, BadgeCheck } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const ProcessStep = ({ number, title, description, icon, isLast = false }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
            }, number * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [number]);

  return (
    <div ref={stepRef} className="opacity-0">
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-epa-green text-white font-bold text-lg">
            {number}
          </div>
          {!isLast && (
            <div className="w-1 bg-epa-green-light h-full mt-2"></div>
          )}
        </div>
        <div className="pt-2">
          <div className="bg-epa-green-light p-3 rounded-lg inline-flex text-epa-green-dark mb-3">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-8">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const steps = [
    {
      number: 1,
      title: "Afspraak Inplannen",
      description: "Vul het contactformulier in of bel ons om een afspraak in te plannen voor de woninginspectie.",
      icon: <CalendarCheck className="w-6 h-6" />
    },
    {
      number: 2,
      title: "Woninginspectie",
      description: "Onze EPA-adviseur komt langs om uw woning te inspecteren. Dit duurt gemiddeld 45-60 minuten.",
      icon: <HomeIcon className="w-6 h-6" />
    },
    {
      number: 3,
      title: "Verwerking Gegevens",
      description: "Wij verwerken de inspectiegegevens en stellen het energielabel op volgens de officiële richtlijnen.",
      icon: <ClipboardCheck className="w-6 h-6" />
    },
    {
      number: 4,
      title: "Registratie & Levering",
      description: "Het energielabel wordt geregistreerd bij RVO en u ontvangt het label digitaal per e-mail.",
      icon: <BadgeCheck className="w-6 h-6" />
    }
  ];

  return (
    <section id="process" ref={sectionRef} className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 opacity-0">
          <h2 className="mb-4">Zo werkt het</h2>
          <p className="text-gray-600 text-lg">
            In vier eenvoudige stappen zorgen wij voor uw officiële energielabel
          </p>
        </div>

        <div className="mt-12 pl-4">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
