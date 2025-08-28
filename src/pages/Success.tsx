import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { getEnrollmentBySessionId } from '../lib/enrollment';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../contexts/ProductContext';

interface EnrollmentDetails {
  program_name: string;
  child_name: string;
  parent_name: string;
  email: string;
  child_age: string;
  child_school: string;
  medical_info: string;
  requires_pickup: boolean;
  photo_permission: boolean;
}

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [enrollmentDetails, setEnrollmentDetails] = useState<EnrollmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { session } = useAuth();
  const { products } = useProducts();

  const submitToNetlify = async (enrollmentData: any) => {
    try {
      console.log('Submitting to Netlify:', enrollmentData);
      
      const formData = new FormData();
      formData.append('form-name', 'enrollment');
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
      formData.append('submissionDate', new Date().toISOString());

      const response = await fetch('/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Netlify submission failed:', response.status, responseText);
        throw new Error(`Netlify submission failed: ${response.status}`);
      }

      console.log('Successfully submitted to Netlify');
      return true;
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        
        if (!sessionId) {
          // Show generic success if no session ID
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child',
            parent_name: '',
            email: '',
            child_age: '',
            child_school: '',
            medical_info: '',
            requires_pickup: false,
            photo_permission: false
          });
          return;
        }

        try {
          const enrollment = await getEnrollmentBySessionId(sessionId);
          console.log('Fetched enrollment details:', enrollment);
          setEnrollmentDetails(enrollment);
          
          // Submit to Netlify after successful payment  
          if (!formSubmitted) {
            try {
              await submitToNetlify(enrollment);
              
              setFormSubmitted(true);
              console.log('Form submitted to Netlify successfully');
            } catch (netlifyError) {
              console.error('Failed to submit to Netlify:', netlifyError);
              // Still show success to user since payment was successful
            }
          }
        } catch (error) {
          console.error('Error fetching enrollment:', error);
          // Fallback to generic success message
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child',
            parent_name: '',
            email: '',
            child_age: '',
            child_school: '',
            medical_info: '',
            requires_pickup: false,
            photo_permission: false
          });
        }
      } catch (error) {
        console.error('Error fetching enrollment details:', error);
        // Show generic success message even if database lookup fails
        setEnrollmentDetails({
          program_name: 'Selected Program',
          child_name: 'Your child',
          parent_name: '',
          email: '',
          child_age: '',
          child_school: '',
          medical_info: '',
          requires_pickup: false,
          photo_permission: false
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [searchParams, session, formSubmitted]);

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