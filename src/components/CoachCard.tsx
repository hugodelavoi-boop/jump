import React from 'react';
import { Coach } from '../types';

interface CoachCardProps {
  coach: Coach;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden group">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={coach.image} 
          alt={coach.name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="font-nunito text-white text-sm">{coach.bio}</p>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-fredoka font-semibold text-xl text-navy">{coach.name}</h3>
        <p className="font-nunito text-electric-blue">{coach.role}</p>
      </div>
    </div>
  );
};

export default CoachCard;