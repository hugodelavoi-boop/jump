import React from 'react';
import { Check } from 'lucide-react';

const WhyParentsLoveUs: React.FC = () => {
  const benefits = [
    {
      title: '100% Inclusive',
      description: 'Every child is welcomed and supported, regardless of ability or experience.'
    },
    {
      title: 'Qualified Coaches',
      description: 'Expert coaches with extensive experience in youth sports development.'
    },
    {
      title: 'Easy Enrolment',
      description: 'Simple online booking system with flexible payment options.'
    },
    {
      title: 'Evidence-Based Programs',
      description: 'Structured programs designed around proven child development principles.'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-electric-blue/10 text-electric-blue group-hover:bg-electric-blue group-hover:text-white transition-colors duration-300">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-fredoka font-semibold text-xl text-navy mb-2">
                {benefit.title}
              </h3>
              <p className="font-nunito text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParentsLoveUs;