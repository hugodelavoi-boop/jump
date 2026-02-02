import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch order details from Supabase
        const { data: orders, error } = await supabase
          .from('stripe_orders')
          .select('*')
          .eq('checkout_session_id', sessionId)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
        } else if (orders) {
          setOrderDetails(orders);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-green-50 px-6 py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for enrolling with Jump Start Sports
            </p>
          </div>

          <div className="px-6 py-8">
            {orderDetails && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-sm">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">
                      {orderDetails.currency.toUpperCase()} ${(orderDetails.amount_total / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold capitalize">
                      {orderDetails.payment_status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Confirmation Email</h3>
                  <p className="text-gray-600">
                    A confirmation email with program details has been sent to your email address.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">What's Next?</h3>
                  <p className="text-gray-600">
                    Our team will contact you within 24 hours with program start dates, 
                    location details, and any additional information you need.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                View Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/programs"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center"
              >
                Browse More Programs
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:support@jumpstartsports.com.au" className="text-blue-600 hover:underline">
              support@jumpstartsports.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}