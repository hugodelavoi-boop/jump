import React from 'react';
import Navbar from '../components/Navbar';
import { FileText, AlertTriangle, Shield, Eye, Users, Mail, Phone, MapPin } from 'lucide-react';

const Waiver: React.FC = () => {
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
            <FileText className="w-8 h-8 text-white" />
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-white">
              Parent Consent & Information
            </h1>
          </div>
          <p className="font-nunito text-lg text-white/90 max-w-3xl mx-auto">
            Complete information for parents and guardians about consent, privacy, and your rights.
          </p>
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="py-8 px-4 bg-gray-50 border-b">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#consent-form" className="px-4 py-2 rounded-lg bg-electric-blue text-white hover:bg-electric-blue/90 transition-colors">
              Consent Form
            </a>
            <a href="#privacy-policy" className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-navy hover:bg-gray-50 transition-colors">
              Privacy Policy
            </a>
            <a href="#data-collection" className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-navy hover:bg-gray-50 transition-colors">
              Data Collection
            </a>
            <a href="#parent-rights" className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-navy hover:bg-gray-50 transition-colors">
              Your Rights
            </a>
            <a href="#contact-consent" className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-navy hover:bg-gray-50 transition-colors">
              Contact Us
            </a>
          </nav>
        </div>
      </section>

      {/* Consent Form Section */}
      <section id="consent-form" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Jump Start Sports – Consent & Waiver
              </h2>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="font-nunito text-sm text-yellow-800">
                <strong>Important:</strong> By enrolling your child in Jump Start Sports programs, you acknowledge and agree to the following:
              </p>
            </div>

            <div className="space-y-8 font-nunito text-gray-700">
              <div>
                <h3 className="font-fredoka font-bold text-xl text-navy mb-4">
                  1. Acknowledgement of Risk
                </h3>
                <p className="leading-relaxed">
                  I acknowledge that participation in Jump Start Sports activities involves physical activity, and while all reasonable precautions are taken, there are inherent risks of injury. I accept full responsibility for my child's participation.
                </p>
              </div>

              <div>
                <h3 className="font-fredoka font-bold text-xl text-navy mb-4">
                  2. Medical Consent
                </h3>
                <p className="leading-relaxed">
                  In the event of illness or injury, I authorise Jump Start Sports staff to administer first aid and, if necessary, seek emergency medical treatment for my child. I confirm that I have provided accurate and up-to-date medical information.
                </p>
              </div>

              <div>
                <h3 className="font-fredoka font-bold text-xl text-navy mb-4">
                  3. Photography & Media
                </h3>
                <p className="leading-relaxed">
                  I understand that Jump Start Sports may take photographs or videos of children during sessions for promotional purposes (social media, website, brochures). No child will be identified by name in public-facing materials without explicit written consent. Parents may contact Jump Start Sports if they wish to opt their child out of photography/media use.
                </p>
              </div>

              <div>
                <h3 className="font-fredoka font-bold text-xl text-navy mb-4">
                  4. Liability Waiver
                </h3>
                <p className="leading-relaxed">
                  I release and indemnify Jump Start Sports from any claims or liability arising from my child's participation, except in cases of proven negligence by Jump Start Sports staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy-policy" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Eye className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Privacy Policy for Minors
              </h2>
            </div>

            <div className="space-y-6 font-nunito text-gray-700">
              <div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Protection of Children's Information
                </h3>
                <p className="leading-relaxed">
                  Jump Start Sports is committed to protecting the privacy and safety of children participating in our programs. We comply with Australian privacy laws and maintain strict protocols for handling information related to minors.
                </p>
              </div>

              <div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Information We Collect About Your Child
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Name, age, and school information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Medical conditions and emergency contact details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Attendance records and participation notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Photos and videos (with explicit consent)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  How We Use This Information
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Ensuring your child's safety and wellbeing during sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Providing appropriate coaching and support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Communication with parents about programs and progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-electric-blue">•</span>
                    <span>Emergency contact purposes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-4">
                <p className="text-sm font-medium text-navy">
                  <strong>Important:</strong> We never share your child's personal information with third parties except as required by law or in emergency situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Collection Section */}
      <section id="data-collection" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Data Collection & Usage Policies
              </h2>
            </div>

            <div className="space-y-6 font-nunito text-gray-700">
              <div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  What Data We Collect
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-fredoka font-medium text-navy mb-2">Required Information</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Child's full name and age</li>
                      <li>• Parent/guardian contact details</li>
                      <li>• School and grade information</li>
                      <li>• Medical conditions and allergies</li>
                      <li>• Emergency contact information</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-fredoka font-medium text-navy mb-2">Optional Information</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Photos and videos (with consent)</li>
                      <li>• Progress notes and feedback</li>
                      <li>• Communication preferences</li>
                      <li>• Additional support needs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Data Security Measures
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-electric-blue/5 rounded-lg">
                    <Shield className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <h4 className="font-fredoka font-medium text-navy mb-1">Secure Storage</h4>
                    <p className="text-sm">All data encrypted and stored securely</p>
                  </div>
                  <div className="text-center p-4 bg-electric-blue/5 rounded-lg">
                    <Users className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <h4 className="font-fredoka font-medium text-navy mb-1">Limited Access</h4>
                    <p className="text-sm">Only authorised staff can access records</p>
                  </div>
                  <div className="text-center p-4 bg-electric-blue/5 rounded-lg">
                    <FileText className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <h4 className="font-fredoka font-medium text-navy mb-1">Regular Audits</h4>
                    <p className="text-sm">Data handling reviewed regularly</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Data Retention Policy
                </h3>
                <div className="bg-orange/5 border border-orange/20 rounded-lg p-4">
                  <p className="leading-relaxed">
                    We retain your child's information for the duration of their participation in our programs plus 7 years as required by insurance and legal obligations. After this period, all personal information is securely destroyed unless you request earlier deletion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Rights Section */}
      <section id="parent-rights" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Parent/Guardian Rights & Responsibilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rights */}
              <div>
                <h3 className="font-fredoka font-semibold text-xl text-navy mb-6">
                  Your Rights
                </h3>
                <div className="space-y-4">
                  {[
                    'Access your child\'s information at any time',
                    'Request corrections to inaccurate information',
                    'Withdraw consent for photography/media use',
                    'Request deletion of your child\'s data',
                    'Receive copies of all information we hold',
                    'Complain about our data handling practices'
                  ].map((right, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                      </div>
                      <span className="font-nunito text-gray-700">{right}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="font-fredoka font-semibold text-xl text-navy mb-6">
                  Your Responsibilities
                </h3>
                <div className="space-y-4">
                  {[
                    'Provide accurate and up-to-date information',
                    'Inform us of any changes to medical conditions',
                    'Ensure emergency contacts are current',
                    'Notify us of custody arrangements affecting pickup',
                    'Update consent preferences as needed',
                    'Communicate any concerns promptly'
                  ].map((responsibility, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="w-2 h-2 bg-orange rounded-full"></span>
                      </div>
                      <span className="font-nunito text-gray-700">{responsibility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-6">
              <h4 className="font-fredoka font-semibold text-lg text-navy mb-3">
                Withdrawal of Consent
              </h4>
              <p className="font-nunito text-gray-700 leading-relaxed">
                You may withdraw your consent at any time by contacting us directly. Please note that withdrawal of consent may affect your child's ability to participate in certain activities or programs. We will work with you to find suitable alternatives wherever possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact-consent" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Contact Us About Consent
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8">
              If you have any questions about consent, privacy, or your rights, please don't hesitate to contact us using any of the methods below:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-fredoka font-semibold text-lg text-navy mb-1">
                      Email
                    </h3>
                    <a 
                      href="mailto:hello@jumpstartsports.com.au" 
                      className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors"
                    >
                      hello@jumpstartsports.com.au
                    </a>
                    <p className="font-nunito text-sm text-gray-600 mt-1">
                      For consent-related inquiries, include "CONSENT" in the subject line
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-fredoka font-semibold text-lg text-navy mb-1">
                      Phone
                    </h3>
                    <a 
                      href="tel:0478163609" 
                      className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors"
                    >
                      0478 163 609
                    </a>
                    <p className="font-nunito text-sm text-gray-600 mt-1">
                      Monday - Friday: 9am - 5pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-electric-blue/5 rounded-xl p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Response Times
                </h3>
                <div className="space-y-3 font-nunito text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">General inquiries:</span>
                    <span className="font-medium text-navy">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consent/privacy matters:</span>
                    <span className="font-medium text-navy">Same day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency matters:</span>
                    <span className="font-medium text-navy">Immediate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-fredoka font-semibold text-lg text-navy mb-3">
                Australian Privacy Principles
              </h4>
              <p className="font-nunito text-gray-700 leading-relaxed">
                Jump Start Sports adheres to the Australian Privacy Principles under the Privacy Act 1988. If you believe we have not handled your child's information appropriately, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Confirmation Section */}
      <section className="py-16 md:py-24 px-4 bg-electric-blue">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-fredoka font-bold text-3xl text-white mb-6">
            Ready to Enrol Your Child?
          </h2>
          <p className="font-nunito text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            By proceeding with enrollment, you confirm that you have read and understood all consent and privacy information above.
          </p>
          <a 
            href="/enrol"
            className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-nunito font-medium rounded-full hover:bg-orange/90 transition-colors duration-300"
          >
            Proceed to Enrollment
          </a>
        </div>
      </section>
    </div>
  );
};

export default Waiver;