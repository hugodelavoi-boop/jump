import React from 'react';
import ContactForm from './ContactForm';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-navy mb-4">
            Get In Touch
          </h2>
          <p className="font-nunito text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions or ready to enroll? We're here to help get your child started on their Jump Start journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <h3 className="font-fredoka font-semibold text-2xl text-navy mb-6">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="bg-electric-blue rounded-2xl p-8 text-white shadow-md mb-8">
              <h3 className="font-fredoka font-semibold text-2xl mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-fredoka font-medium text-lg">Our Locations</h4>
                    <p className="font-nunito">Subiaco Community Centre, Perth</p>
                    <p className="font-nunito">Leederville Oval, Perth</p>
                    <p className="font-nunito">Karrinyup Sports Complex, Perth</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-fredoka font-medium text-lg">Phone</h4>
                    <p className="font-nunito">(08) 9123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-fredoka font-medium text-lg">Email</h4>
                    <p className="font-nunito">info@jumpstartsports.com.au</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-fredoka font-medium text-lg">Office Hours</h4>
                    <p className="font-nunito">Monday - Friday: 9am - 5pm</p>
                    <p className="font-nunito">Saturday: 8am - 2pm (Program hours vary)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="bg-orange rounded-2xl p-8 text-white shadow-md">
              <h3 className="font-fredoka font-semibold text-2xl mb-6">
                Follow Us
              </h3>
              <p className="font-nunito mb-6">
                Stay up to date with our latest programs, events, and soccer tips by following us on social media.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;