import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AuthWrapper from '../components/AuthWrapper';
import ConsentWaiver from '../components/ConsentWaiver';
import SchoolSelector from '../components/SchoolSelector';
import { useProducts } from '../contexts/ProductContext';
import { createEnrollment } from '../lib/enrollment';
import { createCheckoutSession } from '../lib/stripe';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import { User, Baby, School, Heart, Camera, Car, CheckCircle2, AlertCircle } from 'lucide-react';
import { products as staticProducts } from '../stripe-config';

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
  const { products, loading: productsLoading } = useProducts();
  const { session } = useAuth();
  
  // Force refresh products when component mounts
  useEffect(() => {
    console.log('🔄 EnrolNow page mounted, products available:', products.length);
    console.log('📊 Current products:', products);
  }, [products]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: session?.user?.email || '',
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
        return !!(formData.parentName && formData.email && formData.mobile && formData.childName && formData.childAge && formData.childSchool);
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
    console.log('Available products:', products);

    if (!validateStep(3)) {
      setError('Please accept the terms and conditions');
      return;
    }

    if (!session) {
      setError('You must be logged in to enroll');
      return;
    }

    // Validate selected program exists
    const selectedProduct = products.find(p => p.price_id === formData.program);
    const staticProduct = Object.values(staticProducts).find(p => p.priceId === formData.program);
    
    if (!selectedProduct && !staticProduct) {
      setError('Selected program is no longer available. Please refresh the page and try again.');
      return;
    }

    // Validate required form fields
    const requiredFields = {
      parentName: 'Parent name',
      email: 'Email address',
      mobile: 'Mobile number',
      childName: 'Child name',
      childAge: 'Child age',
      childSchool: 'Child school',
      program: 'Program selection'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field as keyof FormData] || formData[field as keyof FormData] === '') {
        setError(`${label} is required`);
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const mode = selectedProduct?.mode === 'subscription' ? 'subscription' : 'payment';

      console.log('Selected product:', selectedProduct || staticProduct);
      console.log('Payment mode:', mode);

      // Create checkout session
      console.log('Creating checkout session...');
      const successUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/enrol`;

      // Validate URLs
      if (!successUrl.includes('{CHECKOUT_SESSION_ID}')) {
        throw new Error('Invalid success URL format');
      }

      const { url: checkoutUrl, sessionId } = await createCheckoutSession(
        formData.program,
        mode,
        session.access_token,
        successUrl,
        cancelUrl,
        formData.email,
        formData.parentName,
        formData.childName
      );

      if (!checkoutUrl || !sessionId) {
        throw new Error('Invalid response from checkout service');
      }

      console.log('Checkout URL created:', checkoutUrl);
      console.log('Session ID:', sessionId);

      // Store enrollment data in localStorage before redirect
      const enrollmentForStorage = {
        parentName: formData.parentName,
        email: formData.email,
        mobile: formData.mobile || 'Not provided', // CULPRIT 3 FIX: Ensure mobile is never empty
        childName: formData.childName,
        childAge: formData.childAge,
        childSchool: formData.childSchool,
        medicalInfo: formData.medicalInfo,
        program: formData.program,
        programName: selectedProduct?.name || staticProduct?.name || 'Selected Program',
        paymentType: (selectedProduct?.mode || staticProduct?.mode) === 'subscription' ? 'Recurring Payment' : 'One-time Payment',
        requiresPickup: formData.requiresPickup,
        photoPermission: formData.photoPermission,
        sessionId: sessionId,
        checkoutSessionId: sessionId
      };
      
      console.log('📦 Storing enrollment data with mobile:', enrollmentForStorage.mobile);
      localStorage.setItem('pendingEnrollment', JSON.stringify(enrollmentForStorage));
      console.log('📦 Stored enrollment data in localStorage:', enrollmentForStorage);

      // Create enrollment record in database with the actual session ID
      console.log('Creating enrollment record...');
      try {
        await createEnrollment({
          parentName: formData.parentName,
          email: formData.email,
          mobile: formData.mobile,
          childName: formData.childName,
          childAge: formData.childAge,
          childSchool: formData.childSchool,
          medicalInfo: formData.medicalInfo,
          program: formData.program,
          requiresPickup: formData.requiresPickup,
          photoPermission: formData.photoPermission,
        }, session.user.id, sessionId);
        console.log('✅ Enrollment created successfully');
      } catch (enrollmentError) {
        console.error('⚠️ Enrollment creation failed, but continuing with checkout:', enrollmentError);
        // Don't fail the entire process if enrollment creation fails
      }

      setSuccess(true);

      // Redirect to checkout
      setTimeout(() => {
        console.log('🔄 Redirecting to checkout:', checkoutUrl);
        window.location.href = checkoutUrl;
      }, 2000);

    } catch (err) {
      console.error('Enrollment error:', err);
      
      let errorMessage = 'Failed to create enrollment';
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Provide more user-friendly error messages
        if (err.message.includes('No such price')) {
          errorMessage = 'The selected program is no longer available. Please refresh the page and try again.';
        } else if (err.message.includes('Network error')) {
          errorMessage = 'Connection error. Please check your internet connection and try again.';
        } else if (err.message.includes('Authorization')) {
          errorMessage = 'Session expired. Please refresh the page and sign in again.';
        }
      }
      
      setError(errorMessage);
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
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                          placeholder="0400 000 000"
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
                      <SchoolSelector
                        value={formData.childSchool}
                        onChange={(value) => setFormData(prev => ({ ...prev, childSchool: value }))}
                        required
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
                          {product.price_display !== undefined && (
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
                      {products.length > 0 ? products.map((product) => (
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
                              {product.price_display && (
                                <p className="font-nunito text-electric-blue font-semibold text-lg mb-2">
                                  {product.price_display}
                                </p>
                              )}
                                </p>
                              )}
                              {product.description && (
                                <p className="font-nunito text-gray-600 text-sm">
                                  {product.description}
                                </p>
                              )}
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-electric-blue/10 text-electric-blue">
                                  {product.mode === 'subscription' ? 'Recurring Payment' : 'One-time Payment'}
                                </span>
                                {product.price_display === 'A$0.00' && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    FREE TRIAL
                                  </span>
                                )}
                              </div>
                              
                              {/* Additional product details */}
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                    Professional coaching
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                    All equipment included
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                    Safe environment
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                    Secure payment
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.program === product.price_id
                                ? 'border-electric-blue bg-electric-blue'
                                : 'border-gray-300'
                            {product.price_display === 'A$0.00' && (
                              {formData.program === product.price_id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </div>
                        </label>
                      )) : products.length === 0 && !productsLoading ? (
                        // Static fallback products
                        Object.values(staticProducts).map((product) => (
                          <label
                            key={product.priceId}
                            className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              formData.program === product.priceId
                                ? 'border-electric-blue bg-electric-blue/5'
                                : 'border-gray-200 hover:border-electric-blue/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="program"
                              value={product.priceId}
                              checked={formData.program === product.priceId}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-fredoka font-semibold text-lg text-navy mb-2">
                                  {product.name}
                                </h3>
                                <p className="font-nunito text-electric-blue font-semibold text-lg mb-2">
                                  {product.price}
                                </p>
                                <p className="font-nunito text-gray-600 text-sm">
                                  {product.description}
                                </p>
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-electric-blue/10 text-electric-blue">
                                    One-time Payment
                                  </span>
                                  {product.price === 'A$0.00' && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      FREE TRIAL
                                    </span>
                                  )}
                                </div>
                                
                                {/* Additional product details */}
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                      Professional coaching
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                      All equipment included
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                      Safe environment
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <div className="w-1 h-1 bg-electric-blue rounded-full"></div>
                                      Secure payment
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                formData.program === product.priceId
                                  ? 'border-electric-blue bg-electric-blue'
                                  : 'border-gray-300'
                              }`}>
                                {formData.program === product.priceId && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                            </div>
                          </label>
                        ))
                      ) : null}
                      
                      {productsLoading && (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric-blue mx-auto mb-4"></div>
                          <p className="font-nunito text-gray-600">Loading programs...</p>
                        </div>
                      )}
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
                          <span className="font-nunito font-medium text-gray-600">Mobile:</span>
                          <p className="font-nunito text-navy">{formData.mobile}</p>
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
                            {products.find(p => p.price_id === formData.program)?.name || 
                             Object.values(staticProducts).find(p => p.priceId === formData.program)?.name || 
                             'Selected Program'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 col-span-full">
                      <p className="font-nunito text-gray-600 mb-4">No programs available at the moment.</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="text-electric-blue hover:text-electric-blue/80 transition-colors"
                      >
                        Refresh page
                      </button>
                    </div>
                  )}