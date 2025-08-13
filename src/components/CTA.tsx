import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-electric-blue py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="animate-fadeIn">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-white mb-8">
            Book Your Child's Spot Today
          </h2>
          <Button 
            variant="secondary" 
            size="lg"
            className="text-lg px-10 transform transition-transform duration-300 hover:scale-105"
            onClick={() => navigate('/enrol')}
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;