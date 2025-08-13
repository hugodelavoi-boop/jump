import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { session } = useAuth();
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Enrol Now', href: '/enrol' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnWPJpSzkzCMOqSAuJXoZlFvweIay7DfUcPRrn" 
                alt="Jump Start Sports Logo" 
                className="h-12 w-auto"
              />
              <span className={`font-fredoka font-bold text-xl ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}>
                Jump Start Sports
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.name}
                to={link.href}
                className={`font-nunito font-medium hover:text-electric-blue transition-colors ${
                  isScrolled ? 'text-navy' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {session && (
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${isScrolled ? 'text-navy' : 'text-white'}`}>
                  <User className="w-4 h-4" />
                  <span className="font-nunito text-sm">{session.user.email}</span>
                </div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${
                    isScrolled ? 'text-navy hover:bg-gray-100' : 'text-white'
                  }`}
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-navy hover:text-electric-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {session && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-navy hover:text-electric-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {session && (
                <Link
                  to="/dashboard"
                  className={`font-nunito font-medium hover:text-electric-blue transition-colors ${
                    isScrolled ? 'text-navy' : 'text-white'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              
              {session && (
                <div className="px-4 py-2 border-t border-gray-200 mt-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-navy">
                      <User className="w-4 h-4" />
                      <span className="font-nunito text-sm">{session.user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        supabase.auth.signOut();
                        setIsOpen(false);
                      }}
                      className="text-navy hover:text-electric-blue transition-colors"
                      title="Sign out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;