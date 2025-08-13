import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isSchool: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://hook.eu2.make.com/ab2r9d39wuk9ugg4y7pyj85ymomiuvda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          isSchool: formData.isSchool,
          submittedAt: new Date().toISOString(),
          source: 'contact_form'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        isSchool: false
      });
    } catch (err) {
      console.error('Form submission error:', err);
      alert('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[425px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img 
            src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnmdNJe7FvCGxr36QdWe2UqpMoNRzhYFIk9nEA"
            alt="Children playing sports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Get in Touch
          </h1>
          <p className="font-nunito text-xl text-white/90 max-w-3xl mx-auto">
            Have questions? We're here to help your child start their Jump Start journey.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-fredoka font-bold text-2xl text-navy mb-6">
                Send Us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-fredoka font-semibold text-xl text-navy mb-2">
                    Thanks! We'll be in touch soon.
                  </h3>
                  <p className="font-nunito text-gray-600">
                    We aim to respond to all inquiries within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-nunito font-medium text-navy mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-nunito font-medium text-navy mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block font-nunito font-medium text-navy mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    ></textarea>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="isSchool"
                      checked={formData.isSchool}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="font-nunito text-gray-700 group-hover:text-gray-900">
                      I'm a school interested in hosting Jump Start Sports
                    </span>
                  </label>
                  
                  <Button 
                    variant="primary" 
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-electric-blue rounded-2xl p-8 text-white">
                <h3 className="font-fredoka font-semibold text-xl mb-6">Contact Details</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:hello@jumpstartsports.com.au" 
                    className="flex items-center gap-4 hover:text-white/90 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                    <p className="font-nunito">hello@jumpstartsports.com.au</p>
                  </a>
                  <a 
                    href="tel:0478163609" 
                    className="flex items-center gap-4 hover:text-white/90 transition-colors"
                  >
                    <Phone className="w-6 h-6" />
                    <p className="font-nunito">0478 163 609</p>
                  </a>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <p className="font-nunito">Monday - Friday: 9am - 5pm</p>
                      <p className="font-nunito text-white/90">(Program hours vary)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-orange rounded-2xl p-8 text-white">
                <h3 className="font-fredoka font-semibold text-xl mb-6">Follow Us</h3>
                <p className="font-nunito mb-6">
                  Stay up to date with our latest programs, events, and sports tips.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/jumpstartsports" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                   href="https://www.facebook.com/share/1CMtXrRJU1/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;