import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Home, Calendar } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getProductByPriceId } from '../stripe-config';

export default function Success() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && user) {
      // In a real implementation, you might want to fetch order details
      // For now, we'll show a generic success message
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12 text-center">
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">
                Payment Successful!
              </h1>
              <p className="text-green-100 text-lg">
                Thank you for enrolling with Jump Start Sports
              </p>
            </div>

            <div className="px-8 py-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  What happens next?
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Confirmation Email</h3>
                      <p className="text-gray-600">You'll receive a confirmation email with all the program details shortly.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Program Information</h3>
                      <p className="text-gray-600">We'll send you detailed information about session times, locations, and what to bring.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Get Ready to Play!</h3>
                      <p className="text-gray-600">Your child is all set to join our fun and engaging sports sessions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Dashboard
                  </Link>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-blue-700 text-sm">
                  If you have any questions about your enrollment or our programs, 
                  please don't hesitate to contact us at{' '}
                  <a href="mailto:info@jumpstartsports.com.au" className="underline">
                    info@jumpstartsports.com.au
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}