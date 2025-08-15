import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import ProgramHighlights from '../components/ProgramHighlights';
import WhyParentsLoveUs from '../components/WhyParentsLoveUs';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Initialize Vimeo player safely
    const initializePlayer = () => {
      const iframe = document.querySelector('iframe');
      if (iframe && window.Vimeo) {
        try {
          const player = new window.Vimeo.Player(iframe);
          player.on('play', () => {
            setIsVideoLoaded(true);
          });
        } catch (error) {
          console.warn('Vimeo player initialization failed:', error);
          setIsVideoLoaded(true); // Fallback to show content
        }
      }
    };

    // Wait for Vimeo script to load
    if (window.Vimeo) {
      initializePlayer();
    } else {
      const checkVimeo = setInterval(() => {
        if (window.Vimeo) {
          clearInterval(checkVimeo);
          initializePlayer();
        }
      }, 100);

      // Cleanup after 5 seconds
      setTimeout(() => {
        clearInterval(checkVimeo);
        setIsVideoLoaded(true);
      }, 5000);
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Video Background with Placeholder */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-navy/60 z-10"></div>
        
        {/* Placeholder Image */}
        <img
          src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnuqWnWotE8CtqGdzHmkXy7aRVvgMcUF6NYPT0"
          alt="Video Placeholder"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video Player */}
        <div className="absolute inset-0">
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden' 
          }}>
            <iframe
              src="https://player.vimeo.com/video/1086936265?h=154f671832&autoplay=1&loop=1&background=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&muted=1"
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '177.77777778vh',
                height: '56.25vw',
                minWidth: '100%',
                minHeight: '100%',
                transform: 'translate(-50%, -50%)',
                objectFit: 'cover'
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Jumpstart sports hype reel"
              className={`transition-opacity duration-500 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="relative z-[1]">
        <Navbar />
        <Hero />
      </div>
      
      <div className="relative z-[9999] bg-white">
        <Intro />
        <ProgramHighlights />
        <WhyParentsLoveUs />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default Home;