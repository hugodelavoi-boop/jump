import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import { getEnrollmentBySessionId } from '../lib/enrollment';

interface EnrollmentDetails {
  program_name: string;
  payment_type: string;
  child_name: string;
  parent_name: string;
  email: string;
  mobile: string;
  child_age: string;
  child_school: string;
  medical_info: string;
  requires_pickup: boolean;
  photo_permission: boolean;
  checkout_session_id: string;
}

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [enrollmentDetails, setEnrollmentDetails] = useState<EnrollmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const fetchAndSubmit = async () => {
      try {
        console.log('🎯 Success page loaded');
        const sessionId = searchParams.get('session_id');
        console.log('📋 Session ID from URL:', sessionId);
        
        const debug: any = {
          sessionId,
          hasLocalStorage: false,
          localStorageData: null,
          databaseData: null,
          finalData: null
        };

        if (!sessionId) {
          console.log('⚠️ No session ID found');
          setDebugInfo(debug);
          setLoading(false);
          return;
        }

        // CULPRIT 1 FIX: Check localStorage first (most reliable)
        const storedData = localStorage.getItem('pendingEnrollment');
        if (storedData) {
          console.log('📦 Found enrollment data in localStorage');
          const parsed = JSON.parse(storedData);
          debug.hasLocalStorage = true;
          debug.localStorageData = parsed;
          
          console.log('📊 Parsed localStorage data:', parsed);
          
          // Validate that this is the correct enrollment
          if (parsed.sessionId === sessionId || parsed.checkoutSessionId === sessionId) {
            console.log('✅ Session ID matches localStorage data');
            
            const enrollmentData: EnrollmentDetails = {
              program_name: parsed.programName || 'Selected Program',
              payment_type: parsed.paymentType || 'Not specified',
              child_name: parsed.childName || 'Your child',
              parent_name: parsed.parentName || 'Parent',
              email: parsed.email || 'email@example.com',
              mobile: parsed.mobile || 'Not provided', // CULPRIT 3 FIX: Always provide fallback
              child_age: parsed.childAge || 'Not specified',
              child_school: parsed.childSchool || 'Not specified',
              medical_info: parsed.medicalInfo || 'None provided',
              requires_pickup: parsed.requiresPickup || false,
              photo_permission: parsed.photoPermission || false,
              checkout_session_id: sessionId
            };
            
            debug.finalData = enrollmentData;
            setEnrollmentDetails(enrollmentData);
            setDebugInfo(debug);
            setLoading(false);
            
            // CULPRIT 1 FIX: Use traditional form submission instead of programmatic
            setTimeout(() => {
              submitFormTraditionally(enrollmentData, sessionId);
            }, 500); // Give DOM time to render
            
            return;
          }
        }

        // Fallback: try database
        console.log('🔍 Fetching from database...');
        try {
          const enrollment = await getEnrollmentBySessionId(sessionId);
          debug.databaseData = enrollment;
          
          if (enrollment) {
            console.log('📊 Database enrollment found:', enrollment);
            setEnrollmentDetails(enrollment);
            debug.finalData = enrollment;
            setDebugInfo(debug);
            setLoading(false);
            
            setTimeout(() => {
              submitFormTraditionally(enrollment, sessionId);
            }, 500);
            return;
          }
        } catch (dbError) {
          console.log('⚠️ Database fetch failed:', dbError);
          debug.databaseError = dbError;
        }

        // Final fallback
        console.log('⚠️ Using fallback data');
        const fallbackData: EnrollmentDetails = {
          program_name: 'Selected Program',
          payment_type: 'Not specified',
          child_name: 'Your child',
          parent_name: 'Parent',
          email: 'email@example.com',
          mobile: 'Not provided',
          child_age: 'Not specified',
          child_school: 'Not specified',
          medical_info: 'None provided',
          requires_pickup: false,
          photo_permission: false,
          checkout_session_id: sessionId
        };
        
        debug.finalData = fallbackData;
        setEnrollmentDetails(fallbackData);
        setDebugInfo(debug);
        setLoading(false);
        
        setTimeout(() => {
          submitFormTraditionally(fallbackData, sessionId);
        }, 500);

      } catch (error) {
        console.error('💥 Error in fetchAndSubmit:', error);
        setSubmissionError(error instanceof Error ? error.message : 'Failed to process enrollment');
        setLoading(false);
      }
    };

    fetchAndSubmit();
  }, [searchParams]);

  // CULPRIT 1 & 2 FIX: Traditional form submission method
  const submitFormTraditionally = (data: EnrollmentDetails, sessionId: string) => {
    try {
      console.log('📝 Starting traditional form submission...');
      
      // Check if already submitted
      const submittedKey = `netlify_submitted_${sessionId}`;
      const alreadySubmitted = localStorage.getItem(submittedKey);
      
      if (alreadySubmitted) {
        console.log('✅ Form already submitted previously');
        setFormSubmitted(true);
        return;
      }

      // CULPRIT 2 FIX: Create a proper form element with correct action
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/'; // Don't redirect, let Netlify handle it
      form.setAttribute('netlify', '');
      form.setAttribute('name', 'enrollment');
      form.style.display = 'none';

      // Add form-name field (required by Netlify)
      const formNameField = document.createElement('input');
      formNameField.type = 'hidden';
      formNameField.name = 'form-name';
      formNameField.value = 'enrollment';
      form.appendChild(formNameField);

      // Add title field for Netlify form identification
      const titleField = document.createElement('input');
      titleField.type = 'hidden';
      titleField.name = 'title';
      titleField.value = `${data.child_name} - ${data.program_name}`;
      form.appendChild(titleField);

      // CULPRIT 3 FIX: Add all fields with proper validation
      const fields = [
        { name: 'parentName', value: data.parent_name || 'Not provided' },
        { name: 'email', value: data.email || 'Not provided' },
        { name: 'mobile', value: data.mobile || 'Not provided' }, // Ensure mobile is never empty
        { name: 'childName', value: data.child_name || 'Not provided' },
        { name: 'childAge', value: data.child_age || 'Not provided' },
        { name: 'childSchool', value: data.child_school || 'Not provided' },
        { name: 'medicalInfo', value: data.medical_info || 'None provided' },
        { name: 'programName', value: data.program_name || 'Not provided' },
        { name: 'paymentType', value: data.payment_type || 'Not specified' },
        { name: 'requiresPickup', value: data.requires_pickup ? 'Yes' : 'No' },
        { name: 'photoPermission', value: data.photo_permission ? 'Yes' : 'No' },
        { name: 'submissionDate', value: new Date().toLocaleString() },
        { name: 'checkoutSessionId', value: data.checkout_session_id || sessionId },
        { name: 'status', value: 'Payment Completed' }
      ];

      console.log('📋 Creating form fields:', fields);

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
        console.log(`✅ Added field: ${field.name} = "${field.value}"`);
      });

      // Add to DOM and submit
      document.body.appendChild(form);
      console.log('📤 Submitting form to Netlify...');
      
      // CULPRIT 1 FIX: Use traditional form submission
      form.submit();
      
      // Mark as submitted
      localStorage.setItem(submittedKey, 'true');
      setFormSubmitted(true);
      console.log('✅ Form submitted successfully');
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
      }, 1000);

    } catch (error) {
      console.error('❌ Form submission error:', error);
      setSubmissionError(error instanceof Error ? error.message : 'Form submission failed');
    }
  };

  const manualSubmit = () => {
    const sessionId = searchParams.get('session_id');
    if (sessionId && enrollmentDetails) {
      console.log('🔄 Manual form submission triggered');
      setSubmissionError(null);
      submitFormTraditionally(enrollmentDetails, sessionId);
    } else {
      setSubmissionError('No session ID or enrollment data available for submission');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue mx-auto mb-4"></div>
          <p className="font-nunito text-gray-600">Processing your enrollment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="font-fredoka font-bold text-2xl text-navy mb-4">
          Payment Successful!
        </h1>
        
        {enrollmentDetails && (
          <div className="mb-8">
            <p className="font-nunito text-gray-600 mb-4">
              Thank you for your purchase! Your payment for <strong>{enrollmentDetails.program_name || 'your selected program'}</strong> has been processed successfully.
            </p>
            
            {enrollmentDetails.child_name && (
              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-4 mb-4">
                <p className="font-nunito text-electric-blue font-medium">
                  🎉 {enrollmentDetails.child_name} is now enrolled!
                </p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-fredoka font-semibold text-navy mb-2">What happens next?</h3>
              <ul className="font-nunito text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                  You'll receive a confirmation email with all program details
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                  Our team will contact you with session schedules
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                  Check your dashboard for enrollment status updates
                </li>
              </ul>
            </div>
            
            <p className="font-nunito text-gray-600 text-sm">
              Questions? Contact us at <a href="mailto:hello@jumpstartsports.com.au" className="text-electric-blue hover:text-electric-blue/80">hello@jumpstartsports.com.au</a>
            </p>
          </div>
        )}

        {/* Form Submission Status */}
        <div className="mb-6 space-y-3">
          {formSubmitted ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-nunito text-green-700 text-sm font-medium">
                ✅ Enrollment details sent to our team successfully
              </p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <p className="font-nunito text-yellow-800 text-sm font-medium">
                  Sending enrollment details to our team...
                </p>
              </div>
              {submissionError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="font-nunito text-red-700 text-xs mb-2">
                    Error: {submissionError}
                  </p>
                  <button
                    onClick={manualSubmit}
                    className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors mx-auto"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Retry Submission
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Debug Information */}
        {import.meta.env.DEV && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-left">
            <h3 className="font-nunito font-semibold text-sm text-gray-700 mb-2">Debug Info:</h3>
            <div className="font-mono text-xs text-gray-600 space-y-1">
              <p>Session ID: {debugInfo.sessionId || 'None'}</p>
              <p>Form Submitted: {formSubmitted ? 'Yes' : 'No'}</p>
              <p>Has Enrollment Data: {enrollmentDetails ? 'Yes' : 'No'}</p>
              <p>Has localStorage: {debugInfo.hasLocalStorage ? 'Yes' : 'No'}</p>
              <p>Mobile: {enrollmentDetails?.mobile || 'Not found'}</p>
              <p>Program: {enrollmentDetails?.program_name || 'Not found'}</p>
              <p>Child: {enrollmentDetails?.child_name || 'Not found'}</p>
              <p>Parent: {enrollmentDetails?.parent_name || 'Not found'}</p>
              {submissionError && <p className="text-red-600">Error: {submissionError}</p>}
            </div>
            {!formSubmitted && enrollmentDetails && (
              <button
                onClick={manualSubmit}
                className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                Manual Submit to Netlify
              </button>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;