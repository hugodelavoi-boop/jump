import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AuthWrapper from '../components/AuthWrapper';
import ConsentWaiver from '../components/ConsentWaiver';
import { useProducts } from '../contexts/ProductContext';
import { createEnrollment } from '../lib/enrollment';
import { createCheckoutSession } from '../lib/stripe';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import { User, Baby, School, Heart, Camera, Car, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  parentName: string;
  email: string;
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
  const { products, loading: productsLoading } = useProducts();
  const { session } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: session?.user?.email || '',
    childName: '',
    childAge: '',
    childSchool: '',
    medicalInfo: '',
    program: '',
    requiresPickup: false,
    photoPermission: false,
    termsAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) setError(null);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.parentName && formData.email && formData.childName && formData.childAge && formData.childSchool);
      case 2:
        return !!formData.program;
      case 3:
        return formData.termsAccepted;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      setError(null);
    } else {
      setError('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleSubmit = async () => {
    console.log('Starting enrollment submission...');
    console.log('Form data:', formData);
    console.log('Session:', session);

    if (!validateStep(3)) {
      setError('Please accept the terms and conditions');
      return;
    }

    if (!session) {
      setError('You must be logged in to enroll');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create enrollment record
      console.log('Creating enrollment record...');
      await createEnrollment({
        parentName: formData.parentName,
        email: formData.email,
        childName: formData.childName,
        childAge: formData.childAge,
        childSchool: formData.childSchool,
        medicalInfo: formData.medicalInfo,
        program: formData.program,
        requiresPickup: formData.requiresPickup,
        photoPermission: formData.photoPermission,
      }, session.user.id);

      console.log('Enrollment created successfully');
      setSuccess(true);

      // Find the selected product to get the mode
      const selectedProduct = products.find(p => p.price_id === formData.program);
      const mode = selectedProduct?.mode === 'subscription' ? 'subscription' : 'payment';

      console.log('Selected product:', selectedProduct);
      console.log('Payment mode:', mode);

      // Create checkout session
      console.log('Creating checkout session...');
      const successUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/enrol`;

      const checkoutUrl = await createCheckoutSession(
        formData.program,
        mode,
        session.access_token,
        successUrl,
        cancelUrl
      );

      console.log('Checkout URL created:', checkoutUrl);

      // Redirect to checkout
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 2000);

    } catch (err) {
      console.error('Enrollment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create enrollment');
      setSuccess(false);
    } finally {
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
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-white mb-6">
            Enrol Your Child
          </h1>
          <p className="font-nunito text-lg text-white/90 max-w-3xl mx-auto">
            Join hundreds of happy families and give your child the gift of movement, confidence, and fun.
          </p>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <AuthWrapper requiredForAction="enroll your child">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-gray-50 px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step 
                          ? 'bg-electric-blue text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 mx-2 ${
                          currentStep > step ? 'bg-electric-blue' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <span className="font-nunito text-sm text-gray-600">
                    Step {currentStep} of 3: {
                      currentStep === 1 ? 'Child & Parent Details' :
                      currentStep === 2 ? 'Select Program' :
                      'Review & Consent'
                    }
                  </span>
                </div>
              </div>

              <div className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="font-nunito text-red-700">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="font-nunito text-green-700">
                      Enrollment created successfully! Redirecting to payment...
                    </p>
                  </div>
                )}

                {/* Step 1: Child & Parent Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="w-6 h-6 text-electric-blue" />
                      <h2 className="font-fredoka font-bold text-2xl text-navy">
                        Child & Parent Details
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-nunito font-medium text-navy mb-2">
                          Parent/Guardian Name *
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block font-nunito font-medium text-navy mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block font-nunito font-medium text-navy mb-2">
                          Child's Name *
                        </label>
                        <input
                          type="text"
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                          placeholder="Child's full name"
                        />
                      </div>

                      <div>
                        <label className="block font-nunito font-medium text-navy mb-2">
                          Child's Age *
                        </label>
                        <select
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                        >
                          <option value="">Select age</option>
                          {[5, 6, 7, 8, 9, 10, 11, 12].map(age => (
                            <option key={age} value={age.toString()}>{age} years old</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-nunito font-medium text-navy mb-2">
                        Child's School *
                      </label>
                      <input
                        type="text"
                        name="childSchool"
                        value={formData.childSchool}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                        placeholder="School name"
                      />
                    </div>

                    <div>
                      <label className="block font-nunito font-medium text-navy mb-2">
                        Medical Information
                      </label>
                      <textarea
                        name="medicalInfo"
                        value={formData.medicalInfo}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                        placeholder="Any medical conditions, allergies, or special requirements we should know about (optional)"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        onClick={nextStep}
                        disabled={!validateStep(1)}
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Select Program */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <School className="w-6 h-6 text-electric-blue" />
                      <h2 className="font-fredoka font-bold text-2xl text-navy">
                        Select Program
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {products.map((product) => (
                        <label
                          key={product.price_id}
                          className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.program === product.price_id
                              ? 'border-electric-blue bg-electric-blue/5'
                              : 'border-gray-200 hover:border-electric-blue/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="program"
                            value={product.price_id}
                            checked={formData.program === product.price_id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">
                                {product.name}
                              </h3>
                              {product.description && (
                                <p className="font-nunito text-gray-600 text-sm">
                                  {product.description}
                                </p>
                              )}
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.program === product.price_id
                                ? 'border-electric-blue bg-electric-blue'
                                : 'border-gray-300'
                            }`}>
                              {formData.program === product.price_id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-electric-blue" />
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="requiresPickup"
                            checked={formData.requiresPickup}
                            onChange={handleInputChange}
                            className="h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                          />
                          <span className="font-nunito text-gray-700">
                            My child requires pickup assistance
                          </span>
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-electric-blue" />
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="photoPermission"
                            checked={formData.photoPermission}
                            onChange={handleInputChange}
                            className="h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                          />
                          <span className="font-nunito text-gray-700">
                            I consent to photos/videos for promotional use
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="primary"
                        onClick={nextStep}
                        disabled={!validateStep(2)}
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Consent */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Heart className="w-6 h-6 text-electric-blue" />
                      <h2 className="font-fredoka font-bold text-2xl text-navy">
                        Review & Consent
                      </h2>
                    </div>

                    {/* Enrollment Summary */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                        Enrollment Summary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-nunito font-medium text-gray-600">Parent:</span>
                          <p className="font-nunito text-navy">{formData.parentName}</p>
                        </div>
                        <div>
                          <span className="font-nunito font-medium text-gray-600">Email:</span>
                          <p className="font-nunito text-navy">{formData.email}</p>
                        </div>
                        <div>
                          <span className="font-nunito font-medium text-gray-600">Child:</span>
                          <p className="font-nunito text-navy">{formData.childName}</p>
                        </div>
                        <div>
                          <span className="font-nunito font-medium text-gray-600">Age:</span>
                          <p className="font-nunito text-navy">{formData.childAge} years old</p>
                        </div>
                        <div>
                          <span className="font-nunito font-medium text-gray-600">School:</span>
                          <p className="font-nunito text-navy">{formData.childSchool}</p>
                        </div>
                        <div>
                          <span className="font-nunito font-medium text-gray-600">Program:</span>
                          <p className="font-nunito text-navy">
                            {products.find(p => p.price_id === formData.program)?.name || 'Selected Program'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Consent & Waiver */}
                    <ConsentWaiver />

                    {/* Terms Acceptance */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 rounded border-gray-300 text-electric-blue focus:ring-electric-blue"
                          required
                        />
                        <span className="font-nunito text-gray-700">
                          I have read and agree to the{' '}
                          <a href="/terms" target="_blank" className="text-electric-blue hover:text-electric-blue/80">
                            Terms & Conditions
                          </a>
                          ,{' '}
                          <a href="/privacy" target="_blank" className="text-electric-blue hover:text-electric-blue/80">
                            Privacy Policy
                          </a>
                          , and the Consent & Waiver above. *
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={isSubmitting}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!validateStep(3) || isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : 'Complete Enrollment'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AuthWrapper>
        </div>
      </section>
    </div>
  );
};

export default EnrolNow;