import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Camera } from 'lucide-react';
import Button from '../components/Button';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useNavigate } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const galleryItems = [
    {
      src: 'https://imgur.com/ks0DqUZ',
      caption: 'Mini Kickers in action',
      alt: 'Children playing soccer with coach'
    },
    {
      src: 'https://imgur.com/4KGPnp2',
      caption: 'Junior Champions training session',
      alt: 'Kids practicing soccer drills'
    },
    {
      src: 'https://imgur.com/qbL53Nz',
      caption: 'Holiday camp fun',
      alt: 'Children enjoying sports activities'
    },
    {
      src: 'https://imgur.com/DuuBkC2',
      caption: 'Team building activities',
      alt: 'Group of children working together'
    },
    {
      src: 'https://imgur.com/DSMqTbC',
      caption: 'Skills development',
      alt: 'Children practicing sports skills'
    },
    {
      src: 'https://imgur.com/GIUz4YF',
      caption: 'Learning through play',
      alt: 'Kids having fun while learning sports'
    }
  ];

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[425px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img 
            src={galleryItems[0].src}
            alt="Children playing sports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Camera className="w-8 h-8 text-white" />
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              Our Gallery
            </h1>
          </div>
          <p className="font-nunito text-xl text-white/90 max-w-3xl mx-auto">
            Capturing moments of joy, growth, and achievement at Jump Start Sports.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={item.src} 
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-fredoka font-semibold text-lg mb-2">
                      {item.caption}
                    </h3>
                    <p className="text-white/90 font-nunito text-sm">
                      Click to view larger
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-24 bg-electric-blue rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-fredoka font-bold text-2xl md:text-3xl text-white mb-4">
              Want to see your child featured?
            </h2>
            <p className="font-nunito text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Enrol now and be part of the Jump Start family. Create memories, build confidence, and watch your child thrive.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="text-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => navigate('/enrol')}
            >
              Enrol Now
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={galleryItems}
        render={{
          slide: ({ slide }) => (
            <img
              src={slide.src}
              alt={slide.alt}
              style={{ maxHeight: '85vh', width: 'auto' }}
            />
          )
        }}
      />
    </div>
  );
};

export default Gallery;