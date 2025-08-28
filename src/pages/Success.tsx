import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import { getEnrollmentBySessionId } from '../lib/enrollment';
import { useAuth } from '../hooks/useAuth';

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
  const { session } = useAuth();

  const submitToNetlify = async (enrollmentData: EnrollmentDetails, mobile: string = '') => {
    try {
      console.log('=== NETLIFY SUBMISSION START ===');
      console.log('Enrollment data:', enrollmentData);
      console.log('Mobile number:', mobile);
      
      // Create form data exactly as Netlify expects
      const formData = new FormData();
      formData.append('form-name', 'enrollment');
      
      // Add all form fields
      formData.append('parentName', enrollmentData.parent_name || '');
      formData.append('email', enrollmentData.email || '');
      formData.append('mobile', mobile);
      formData.append('mobile', mobile);
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

      console.log('Form data entries:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        body: formData
      });

      console.log('Netlify response status:', response.status);
      console.log('Netlify response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Netlify submission failed:', response.status, responseText);
        throw new Error(`Netlify submission failed: ${response.status} - ${responseText}`);
      }

      const responseText = await response.text();
      console.log('Netlify response body:', responseText);
      console.log('=== NETLIFY SUBMISSION SUCCESS ===');
      
      return true;
    } catch (error) {
      console.error('=== NETLIFY SUBMISSION ERROR ===');
      console.error('Error details:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        console.log('=== SUCCESS PAGE LOADED ===');
        const sessionId = searchParams.get('session_id');
        console.log('Stripe session ID from URL:', sessionId);
        
        if (!sessionId) {
          console.log('No session ID found in URL');
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child',
            parent_name: '',
            email: '',
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

        console.log('Fetching enrollment details for session:', sessionId);
        
        try {
          const enrollment = await getEnrollmentBySessionId(sessionId);
          console.log('Fetched enrollment details:', enrollment);
          setEnrollmentDetails(enrollment);
          
          // Submit to Netlify after successful payment
          if (!formSubmitted) {
            console.log('Attempting Netlify submission...');
            try {
              // Get mobile from form data stored in localStorage if available
              const storedFormData = localStorage.getItem('enrollmentFormData');
              let mobile = '';
              if (storedFormData) {
                const parsedData = JSON.parse(storedFormData);
                mobile = parsedData.mobile || '';
                console.log('Retrieved mobile from localStorage:', mobile);
              }
              
              await submitToNetlify(enrollment, mobile);
              setFormSubmitted(true);
              console.log('Form submitted to Netlify successfully');
              
              // Clear stored form data
              localStorage.removeItem('enrollmentFormData');
            } catch (netlifyError) {
              console.error('Failed to submit to Netlify:', netlifyError);
              setSubmissionError(netlifyError instanceof Error ? netlifyError.message : 'Failed to submit form');
            }
          }
        } catch (error) {
          console.error('Error fetching enrollment:', error);
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child',
            parent_name: '',
            email: '',
            child_age: '',
            child_school: '',
            medical_info: '',
            requires_pickup: false,
            photo_permission: false,
            checkout_session_id: sessionId
          });
        }
      } catch (error) {
        console.error('Error in fetchEnrollmentDetails:', error);
        setEnrollmentDetails({
          program_name: 'Selected Program',
          child_name: 'Your child',
          parent_name: '',
          email: '',
          child_age: '',
          child_school: '',
          medical_info: '',
          requires_pickup: false,
          photo_permission: false,
          checkout_session_id: ''
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [searchParams, formSubmitted]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="font-fredoka font-bold text-2xl text-navy mb-4">
          Enrollment Confirmed!
        </h1>
        
        {enrollmentDetails && (
          <p className="font-nunito text-gray-600 mb-8">
            {enrollmentDetails.child_name} is now enrolled in {enrollmentDetails.program_name}. 
            You'll receive a confirmation email shortly with all the program details.
          </p>
        )}

        {formSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-nunito text-green-700 text-sm">
              ✓ Enrollment details have been submitted to our team for processing
            </p>
          </div>
        )}

        {submissionError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-nunito text-yellow-800 text-sm font-medium mb-1">
                Form submission issue
              </p>
              <p className="font-nunito text-yellow-700 text-xs">
                Your payment was successful, but we had trouble sending the form to our team. 
                Please contact us at hello@jumpstartsports.com.au with your enrollment details.
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate('/programs')}
          >
            View All Programs
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