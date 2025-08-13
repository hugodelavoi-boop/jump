import React from 'react';
import { Activity, Users, Brain, Heart, Star } from 'lucide-react';

const HowWeDoIt: React.FC = () => {
  const features = [
    {
      icon: Activity,
      title: 'Foundational Movement Focus',
      description: 'Not just drills, but skills that support lifelong physical confidence'
    },
    {
      icon: Star,
      title: 'Multi-Sport Variety',
      description: 'From soccer and AFL to dodgeball, tennis, and basketball'
    },
    {
      icon: Users,
      title: 'Designed for All Abilities',
      description: 'Sporty or shy, every child belongs'
    },
    {
      icon: Heart,
      title: 'Child-First Coaching',
      description: 'Positive, structured, and supportive'
    },
    {
      icon: Brain,
      title: 'Backed by Science',
      description: 'Built using physical literacy and child development research'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-navy/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            How We Do It
          </h2>
          <p className="font-nunito text-xl text-gray-700 max-w-3xl mx-auto">
            High-energy, inclusive sessions that support every child's development.
          </p>
        </div>

        <div className="mb-12 fade-in">
          <p className="font-nunito text-lg text-gray-700 text-center max-w-4xl mx-auto">
            We deliver high-energy, coach-led multi-sport sessions that are carefully designed to support the physical, emotional, and social development of children aged 5–12.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.slice(0, 4).map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-electric-blue/10 text-electric-blue mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-fredoka font-semibold text-xl text-navy mb-3">
                {feature.title}
              </h3>
              <p className="font-nunito text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
          
          {/* Centered Science Box */}
          <div className="lg:col-start-2 md:col-span-2 lg:col-span-1 mx-auto w-full max-w-md">
            <div 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 fade-in"
              style={{ animationDelay: '400ms' }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-electric-blue/10 text-electric-blue mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-fredoka font-semibold text-xl text-navy mb-3">
                {features[4].title}
              </h3>
              <p className="font-nunito text-gray-600">
                {features[4].description}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center fade-in">
          <p className="font-nunito text-lg text-gray-700 max-w-4xl mx-auto">
            Whether it's before school, after school, or during the holidays, we create an environment where kids feel safe, supported, and excited to move.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeDoIt;