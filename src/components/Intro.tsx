import React from 'react';

const Intro: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-white z-[9999]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-6">
            Fun, Structured Sport for Every Child
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We run fun, structured multi-sport sessions for primary school children across Perth. 
            Our sessions are designed to help every child move, play, and grow — in a safe, inclusive, 
            and high-energy environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="h-14 w-14 bg-electric-blue/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-electric-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-fredoka font-semibold text-xl text-navy mb-3">Inclusive Environment</h3>
            <p className="font-nunito text-gray-600">
              Programs designed for all skill levels where every child feels welcome, supported and valued regardless of ability.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="h-14 w-14 bg-orange/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.8 11.3 2 22l10.7-3.79"></path>
                <path d="M4 3h.01"></path>
                <path d="M22 8h.01"></path>
                <path d="M15 2h.01"></path>
                <path d="M22 20h.01"></path>
                <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
                <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"></path>
                <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"></path>
                <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"></path>
              </svg>
            </div>
            <h3 className="font-fredoka font-semibold text-xl text-navy mb-3">Professional Coaching</h3>
            <p className="font-nunito text-gray-600">
              Experienced, qualified coaches who make learning fun while building essential skills and sporting foundations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="h-14 w-14 bg-navy/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.5 3.5l3.826 5.421A.7.7 0 0 1 14.7 10H8.3z"></path>
                <path d="M12 22v-8"></path>
                <path d="M4.5 15h15"></path>
                <path d="m7 15 1.5-3"></path>
                <path d="m15.5 12 1.5 3"></path>
              </svg>
            </div>
            <h3 className="font-fredoka font-semibold text-xl text-navy mb-3">Skill Development</h3>
            <p className="font-nunito text-gray-600">
              Age-appropriate programs that build fundamental movement skills, confidence, and sporting abilities step by step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;