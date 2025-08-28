import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import { getEnrollmentBySessionId } from '../lib/enrollment';

interface EnrollmentDetails {
  program_name: string;
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
  const [isRetrying, setIsRetrying] = useState(false);

  const submitToNetlify = async (enrollmentData: EnrollmentDetails) => {
    console.log('🚀 Starting Netlify form submission...');
    console.log('Enrollment data to submit:', enrollmentData);
    
    try {
      // Method 1: Try direct form submission to Netlify
      const formData = new FormData();
      formData.append('form-name', 'enrollment');
      
      // Add all enrollment fields
      formData.append('parentName', enrollmentData.parent_name || '');
      formData.append('email', enrollmentData.email || '');
      formData.append('mobile', enrollmentData.mobile || '');
      formData.append('childName', enrollmentData.child_name || '');
      formData.append('childAge', enrollmentData.child_age || '');
      formData.append('childSchool', enrollmentData.child_school || '');
      formData.append('medicalInfo', enrollmentData.medical_info || 'None provided');
      formData.append('programName', enrollmentData.program_name || 'Unknown Program');
      formData.append('requiresPickup', enrollmentData.requires_pickup ? 'Yes' : 'No');
      formData.append('photoPermission', enrollmentData.photo_permission ? 'Yes' : 'No');
      formData.append('submissionDate', new Date().toLocaleString());
      formData.append('checkoutSessionId', enrollmentData.checkout_session_id || '');
      formData.append('status', 'Payment Completed');

      console.log('📝 Form data prepared:');
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }

      // Submit to current domain root
      console.log('📤 Submitting to Netlify...');
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      });

      console.log('📨 Netlify response status:', response.status);
      console.log('📨 Netlify response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        console.log('✅ Netlify form submission successful!');
        return true;
      } else {
        const responseText = await response.text();
        console.error('❌ Netlify submission failed:', response.status, responseText);
        throw new Error(`Netlify submission failed: ${response.status}`);
      }
    } catch (error) {
      console.error('💥 Error submitting to Netlify:', error);
      
      // Method 2: Fallback - try submitting via fetch to forms endpoint
      try {
        console.log('🔄 Trying fallback method...');
        
        const fallbackData = {
          'form-name': 'enrollment',
          parentName: enrollmentData.parent_name || '',
          email: enrollmentData.email || '',
          mobile: enrollmentData.mobile || '',
          childName: enrollmentData.child_name || '',
          childAge: enrollmentData.child_age || '',
          childSchool: enrollmentData.child_school || '',
          medicalInfo: enrollmentData.medical_info || 'None provided',
          programName: enrollmentData.program_name || 'Unknown Program',
          requiresPickup: enrollmentData.requires_pickup ? 'Yes' : 'No',
          photoPermission: enrollmentData.photo_permission ? 'Yes' : 'No',
          submissionDate: new Date().toLocaleString(),
          checkoutSessionId: enrollmentData.checkout_session_id || '',
          status: 'Payment Completed'
        };

        const fallbackResponse = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(fallbackData).toString()
        });

        if (fallbackResponse.ok) {
          console.log('✅ Fallback submission successful!');
          return true;
        } else {
          console.error('❌ Fallback submission also failed:', fallbackResponse.status);
          throw new Error(`Both submission methods failed`);
        }
      } catch (fallbackError) {
        console.error('💥 Fallback method also failed:', fallbackError);
        throw error; // Throw original error
      }
    }
  };

  const retrySubmission = async () => {
    if (!enrollmentDetails) return;
    
    setIsRetrying(true);
    setSubmissionError(null);
    
    try {
      console.log('🔄 Manual retry initiated...');
      await submitToNetlify(enrollmentDetails);
      setFormSubmitted(true);
      console.log('✅ Manual retry successful');
    } catch (error) {
      console.error('❌ Manual retry failed:', error);
      setSubmissionError(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    const fetchAndSubmit = async () => {
      try {
        console.log('🎯 Success page loaded');
        const sessionId = searchParams.get('session_id');
        console.log('📋 Session ID from URL:', sessionId);
        
        if (!sessionId) {
          console.log('⚠️ No session ID found - showing generic success');
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child',
            parent_name: '',
            email: '',
            mobile: '',
            child_age: '',
            child_school: '',
            medical_info: '',
            requires_pickup: false,
            photo_permission: false,
            checkout_session_id: ''
          });
          setLoading(false);
          return;
        }

        // Check if we already submitted for this session
        const submittedKey = `netlify_submitted_${sessionId}`;
        const alreadySubmitted = localStorage.getItem(submittedKey);
        
        if (alreadySubmitted) {
          console.log('✅ Form already submitted for this session');
          setFormSubmitted(true);
        }

        console.log('🔍 Fetching enrollment details...');
        const enrollment = await getEnrollmentBySessionId(sessionId);
        console.log('📊 Enrollment details fetched:', enrollment);
        setEnrollmentDetails(enrollment);
        
        // Submit to Netlify if not already done
        if (!alreadySubmitted) {
          console.log('📤 Submitting to Netlify...');
          try {
            await submitToNetlify(enrollment);
            setFormSubmitted(true);
            localStorage.setItem(submittedKey, 'true');
            console.log('✅ Netlify submission completed successfully');
          } catch (netlifyError) {
            console.error('❌ Netlify submission failed:', netlifyError);
            setSubmissionError(netlifyError instanceof Error ? netlifyError.message : 'Failed to submit form');
          }
        }
      } catch (error) {
        console.error('💥 Error in fetchAndSubmit:', error);
        // Create fallback data
        setEnrollmentDetails({
          program_name: 'Selected Program',
          child_name: 'Your child',
          parent_name: '',
          email: '',
          mobile: '',
          child_age: '',
          child_school: '',
          medical_info: '',
          requires_pickup: false,
          photo_permission: false,
          checkout_session_id: searchParams.get('session_id') || ''
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAndSubmit();
  }, [searchParams]);

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
          <p className="font-nunito text-gray-600 mb-8">
            {enrollmentDetails.child_name} is now enrolled in {enrollmentDetails.program_name}. 
            You'll receive a confirmation email shortly with all the program details.
          </p>
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
                    onClick={retrySubmission}
                    disabled={isRetrying}
                    className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isRetrying ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      'Retry Submission'
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Debug Information */}
        {import.meta.env.DEV && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-left">
            <h3 className="font-nunito font-semibold text-sm text-gray-700 mb-2">Debug Info:</h3>
            <div className="font-mono text-xs text-gray-600 space-y-1">
              <p>Session ID: {searchParams.get('session_id') || 'None'}</p>
              <p>Form Submitted: {formSubmitted ? 'Yes' : 'No'}</p>
              <p>Has Enrollment Data: {enrollmentDetails ? 'Yes' : 'No'}</p>
              <p>Mobile: {enrollmentDetails?.mobile || 'Not found'}</p>
              <p>Program: {enrollmentDetails?.program_name || 'Not found'}</p>
              <p>Child: {enrollmentDetails?.child_name || 'Not found'}</p>
            </div>
            {!formSubmitted && enrollmentDetails && (
              <button
                onClick={retrySubmission}
                disabled={isRetrying}
                className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isRetrying ? 'Retrying...' : 'Manual Submit to Netlify'}
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