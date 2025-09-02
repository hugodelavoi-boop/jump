import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { User, Calendar, CreditCard, FileText, Mail, Phone } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

interface UserEnrollment {
  id: number;
  child_name: string;
  program_name: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { session, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<UserEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      fetchEnrollments();
    }
  }, [session]);

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from('user_enrollments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-electric-blue" />
              </div>
              <div>
                <h1 className="font-fredoka font-bold text-3xl text-navy">
                  Welcome Back!
                </h1>
                <p className="font-nunito text-gray-600">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollments Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enrollments List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-fredoka font-bold text-2xl text-navy">
                    Your Enrollments
                  </h2>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/enrol')}
                  >
                    New Enrollment
                  </Button>
                </div>

                {enrollments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-fredoka font-semibold text-xl text-gray-600 mb-2">
                      No Enrollments Yet
                    </h3>
                    <p className="font-nunito text-gray-500 mb-6">
                      Get started by enrolling your child in one of our programs.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/enrol')}
                    >
                      Enroll Now
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrollments.map((enrollment) => (
                      <div 
                        key={enrollment.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-fredoka font-semibold text-lg text-navy mb-1">
                              {enrollment.child_name}
                            </h3>
                            <p className="font-nunito text-gray-600 mb-2">
                              {enrollment.program_name}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(enrollment.created_at).toLocaleDateString()}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                enrollment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : enrollment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {enrollment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-fredoka font-semibold text-lg text-navy mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/enrol')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-electric-blue/5 hover:bg-electric-blue/10 transition-colors text-left"
                  >
                    <FileText className="w-5 h-5 text-electric-blue" />
                    <span className="font-nunito text-navy">New Enrollment</span>
                  </button>
                  <button
                    onClick={() => navigate('/programs')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="font-nunito text-navy">View Programs</span>
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="font-nunito text-navy">Contact Support</span>
                  </button>
                </div>
              </div>

              <div className="bg-electric-blue rounded-2xl shadow-lg p-6 text-white">
                <h3 className="font-fredoka font-semibold text-lg mb-4">
                  Need Help?
                </h3>
                <p className="font-nunito text-white/90 mb-4 text-sm">
                  Our team is here to help with any questions about programs, enrollment, or your account.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>0478 163 609</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>hello@jumpstartsports.com.au</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;