import React from 'react';
import { Puzzle, Zap, Sprout, Target } from 'lucide-react';

const CoreValues: React.FC = () => {
  const values = [
    {
      icon: Puzzle,
      title: 'Inclusion',
      description: 'Every child is welcome. Every session is adapted so no one is left out.'
    },
    {
      icon: Zap,
      title: 'Energy',
      description: 'We bring the fun, the games, and the positive vibes — always.'
    },
    {
      icon: Sprout,
      title: 'Growth',
      description: 'We help kids grow in skill, confidence, and character.'
    },
    {
      icon: Target,
      title: 'Purposeful Play',
      description: 'Every activity is fun, but also designed with intention and structure.'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            Our Core Values
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto">
            The principles that guide every Jump Start session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-blue/10 to-electric-blue/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-electric-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="font-fredoka font-semibold text-2xl text-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="font-nunito text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;