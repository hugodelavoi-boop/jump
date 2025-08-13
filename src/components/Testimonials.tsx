import React from 'react';
import { testimonials } from '../data/testimonialsData';
import TestimonialCard from './TestimonialCard';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-electric-blue/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            What Families Say
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto">
            Join the hundreds of happy families who have seen their children thrive with Jump Start Sports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;