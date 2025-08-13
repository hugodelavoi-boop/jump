import React from 'react';
import Navbar from '../components/Navbar';
import { Cookie, Settings, BarChart3, Globe, Mail, Calendar } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[325px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img 
            src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnmdNJe7FvCGxr36QdWe2UqpMoNRzhYFIk9nEA"
            alt="Children playing sports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Cookie className="w-8 h-8 text-white" />
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-white">
              Cookie Policy
            </h1>
          </div>
          <p className="font-nunito text-lg text-white/90 max-w-3xl mx-auto">
            How we use cookies and similar technologies on our website.
          </p>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span className="font-nunito">Last updated: August 5, 2025</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <p className="font-nunito text-lg text-gray-700 leading-relaxed">
              This Cookie Policy explains how Jump Start Sports ("we", "us", or "our") uses cookies and similar technologies when you visit our website 
              <a href="https://www.jumpstartsports.com.au" className="text-electric-blue hover:text-electric-blue/80 transition-colors"> www.jumpstartsports.com.au</a> (the "Site").
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Cookie className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                What Are Cookies?
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They help us improve your browsing experience by remembering your preferences and enabling key site functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Types of Cookies We Use
              </h2>
            </div>

            <div className="space-y-8">
              {/* Essential Cookies */}
              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-xl p-6">
                <h3 className="font-fredoka font-bold text-xl text-navy mb-4">
                  Essential Cookies
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-orange/5 border border-orange/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-6 h-6 text-orange" />
                  <h3 className="font-fredoka font-bold text-xl text-navy">
                    Performance and Analytics Cookies
                  </h3>
                </div>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously (e.g. pages visited, time spent on the site).
                </p>
              </div>

              {/* Functionality Cookies */}
              <div className="bg-navy/5 border border-navy/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-6 h-6 text-navy" />
                  <h3 className="font-fredoka font-bold text-xl text-navy">
                    Functionality Cookies
                  </h3>
                </div>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  These cookies remember your preferences and choices (such as language or region) to provide a more personalized experience.
                </p>
              </div>

              {/* Third-Party Cookies */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-gray-600" />
                  <h3 className="font-fredoka font-bold text-xl text-navy">
                    Third-Party Cookies
                  </h3>
                </div>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  We may use third-party services (like Google Analytics) that place their own cookies on your device. These cookies are managed by the third parties and are subject to their own privacy policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Manage Cookies */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                How to Manage Cookies
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8 leading-relaxed">
              Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies at any time. However, doing so may affect the functionality of certain parts of our website.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-electric-blue/10 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Google Chrome
                </h3>
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors text-sm"
                >
                  Cookie Settings Guide
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange/10 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Mozilla Firefox
                </h3>
                <a 
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors text-sm"
                >
                  Cookie Settings Guide
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-navy/10 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-navy" />
                </div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Safari
                </h3>
                <a 
                  href="https://support.apple.com/en-au/guide/safari/sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors text-sm"
                >
                  Cookie Settings Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Changes to This Policy
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 leading-relaxed">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Contact Us
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8 leading-relaxed">
              If you have any questions about our use of cookies, you can contact us at:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-electric-blue/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-electric-blue" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy">
                    Email
                  </h3>
                </div>
                <a 
                  href="mailto:hello@jumpstartsports.com.au" 
                  className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors text-lg"
                >
                  hello@jumpstartsports.com.au
                </a>
              </div>

              <div className="bg-electric-blue/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-electric-blue" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy">
                    Website
                  </h3>
                </div>
                <a 
                  href="https://www.jumpstartsports.com.au" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors text-lg"
                >
                  www.jumpstartsports.com.au
                </a>
              </div>
            </div>

            <div className="mt-8 bg-orange/5 border border-orange/20 rounded-lg p-6">
              <h4 className="font-fredoka font-semibold text-lg text-navy mb-3">
                Business Details
              </h4>
              <div className="font-nunito text-gray-700">
                <p><strong>Business Name:</strong> Jump Start Sports</p>
                <p><strong>ABN:</strong> 59757218320</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;