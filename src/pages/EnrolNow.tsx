import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { AlertCircle } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { createEnrollmentCheckout } from '../lib/enrollment';
import { useAuth } from '../hooks/useAuth';
import AuthWrapper from '../components/AuthWrapper';
import ConsentWaiver from '../components/ConsentWaiver';

interface FormData {
  parentName: string;
  email: string;
  mobile: string;
  childName: string;
  childAge: string;
  childSchool: string;
  medicalInfo: string;
  program: string;
  requiresPickup: boolean;
  photoPermission: boolean;
  termsAccepted: boolean;
}

const EnrolNow: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    mobile: '',
    childName: '',
    childAge: '',
    childSchool: '',
    medicalInfo: '',
    program: '',
    requiresPickup: false,
    photoPermission: false,
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useProducts();
  const { session } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      setError('Please sign in to continue with enrollment');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.program) {
        throw new Error('Please select a program');
      }

      // Store form data in session storage for post-payment processing
      sessionStorage.setItem('enrollmentData', JSON.stringify({
        ...formData,
        userId: session.user.id
      }));

      // Create dynamic checkout session
      const checkoutUrl = await createEnrollmentCheckout(
        formData,
        session.user.id,
        session.access_token
      );

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Enrollment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process enrollment. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[425px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img 
            src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnCLrg6q0VWDRZTOCKypG1r3kwa5hPvLtMFAn2" 
            alt="Children playing sports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Enrol Now
          </h1>
          <p className="font-nunito text-xl text-white/90 max-w-3xl mx-auto">
            Join the Jump Start family and give your child the gift of active confidence.
          </p>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <AuthWrapper requiredForAction="enroll your child">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {error && (
                <div className="mb-8 p-4 bg-red-50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="font-nunito text-red-700">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="parentName" className="block font-nunito font-medium text-navy mb-2">
                      Parent Full Name
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block font-nunito font-medium text-navy mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                      placeholder="0400 000 000"
                    />
                  </div>

                  <div>
                    <label htmlFor="childName" className="block font-nunito font-medium text-navy mb-2">
                      Child Full Name
                    </label>
                    <input
                      type="text"
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="childAge" className="block font-nunito font-medium text-navy mb-2">
                      Child Age
                    </label>
                    <select
                      id="childAge"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    >
                      <option value="">Select age</option>
                      {[5, 6, 7, 8, 9, 10, 11, 12].map(age => (
                        <option key={age} value={age}>{age} years</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="childSchool" className="block font-nunito font-medium text-navy mb-2">
                      Child's School
                    </label>
                    <input
                      type="text"
                      id="childSchool"
                      name="childSchool"
                      value={formData.childSchool}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="program" className="block font-nunito font-medium text-navy mb-2">
                      Program Selection
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                    >
                      <option value="">Select a program</option>
                      {products.map(product => (
                        <option key={product.price_id} value={product.price_id}>
                          {product.name} {product.description && `- ${product.description.substring(0, 50)}...`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="medicalInfo" className="block font-nunito font-medium text-navy mb-2">
                      Medical Information
                    </label>
                    <textarea
                      id="medicalInfo"
                      name="medicalInfo"
                      value={formData.medicalInfo}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                      placeholder="Please list any medical conditions, allergies, or special requirements"
                    ></textarea>
                  </div>
                </div>

                {/* Consent & Waiver Section */}
                <div className="col-span-1 md:col-span-2 mt-8">
                  <ConsentWaiver />
                </div>

                {/* Checkboxes - Full Width */}
                <div className="col-span-1 md:col-span-2 mt-8 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="requiresPickup"
                      checked={formData.requiresPickup}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="font-nunito text-gray-700 group-hover:text-gray-900">
                      My child is in Pre-Primary and requires hand-to-hand pickup
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="photoPermission"
                      checked={formData.photoPermission}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="font-nunito text-gray-700 group-hover:text-gray-900">
                      I give permission for photos/videos of my child to be used for promotional purposes
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="font-nunito text-gray-700 group-hover:text-gray-900">
                      I have read and agree to the Consent & Waiver above
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="col-span-1 md:col-span-2 mt-12">
                  <Button
                    variant="primary"
                    className="w-full md:w-auto md:min-w-[200px] text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Continue to Payment'}
                  </Button>
                </div>
              </div>
            </form>
          </AuthWrapper>
        </div>
      </section>
    </div>
  );
};

export default EnrolNow;