import React from 'react';
import Navbar from '../components/Navbar';
import { FileText, Building, CreditCard, Users, Shield, Heart, AlertTriangle, Scale, Mail, Globe } from 'lucide-react';

const Terms: React.FC = () => {
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
              Terms & Conditions
            </h1>
          </div>
          <p className="font-nunito text-lg text-white/90 max-w-3xl mx-auto">
            Important information about Jump Start Sports programs and policies.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Building className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                About Us
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8 leading-relaxed">
              Jump Start Sports ("we", "us", "our") provides structured, inclusive, and fun multi-sport programs for children aged 5–12 years. Our sessions are delivered before and after school during the school term, as well as seasonal holiday programs, at selected schools around Perth.
            </p>

            <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-xl p-6">
              <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-nunito text-gray-700">
                <div>
                  <strong>Business Name:</strong> Jump Start Sports
                </div>
                <div>
                  <strong>ABN:</strong> 59757218320
                </div>
                <div>
                  <strong>Email:</strong> 
                  <a href="mailto:hello@jumpstartsports.com.au" className="text-electric-blue hover:text-electric-blue/80 ml-1">
                    hello@jumpstartsports.com.au
                  </a>
                </div>
                <div>
                  <strong>Website:</strong> 
                  <a href="https://www.jumpstartsports.com.au" className="text-electric-blue hover:text-electric-blue/80 ml-1">
                    www.jumpstartsports.com.au
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Structure Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Program Structure
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-electric-blue/5 rounded-lg p-6">
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">Session Details</h3>
                  <ul className="font-nunito text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>Sessions run for approximately 1 hour before and/or after school</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>Sessions are adapted to be age-appropriate and ability-friendly</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange/5 rounded-lg p-6">
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">Sports Variety</h3>
                  <ul className="font-nunito text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange">•</span>
                      <span>Soccer, AFL, dodgeball, basketball, tennis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange">•</span>
                      <span>Relay games and team activities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-navy/5 border border-navy/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Program Goals
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Programs are designed to promote confidence, coordination, inclusivity, and fun for all participants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrolment & Payment Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Enrolment & Payment
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Enrolments must be made online via our official booking system (Stripe integrated)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Fees are displayed at the time of booking and are payable in full to confirm enrolment</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Spaces are limited and allocated on a first-come, first-served basis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">By enrolling, you confirm that your child meets the eligibility requirements (ages 5–12)</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Cancellations & Refunds
                </h3>
                <div className="space-y-3 font-nunito text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <span><strong>7+ days before:</strong> Full refund</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    </div>
                    <span><strong>Less than 7 days:</strong> 50% refund</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <span><strong>After term starts:</strong> No refunds (unless required by law)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                    <span><strong>Weather/School closure:</strong> Reschedule or credit provided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attendance & Safety Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Attendance & Safety
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Parent Responsibilities
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Ensure your child is signed in and out as required</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Children must be collected promptly at the end of each session</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Written consent required if someone other than parent/guardian is collecting</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Participant Expectations
                </h3>
                <div className="bg-orange/5 rounded-lg p-4">
                  <p className="font-nunito text-gray-700 leading-relaxed">
                    All participants are expected to follow coach instructions and adhere to our Code of Conduct for a safe and enjoyable experience for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Code of Conduct
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8">
              Jump Start Sports is committed to providing a safe, inclusive, and respectful environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Expected Behaviour
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Children are expected to participate in a positive, respectful manner</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <span className="font-nunito text-gray-700">Follow coach instructions and safety guidelines</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Unacceptable Behaviour
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-nunito text-gray-700 text-sm leading-relaxed">
                    Bullying, aggressive behaviour, or refusal to follow instructions will not be tolerated. We reserve the right to remove a participant from the program for repeated breaches of conduct.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-electric-blue/5 rounded-lg p-6">
              <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                Behaviour Management
              </h3>
              <p className="font-nunito text-gray-700 leading-relaxed">
                Coaches will implement behaviour management strategies in line with child safety best practice to ensure a positive environment for all participants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health & Medical Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Health & Medical Conditions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Disclosure Requirements
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Parents/guardians must disclose all relevant medical or behavioural conditions during enrolment. Jump Start Sports is not responsible for pre-existing conditions not disclosed at enrolment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-electric-blue/5 rounded-lg p-6">
                  <h4 className="font-fredoka font-medium text-navy mb-3">Medical Consent</h4>
                  <p className="font-nunito text-gray-700 text-sm">
                    You consent to our coaches providing first aid if necessary and to seek medical assistance in an emergency.
                  </p>
                </div>
                <div className="bg-orange/5 rounded-lg p-6">
                  <h4 className="font-fredoka font-medium text-navy mb-3">Safety Protocols</h4>
                  <p className="font-nunito text-gray-700 text-sm">
                    All staff maintain valid Working With Children Checks and current First Aid certification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Liability Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Insurance & Liability
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Our Coverage
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Jump Start Sports holds Public Liability Insurance and all staff maintain valid Working With Children Checks (WWCC).
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Risk Acknowledgment
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  While all reasonable precautions are taken, participation involves inherent risks associated with physical activity. By enrolling, you agree to release and indemnify Jump Start Sports from any claims for injuries, damages, or losses, except where caused by negligence on our part.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography & Media Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Photography & Media Consent
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-electric-blue/5 rounded-lg p-6">
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">Usage</h3>
                  <p className="font-nunito text-gray-700 text-sm">
                    During sessions, Jump Start Sports may take photographs or videos of children for promotional purposes (social media, website, brochures).
                  </p>
                </div>
                <div className="bg-orange/5 rounded-lg p-6">
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">Opt-Out</h3>
                  <p className="font-nunito text-gray-700 text-sm">
                    Parents/guardians may opt out during enrolment by selecting "No" to media consent.
                  </p>
                </div>
              </div>

              <div className="bg-navy/5 border border-navy/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Privacy Protection
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  No child will be identified by name in public-facing materials without explicit written consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Privacy
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-electric-blue/5 rounded-lg p-6 text-center">
                  <Users className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">Collection</h3>
                  <p className="font-nunito text-gray-700 text-sm">
                    Personal information collected solely for enrolment and administration
                  </p>
                </div>
                <div className="bg-electric-blue/5 rounded-lg p-6 text-center">
                  <Shield className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">Storage</h3>
                  <p className="font-nunito text-gray-700 text-sm">
                    Secure storage through Google Workspace and Stripe systems
                  </p>
                </div>
                <div className="bg-electric-blue/5 rounded-lg p-6 text-center">
                  <Shield className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">Compliance</h3>
                  <p className="font-nunito text-gray-700 text-sm">
                    Full compliance with Australian Privacy Principles (APPs)
                  </p>
                </div>
              </div>

              <div className="bg-orange/5 border border-orange/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Third Party Sharing
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Personal information will not be shared with third parties except as required by law or for program delivery. We will never sell your personal information.
                </p>
              </div>

              <div className="text-center">
                <p className="font-nunito text-gray-700">
                  For full details, see our <a href="/privacy" className="text-electric-blue hover:text-electric-blue/80 transition-colors">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Changes & Termination Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Program Changes & Termination
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Program Modifications
                </h3>
                <p className="font-nunito text-gray-700 text-sm leading-relaxed">
                  We reserve the right to modify session times, locations, or content if required due to schools, weather, or coach availability.
                </p>
              </div>

              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-3">
                  Program Termination
                </h3>
                <p className="font-nunito text-gray-700 text-sm leading-relaxed">
                  In the unlikely event of program termination, fees for remaining sessions will be refunded.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Law Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Scale className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Governing Law
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 leading-relaxed">
              These Terms are governed by the laws of Western Australia. Any disputes will be handled in the jurisdiction of Western Australian courts.
            </p>
          </div>
        </div>
      </section>

      {/* Acknowledgement Section */}
      <section className="py-16 md:py-24 px-4 bg-electric-blue">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-electric-blue" />
              <h2 className="font-fredoka font-bold text-3xl text-navy">
                Acknowledgement
              </h2>
            </div>

            <p className="font-nunito text-lg text-gray-700 mb-8 leading-relaxed">
              By enrolling your child, you confirm that:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                </div>
                <span className="font-nunito text-gray-700">You have read and understood these Terms & Conditions</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                </div>
                <span className="font-nunito text-gray-700">You consent to your child's participation in Jump Start Sports programs</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                </div>
                <span className="font-nunito text-gray-700">You accept responsibility for providing accurate information regarding your child's health and safety</span>
              </div>
            </div>

            <div className="mt-8 bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-6 text-center">
              <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                Questions About Our Terms?
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="mailto:hello@jumpstartsports.com.au"
                  className="inline-flex items-center gap-2 text-electric-blue hover:text-electric-blue/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-nunito">hello@jumpstartsports.com.au</span>
                </a>
                <a 
                  href="https://www.jumpstartsports.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-electric-blue hover:text-electric-blue/80 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-nunito">www.jumpstartsports.com.au</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;