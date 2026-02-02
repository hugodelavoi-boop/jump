import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Button from './Button';
import { Mail, Lock, User, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { testSupabaseConnection } from '../lib/supabaseTest';

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredForAction?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, requiredForAction = "continue" }) => {
  const { session, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionWarning, setConnectionWarning] = useState<string | null>(null);

  useEffect(() => {
    // Test connection when component mounts
    const checkConnection = async () => {
      const result = await testSupabaseConnection();
      if (!result.success) {
        setConnectionWarning('Unable to connect to the authentication server. Please check your internet connection.');
      }
    };
    checkConnection();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          console.error('Login error:', error);
          throw error;
        }

        if (!data?.session) {
          throw new Error('Login succeeded but no session was created. Please try again.');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          console.error('Signup error:', error);
          throw error;
        }

        if (data?.user && !data?.session) {
          setError('Account created! Please check your email to confirm your account before signing in.');
          setIsLogin(true);
          return;
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      let errorMessage = 'An error occurred. Please try again.';

      if (err instanceof Error) {
        errorMessage = err.message;

        if (err.message.toLowerCase().includes('fetch') ||
            err.message.toLowerCase().includes('network')) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection and try refreshing the page.';
        } else if (err.message.toLowerCase().includes('invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (err.message.toLowerCase().includes('email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account before signing in.';
        } else if (err.message.toLowerCase().includes('user already registered')) {
          errorMessage = 'This email is already registered. Please sign in instead.';
          setIsLogin(true);
        } else if (err.message.toLowerCase().includes('rate limit')) {
          errorMessage = 'Too many attempts. Please wait a few minutes and try again.';
        }
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    );
  }

  if (session) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-electric-blue" />
        </div>
        <h2 className="font-fredoka font-bold text-2xl text-navy mb-2">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="font-nunito text-gray-600">
          Please {isLogin ? 'sign in' : 'create an account'} to {requiredForAction}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {connectionWarning && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="font-nunito text-yellow-800 text-sm">{connectionWarning}</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-nunito text-red-700 text-sm whitespace-pre-line">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block font-nunito font-medium text-navy mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block font-nunito font-medium text-navy mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
              placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block font-nunito font-medium text-navy mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        )}

        <Button
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
            setFormData({ email: '', password: '', confirmPassword: '' });
          }}
          className="font-nunito text-electric-blue hover:text-electric-blue/80 transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthWrapper;