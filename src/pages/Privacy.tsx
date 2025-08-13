import React from 'react';
import Navbar from '../components/Navbar';
import { Shield, Eye, Lock, Users, Mail, Phone, FileText, Database, CreditCard, Camera } from 'lucide-react';

const Privacy: React.FC = () => {
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
            <Shield className="w-8 h-8 text-white" />
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="font-nunito text-lg text-white/90 max-w-3xl mx-auto">
            How we protect and handle your family's personal information.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Introduction
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 leading-relaxed">
              Jump Start Sports ("we", "us", "our") respects your privacy and is committed to protecting the personal information of you and your child. This Privacy Policy outlines how we collect, use, store, and protect your personal information in compliance with the Australian Privacy Principles (APPs).
            </p>
          </div>
        </div>
      </section>

      {/* Information We Collect Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Database className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Information We Collect
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-electric-blue/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-electric-blue" />
                    <h3 className="font-fredoka font-semibold text-lg text-navy">
                      Parent/Guardian Details
                    </h3>
                  </div>
                  <ul className="font-nunito text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>Name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>Email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>Phone number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>Address</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-orange" />
                    <h3 className="font-fredoka font-semibold text-lg text-navy">
                      Payment Information
                    </h3>
                  </div>
                  <p className="font-nunito text-gray-700 text-sm">
                    Processed securely through Stripe (we do not store payment details)
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-navy/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-navy" />
                    <h3 className="font-fredoka font-semibold text-lg text-navy">
                      Child Details
                    </h3>
                  </div>
                  <ul className="font-nunito text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-navy">•</span>
                      <span>Name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-navy">•</span>
                      <span>Age</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-navy">•</span>
                      <span>School</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-navy">•</span>
                      <span>Relevant medical information</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-electric-blue/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-6 h-6 text-electric-blue" />
                    <h3 className="font-fredoka font-semibold text-lg text-navy">
                      Consent Preferences
                    </h3>
                  </div>
                  <p className="font-nunito text-gray-700 text-sm">
                    Including media consent for photos and videos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Your Information Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Eye className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                How We Use Your Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: 'To process enrolments and manage sessions', icon: FileText },
                { text: 'To communicate with parents about program updates', icon: Mail },
                { text: 'To ensure child safety and medical needs are met', icon: Shield },
                { text: 'To process payments securely via Stripe', icon: CreditCard },
                { text: 'With consent, to share photos/videos for promotional purposes', icon: Camera }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <span className="font-nunito text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Storage & Security Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Lock className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Storage & Security
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Secure Storage Systems
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  All data is stored securely in Google Workspace and Stripe systems. These platforms maintain industry-leading security standards and compliance with international data protection regulations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-fredoka font-medium text-navy mb-3">Access Control</h4>
                  <p className="font-nunito text-gray-700 text-sm">
                    Access is restricted to authorised Jump Start Sports staff only, with role-based permissions ensuring staff can only access information necessary for their duties.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-fredoka font-medium text-navy mb-3">Protection Measures</h4>
                  <p className="font-nunito text-gray-700 text-sm">
                    We take reasonable measures to prevent unauthorised access, misuse, or disclosure of your information through encryption and secure protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Parties Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Third Parties
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-nunito text-lg text-gray-700 leading-relaxed">
                We may share your information with trusted third parties only when necessary for program delivery (e.g., payment processing via Stripe) or as required by law.
              </p>

              <div className="bg-orange/5 border border-orange/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Our Commitment
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  <strong>We will never sell your personal information.</strong> Any third-party sharing is done solely to deliver our services effectively and with appropriate data protection agreements in place.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-fredoka font-medium text-navy mb-3">Stripe (Payment Processing)</h4>
                  <p className="font-nunito text-gray-700 text-sm">
                    Secure payment processing with industry-standard encryption and PCI DSS compliance.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-fredoka font-medium text-navy mb-3">Google Workspace</h4>
                  <p className="font-nunito text-gray-700 text-sm">
                    Secure data storage and communication systems with enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Your Rights
              </h2>
            </div>

            <div className="space-y-6">
              <p className="font-nunito text-lg text-gray-700 leading-relaxed">
                You have the right to access, update, or request deletion of your personal information. Please contact us at hello@jumpstartsports.com.au for assistance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-electric-blue/5 rounded-lg">
                  <Eye className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">
                    Access
                  </h3>
                  <p className="font-nunito text-gray-600 text-sm">
                    Request copies of all information we hold about you and your child
                  </p>
                </div>
                
                <div className="text-center p-6 bg-electric-blue/5 rounded-lg">
                  <FileText className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">
                    Update
                  </h3>
                  <p className="font-nunito text-gray-600 text-sm">
                    Correct any inaccurate or outdated information in our records
                  </p>
                </div>
                
                <div className="text-center p-6 bg-electric-blue/5 rounded-lg">
                  <Shield className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">
                    Delete
                  </h3>
                  <p className="font-nunito text-gray-600 text-sm">
                    Request deletion of your personal information (subject to legal requirements)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Contact Us
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8 leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your personal information, contact us at:
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
                  <Eye className="w-6 h-6 text-electric-blue" />
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

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-fredoka font-semibold text-lg text-navy mb-3">
                Australian Privacy Principles Compliance
              </h4>
              <p className="font-nunito text-gray-700 leading-relaxed">
                Jump Start Sports adheres to the Australian Privacy Principles under the Privacy Act 1988. If you believe we have not handled your information appropriately, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;