import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthWrapper from '../components/AuthWrapper';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative h-[30vh] min-h-[250px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img
            src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnmdNJe7FvCGxr36QdWe2UqpMoNRzhYFIk9nEA"
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-white mb-4">
            Welcome Back
          </h1>
          <p className="font-nunito text-lg text-white/90">
            Sign in to access your account and manage your enrollments
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-md">
          <AuthWrapper requiredForAction="continue">
            <div className="text-center py-8">
              <h2 className="font-fredoka font-bold text-2xl text-navy mb-2">
                Successfully Logged In
              </h2>
              <p className="font-nunito text-gray-600">
                Redirecting to your dashboard...
              </p>
            </div>
          </AuthWrapper>
        </div>
      </section>
    </div>
  );
};

export default Login;
