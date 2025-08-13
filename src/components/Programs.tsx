import React from 'react';
import { programs } from '../data/programsData';
import ProgramCard from './ProgramCard';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Programs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="programs" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            Our Programs
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto">
            Age-appropriate programs designed to develop skills, confidence, and a love for sport in a fun, supportive environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/programs')}
          >
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;