import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HowWeDoIt from '../components/HowWeDoIt';
import WhatWeOffer from '../components/WhatWeOffer';
import CoreValues from '../components/CoreValues';
import WhatParentsCanExpect from '../components/WhatParentsCanExpect';
import GalleryPreview from '../components/GalleryPreview';

const AboutUs: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[425px] flex items-end justify-center overflow-hidden pb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://i.imgur.com/9EoANYn.jpg" 
            alt="Children playing sports" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              About Us
            </h1>
            <p className="font-nunito text-xl text-white/90">
              Active Kids. Confident Futures.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-8">
                Why We Exist
              </h2>
              <div className="font-nunito text-lg text-gray-700 space-y-6">
                <p>
                  At Jump Start Sports, we believe that every child deserves the chance to move, play, and grow — not just in sport, but in life.
                </p>
                <p>
                  We're not here to just fill time after school. We exist to help kids build confidence, develop movement skills, and fall in love with being active in a way that's inclusive, structured, and full of joy.
                </p>
                <p>
                  Because when kids feel good about moving, they feel good about themselves — and that's the kind of foundation that lasts a lifetime.
                </p>
              </div>
            </div>
            
            <div className="fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnmdNJe7FvCGxr36QdWe2UqpMoNRzhYFIk9nEA" 
                  alt="Happy children playing outdoors" 
                  className="w-full h-full object-cover aspect-4/3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Do It Section */}
      <HowWeDoIt />

      {/* What We Offer Section */}
      <WhatWeOffer />

      {/* Core Values Section */}
      <CoreValues />

      {/* What Parents Can Expect Section */}
      <WhatParentsCanExpect />

      {/* Gallery Preview Section */}
      <GalleryPreview />
    </div>
  );
};

export default AboutUs;