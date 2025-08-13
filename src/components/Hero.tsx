import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Hero Content */}
      <div className="text-center px-4">
        <div className="max-w-4xl animate-fadeIn">
          <h1 className="font-fredoka font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-8 leading-tight">
            Active Kids. <span className="text-electric-blue">Confident</span> Futures.
          </h1>
          <p className="font-nunito text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Jump Start Sports provides fun, structured, and inclusive sports programs for children ages 5-12, building skills, confidence, and a lifelong love of movement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/enrol')}
            >
              Book Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/programs')}
            >
              View Programs
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - Centered with improved positioning */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-[50]">
        <div className="relative flex justify-center">
          <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 border-white/70 flex justify-center items-start pt-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-scrollDown"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;