import React from 'react';
import { coaches } from '../data/coachesData';
import CoachCard from './CoachCard';

const Coaches: React.FC = () => {
  return (
    <section id="coaches" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            Meet Our Coaches
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto">
            Our experienced and passionate coaches create a fun, supportive environment where every child can thrive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map(coach => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coaches;