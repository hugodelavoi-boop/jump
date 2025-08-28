import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { getEnrollmentBySessionId, createEnrollment } from '../lib/enrollment';
import { useAuth } from '../hooks/useAuth';

interface EnrollmentDetails {
  program_name: string;
  child_name: string;
}

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [enrollmentDetails, setEnrollmentDetails] = useState<EnrollmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        
        if (!sessionId) {
          // Show generic success if no session ID
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child'
          });
          return;
        }

        try {
          const enrollment = await getEnrollmentBySessionId(sessionId);
          setEnrollmentDetails({
            program_name: enrollment.program_name,
            child_name: enrollment.child_name
          });
        } catch (error) {
          console.error('Error fetching enrollment:', error);
          // Fallback to generic success message
          setEnrollmentDetails({
            program_name: 'Selected Program',
            child_name: 'Your child'
          });
        }
      } catch (error) {
        console.error('Error fetching enrollment details:', error);
        // Show generic success message even if database lookup fails
        setEnrollmentDetails({
          program_name: 'Selected Program',
          child_name: 'Your child'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [searchParams, session]);

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