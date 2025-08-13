import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, Clock, Users, Shield, Target, Bell, Sunrise, ArrowRight, ClipboardCheck, UserCheck, Shirt, Droplet, ShoppingBag, Star, Trophy, Heart } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const benefits = [
    'Multi-sport variety',
    'Safe sign-out process',
    'Qualified, child-first coaches',
    'Structured, age-appropriate games',
    'Designed to make every child feel included and capable'
  ];

  const whatToBring = [
    { icon: ShoppingBag, text: 'Hat', description: 'For sun protection during outdoor activities' },
    { icon: Droplet, text: 'Water bottle', description: 'To stay hydrated throughout the session' },
    { icon: Target, text: 'Sneakers', description: 'School shoes OK if suitable for movement' },
    { icon: Shirt, text: 'School uniform', description: 'Regular uniform is fine unless stated otherwise' }
  ];

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the waitlist submission
    alert('Thanks for your interest! We\'ll notify you when holiday camps are available.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[425px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img 
            src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYn60xkqDFAUgH8TBYFmkDcf1IZJ4a79GwRtC52" 
            alt="Children playing sports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Our Programs
          </h1>
          <p className="font-nunito text-xl text-white/90 max-w-3xl mx-auto">
            Age-appropriate programs designed to develop skills, confidence, and a love for sport.
          </p>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none">
              <p className="font-nunito text-lg text-gray-700 mb-6">
                Our program delivers fun, high-energy 1-hour sessions directly on-site at your child's primary school — before or after the school day.
              </p>
              <p className="font-nunito text-lg text-gray-700 mb-12">
                These sessions are more than just a sports class. They're carefully designed by experts in children's movement and development to build physical literacy, social confidence, and a genuine love for being active.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before School Sessions Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-electric-blue/5 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center">
                <Sunrise className="w-6 h-6 text-orange" />
              </div>
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Before School Sessions
              </h2>
            </div>

            <div className="space-y-6">
              <h3 className="font-fredoka text-xl text-navy">How It Works:</h3>
              <ul className="space-y-4">
                {[
                  'Parents drop off their child at the designated session location (usually the school oval, undercover area, or gym).',
                  'Our coaches greet students, check the roll, and run a structured, active warm-up to start the day with energy.',
                  'After the session, children are signed out by our staff and walked safely to their classrooms or morning teacher.'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-4 h-4 text-electric-blue" />
                    </div>
                    <span className="font-nunito text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-orange/5 border border-orange/10 rounded-xl p-6">
                <p className="font-nunito text-gray-700">
                  ✅ Suitable for early risers, families needing early drop-off, or kids who benefit from morning movement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* After School Sessions Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-electric-blue" />
              </div>
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                After School Sessions
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-fredoka text-xl text-navy mb-4">How It Works:</h3>
                <ul className="space-y-4">
                  {[
                    { text: 'Students meet our coaches at a pre-agreed pick-up point (e.g., classroom or assembly area)', icon: ClipboardCheck },
                    { text: 'Coaches mark attendance and safely transition students into the session', icon: UserCheck },
                    { text: 'Fun warm-up games kick off each afternoon', icon: Target },
                    { text: 'Parents pick up children from the session area, with coaches signing each child out individually', icon: Shield }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon className="w-4 h-4 text-electric-blue" />
                      </div>
                      <span className="font-nunito text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-electric-blue/5 border border-electric-blue/10 rounded-xl p-6 space-y-4">
                <h4 className="font-fredoka text-lg text-navy">Safety & Supervision</h4>
                <ul className="space-y-3">
                  {[
                    'All coaches are certified with Working With Children Checks and First Aid',
                    'Attendance is recorded for every session — strict sign-in/sign-out procedures',
                    'High coach-to-child ratios for personalised support and safety'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-electric-blue flex-shrink-0 mt-1" />
                      <span className="font-nunito text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-fredoka font-bold text-3xl text-navy mb-4">
                🧢 What to Bring
              </h2>
              <p className="font-nunito text-lg text-gray-600">
                We keep it simple so kids can focus on the fun!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whatToBring.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="font-fredoka font-semibold text-lg text-navy mb-1">
                        {item.text}
                      </h3>
                      <p className="font-nunito text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-orange/5 border border-orange/10 rounded-xl p-6 text-center">
              <p className="font-nunito text-gray-700">
                🏅 All sporting equipment is provided by Jump Start Sports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Camps Section */}
      <section id="holiday-camps" className="py-16 md:py-24 px-4 bg-gradient-to-b from-yellow-50 to-white scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-fredoka font-bold text-3xl text-navy mb-4">
                🎉 Holiday Camps
              </h2>
              <p className="font-nunito text-lg text-gray-700">
                Our Holiday Camps are currently in development for Term 3 holidays — designed to give kids a full day of structured fun, movement, and social connection while school's out.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="font-fredoka text-xl text-navy mb-6">
                What to Expect (once launched)
              </h3>
              <div className="grid gap-6">
                {[
                  { icon: Users, title: 'Expert Coaching', text: 'Full-day sessions led by qualified, energetic coaches' },
                  { icon: Star, title: 'Varied Activities', text: 'Multi-sport games, team challenges, and creative play' },
                  { icon: Heart, title: 'Inclusive Environment', text: 'Safe, inclusive, and engaging environment for kids aged 5–12' },
                  { icon: Trophy, title: 'Skill Development', text: 'Focus on building confidence, teamwork, and sports skills' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div>
                      <h4 className="font-fredoka font-semibold text-lg text-navy mb-1">
                        {item.title}
                      </h4>
                      <p className="font-nunito text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange/5 border border-orange/10 rounded-xl p-8 text-center">
              <p className="font-fredoka text-xl text-navy mb-4">
                We're busy building this program to be something special — stay tuned!
              </p>
              <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for updates"
                    className="flex-grow px-4 py-3 rounded-lg border border-orange/20 focus:ring-2 focus:ring-orange focus:border-orange transition-all"
                    required
                  />
                  <Button 
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Find a School CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-electric-blue">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="font-fredoka font-bold text-3xl text-white mb-8">
            Ready to Join the Fun?
          </h2>
          <Button 
            variant="secondary"
            size="lg"
            className="group text-lg px-12"
            onClick={() => navigate('/enrol')}
          >
            <span className="flex items-center gap-2">
              Find a School Near You
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Programs;