import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnY65fycslOicWPXSpzq52nf8KYI6tQ4eoyZTd" 
                alt="Jump Start Sports Logo" 
                className="h-12 w-auto"
              />
              <span className="font-fredoka font-bold text-xl">
                Jump Start Sports
              </span>
            </Link>
            <p className="font-nunito text-gray-300 mb-6">
              Fun, structured multi-sport sessions for primary school children across Perth. Building skills, confidence, and a lifelong love of movement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-fredoka font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="font-nunito space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/enrol" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Enrol Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-fredoka font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="font-nunito space-y-4">
              <li>
                <a 
                  href="mailto:hello@jumpstartsports.com.au"
                  className="flex items-center gap-2 text-gray-300 hover:text-electric-blue transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>hello@jumpstartsports.com.au</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:0478163609"
                  className="flex items-center gap-2 text-gray-300 hover:text-electric-blue transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>0478 163 609</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>Multiple locations across Perth</span>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="font-fredoka font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.instagram.com/jumpstartsports" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-blue transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
               href="https://www.facebook.com/share/1CMtXrRJU1/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-blue transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-sm text-gray-400 font-nunito">
              © {currentYear} Jump Start Sports. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 md:justify-end text-sm font-nunito">
              <a 
                href="/terms"
                className="text-gray-400 hover:text-electric-blue transition-colors"
              >
                Terms & Conditions
              </a>
              <a 
                href="/privacy"
                className="text-gray-400 hover:text-electric-blue transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/waiver"
                className="text-gray-400 hover:text-electric-blue transition-colors"
              >
                Parent Consent & Waiver
              </a>
              <a 
                href="/cookie-policy"
                className="text-gray-400 hover:text-electric-blue transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;