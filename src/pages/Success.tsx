import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Success() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && user) {
      // In a real implementation, you might fetch order details from your backend
      // For now, we'll show a generic success message
      setLoading(false);
    } else if (!sessionId) {
      setLoading(false);
    }
  }, [sessionId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Session</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find your payment session. Please try again.
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Programs
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-50 px-6 py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for enrolling with Jump Start Sports
            </p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What happens next?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Confirmation Email</h3>
                      <p className="text-gray-600">
                        You'll receive a confirmation email with all the program details and important information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-6 h-6 text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Program Start</h3>
                      <p className="text-gray-600">
                        We'll contact you before your program starts with specific details about timing and location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  If you have any questions, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    to="/programs"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Browse More Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Important Reminders
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Please ensure your child brings a water bottle and wears appropriate sports attire
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Arrive 5-10 minutes early for the first session to complete any final paperwork
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Contact us immediately if you need to make any changes to your enrollment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}