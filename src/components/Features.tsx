
import React, { useEffect, useRef } from 'react';
import { Shield, Clock, Award, PiggyBank } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-scale-in');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-xl p-6 opacity-0 transform transition-all"
    >
      <div className="bg-epa-green-light p-3 rounded-lg inline-flex text-epa-green-dark mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
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

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Officieel Erkend",
      description: "Ons energielabel is officieel erkend en geregistreerd bij RVO, geldig voor 10 jaar.",
      delay: 100
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Snelle Service",
      description: "Binnen 1-3 werkdagen na inspectie ontvangt u uw definitieve energielabel.",
      delay: 200
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Gecertificeerde Adviseurs",
      description: "Al onze adviseurs zijn EPA-gecertificeerd en hebben jarenlange ervaring.",
      delay: 300
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: "Voordelige Tarieven",
      description: "Transparante en concurrerende prijzen zonder verborgen kosten.",
      delay: 400
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-epa-gray-light">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 opacity-0">
          <h2 className="mb-4">Waarom een <span className="text-epa-green">energielabel</span> bij ons?</h2>
          <p className="text-gray-600 text-lg">
            Een energielabel is verplicht bij verkoop of verhuur van uw woning. 
            Wij zorgen voor een betrouwbaar en officieel energielabel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
