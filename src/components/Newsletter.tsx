import React, { useState } from 'react';
import Button from './Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic would go here
    console.log('Subscribed with:', email);
    setIsSubmitted(true);
    setEmail('');
  };
  
  return (
    <section className="py-16 px-4 bg-navy text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gradient-to-r from-electric-blue to-blue-600 rounded-2xl py-12 px-6 md:px-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-fredoka font-bold text-3xl mb-4">
                Stay in the Loop!
              </h2>
              <p className="font-nunito mb-4">
                Subscribe to our newsletter for program updates, coaching tips, and exclusive offers for Jump Start families.
              </p>
            </div>
            
            <div>
              {isSubmitted ? (
                <div className="bg-white/20 rounded-lg p-6 text-center">
                  <svg className="h-16 w-16 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-fredoka font-semibold text-xl mb-2">Thanks for Subscribing!</h3>
                  <p className="font-nunito">You'll be the first to know about our latest news and offers.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-orange focus:outline-none"
                  />
                  <Button variant="secondary">Subscribe</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;