import React from 'react';
import { Check } from 'lucide-react';

const WhatParentsCanExpect: React.FC = () => {
  const expectations = [
    {
      title: 'Warm, helpful communication',
      description: 'Real people ready to help with your questions and needs.'
    },
    {
      title: 'Easy enrolment and scheduling',
      description: 'Simple booking process with flexible session times.'
    },
    {
      title: 'Qualified, vetted coaches',
      description: 'All coaches have Working With Children Checks and First Aid certification.'
    },
    {
      title: 'Regular updates and photos',
      description: 'Stay connected with your child\'s progress and achievements.'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            What Parents Can Expect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {expectations.map((expectation, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-electric-blue" />
                </div>
              </div>
              <div>
                <h3 className="font-fredoka font-semibold text-xl text-navy mb-2">
                  {expectation.title}
                </h3>
                <p className="font-nunito text-gray-600">
                  {expectation.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Coaches Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div 
            className="flex items-start space-x-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-electric-blue" />
              </div>
            </div>
            <div>
              <h3 className="font-fredoka font-semibold text-xl text-navy mb-2">
                Real coaches, real care
              </h3>
              <p className="font-nunito text-gray-600">
                A program built for real kids, by coaches who truly care.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Banner */}
        <div className="bg-gradient-to-r from-electric-blue to-blue-600 rounded-2xl p-8 md:p-12 text-center shadow-lg fade-in">
          <p className="font-nunito text-xl md:text-2xl text-white italic">
            "Let your child move, play and grow with us — because every child deserves to love being active."
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatParentsCanExpect;