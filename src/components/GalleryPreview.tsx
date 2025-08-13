import React from 'react';
import { Camera } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const GalleryPreview: React.FC = () => {
  const navigate = useNavigate();
  
  const previewImages = [
    'https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnoiiA0LKdFDE0AOR8USixy7QCqJYlWkGdcwts',
    'https://8oo57dacv4.ufs.sh/f/71xRIOSybaYn60xkqDFAUgH8TBYFmkDcf1IZJ4a79GwRtC52'
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy">
                Want to See Us in Action?
              </h2>
            </div>
            <p className="font-nunito text-lg text-gray-700 mb-8">
              Head over to our Gallery page to catch a glimpse of our sessions in motion — full of laughter, movement, and positive energy.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              className="group"
              onClick={() => navigate('/gallery')}
            >
              <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                Visit the Gallery
                <Camera className="w-5 h-5" />
              </span>
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 gap-4 fade-in">
            {previewImages.map((image, index) => (
              <div 
                key={index}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img 
                  src={image} 
                  alt="Kids playing sports" 
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;