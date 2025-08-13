import React from 'react';
import { Sunrise, Sunset, Sun } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const WhatWeOffer: React.FC = () => {
  const navigate = useNavigate();
  
  const programs = [
    {
      icon: Sunrise,
      title: "Before School Multi-Sport Programs",
      description: "Get active before the bell! Fun, structured movement to start the day right.",
      status: "Available Now"
    },
    {
      icon: Sunset,
      title: "After School Multi-Sport Programs",
      description: "A safe, energetic space to unwind, play, and develop key movement skills.",
      status: "Available Now"
    },
    {
      icon: Sun,
      title: "Holiday Camps",
      description: "A full day of action-packed, coach-led fun during school breaks.",
      status: "Coming Soon"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            What We Offer
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto">
            Jump Start Sports offers a range of multi-sport programs that support movement, communication, and resilience — all while having fun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6 md:p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-electric-blue/10 text-electric-blue mb-6">
                  <program.icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-fredoka font-semibold text-2xl text-navy mb-3">
                  {program.title}
                </h3>
                
                <p className="font-nunito text-gray-600 mb-6">
                  {program.description}
                </p>
                
                <div className="flex flex-col gap-4">
                  <span className={`inline-flex items-center justify-center font-nunito text-sm font-medium px-4 py-1.5 rounded-full ${
                    program.status === "Coming Soon" 
                      ? "bg-gradient-to-r from-orange/20 to-orange/10 text-orange border border-orange/20" 
                      : "bg-gradient-to-r from-electric-blue/20 to-electric-blue/10 text-electric-blue border border-electric-blue/20"
                  }`}>
                    {program.status}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group hover:bg-electric-blue hover:border-electric-blue hover:text-white transition-all duration-300 w-full"
                    onClick={() => navigate('/programs')}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Learn More
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;