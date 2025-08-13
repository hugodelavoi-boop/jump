import React from 'react';
import { Program } from '../types';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col">
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img 
          src={program.image} 
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-orange text-white text-sm font-semibold px-3 py-1 rounded-bl-lg">
          {program.ageRange}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-fredoka font-bold text-xl text-navy mb-2">{program.title}</h3>
        <p className="font-nunito text-gray-600 mb-4 flex-grow">{program.description}</p>
        
        <div className="mb-4">
          <p className="font-nunito text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-2 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {program.schedule}
          </p>
        </div>
        
        <Button 
          variant="primary" 
          className="w-full"
          onClick={() => navigate('/enrol')}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default ProgramCard;