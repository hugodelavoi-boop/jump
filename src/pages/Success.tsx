import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    if (!sessionId) {
      navigate('/programs');
      return;
    }

    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your enrollment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-green-50 px-6 py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Enrollment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for enrolling with Jump Start Sports
            </p>
          </div>

          <div className="px-6 py-8">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  What happens next?
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">1</span>
                    <span>You'll receive a confirmation email with all the program details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">2</span>
                    <span>Our team will contact you with session times and venue information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">3</span>
                    <span>Your child can start enjoying our fun sports programs!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need help or have questions?
                </h3>
                <p className="text-gray-700 mb-3">
                  Our friendly team is here to help! Contact us at:
                </p>
                <div className="space-y-1 text-gray-700">
                  <p><strong>Email:</strong> info@jumpstartsports.com.au</p>
                  <p><strong>Phone:</strong> (08) 1234 5678</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                View My Enrollments
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Success;
