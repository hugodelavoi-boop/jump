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
          console.log('📤 Preparing form submission...');
          // We'll trigger the form submission after the component renders
          setTimeout(() => {
            const form = document.getElementById('netlify-enrollment-form') as HTMLFormElement;
            if (form) {
              console.log('📝 Submitting form to Netlify...');
              form.submit();
              localStorage.setItem(submittedKey, 'true');
              setFormSubmitted(true);
            }
          }, 1000);
        }
      } catch (error) {
        console.error('💥 Error in fetchAndSubmit:', error);
        setSubmissionError(error instanceof Error ? error.message : 'Failed to process enrollment');
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

  const manualSubmit = () => {
    const form = document.getElementById('netlify-enrollment-form') as HTMLFormElement;
    if (form && enrollmentDetails) {
      console.log('🔄 Manual form submission triggered');
      form.submit();
      setFormSubmitted(true);
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        localStorage.setItem(`netlify_submitted_${sessionId}`, 'true');
      }
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
                    onClick={manualSubmit}
                    className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Retry Submission
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

      {/* Hidden Netlify Form - This is the key fix */}
      {enrollmentDetails && (
        <form
          id="netlify-enrollment-form"
          name="enrollment"
          method="POST"
          action="/success"
          netlify
          style={{ display: 'none' }}
        >
          <input type="hidden" name="form-name" value="enrollment" />
          <input type="hidden" name="parentName" value={enrollmentDetails.parent_name} />
          <input type="hidden" name="email" value={enrollmentDetails.email} />
          <input type="hidden" name="mobile" value={enrollmentDetails.mobile} />
          <input type="hidden" name="childName" value={enrollmentDetails.child_name} />
          <input type="hidden" name="childAge" value={enrollmentDetails.child_age} />
          <input type="hidden" name="childSchool" value={enrollmentDetails.child_school} />
          <input type="hidden" name="medicalInfo" value={enrollmentDetails.medical_info || 'None provided'} />
          <input type="hidden" name="programName" value={enrollmentDetails.program_name} />
          <input type="hidden" name="requiresPickup" value={enrollmentDetails.requires_pickup ? 'Yes' : 'No'} />
          <input type="hidden" name="photoPermission" value={enrollmentDetails.photo_permission ? 'Yes' : 'No'} />
          <input type="hidden" name="submissionDate" value={new Date().toLocaleString()} />
          <input type="hidden" name="checkoutSessionId" value={enrollmentDetails.checkout_session_id} />
          <input type="hidden" name="status" value="Payment Completed" />
        </form>
      )}
    </div>
  );
};

export default Success;