import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgramHighlights: React.FC = () => {
  const navigate = useNavigate();
  
  const programs = [
    {
      title: "Before & After School Programs",
      description: "Fun, structured sports sessions before and after school across Perth.",
      link: "/programs",
      bgColor: "bg-electric-blue/90",
      hoverColor: "hover:bg-electric-blue"
    },
    {
      title: "Holiday Camps",
      description: "Action-packed multi-sport holiday camps for 5–12 year olds.",
      link: "/programs#holiday-camps",
      bgColor: "bg-orange/90",
      hoverColor: "hover:bg-orange"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 px-4">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-navy/60 z-10"></div>
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
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program, index) => (
            program.link.includes('#') ? (
            <button
              key={index}
              onClick={() => {
                navigate('/programs');
                // Use setTimeout to ensure navigation completes before scrolling
                setTimeout(() => {
                  const element = document.getElementById('holiday-camps');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className={`group ${program.bgColor} rounded-2xl p-8 md:p-10 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${program.hoverColor} text-left w-full`}
            >
              <div className="flex flex-col h-full">
                <h3 className="font-fredoka font-bold text-2xl md:text-3xl text-white mb-4">
                  {program.title}
                </h3>
                <p className="font-nunito text-white/90 text-lg mb-6 flex-grow">
                  {program.description}
                </p>
                <div className="flex items-center text-white group-hover:translate-x-1 transition-transform duration-300">
                  <span className="font-nunito font-semibold mr-2">Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          ) : (
            <button
              key={index}
              onClick={() => navigate(program.link)}
              className={`group ${program.bgColor} rounded-2xl p-8 md:p-10 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${program.hoverColor} text-left w-full`}
            >
              <div className="flex flex-col h-full">
                <h3 className="font-fredoka font-bold text-2xl md:text-3xl text-white mb-4">
                  {program.title}
                </h3>
                <p className="font-nunito text-white/90 text-lg mb-6 flex-grow">
                  {program.description}
                </p>
                <div className="flex items-center text-white group-hover:translate-x-1 transition-transform duration-300">
                  <span className="font-nunito font-semibold mr-2">Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          )
        ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;