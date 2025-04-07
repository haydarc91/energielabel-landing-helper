
import React from 'react';
import { Star } from 'lucide-react';

interface CityTestimonialProps {
  testimonial: {
    text: string;
    author: string;
  };
}

const CityTestimonial = ({ testimonial }: CityTestimonialProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <p className="italic text-gray-600">
                "{testimonial.text}"
              </p>
              <p className="text-gray-700 font-medium mt-2">{testimonial.author}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityTestimonial;
