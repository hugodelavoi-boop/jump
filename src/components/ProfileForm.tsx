import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import { getUserProfile, updateUserProfile, validateMobile, formatMobile, UserProfile } from '../lib/profile';
import { useAuth } from '../contexts/AuthContext';

const ProfileForm: React.FC = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
  });

  useEffect(() => {
    if (session?.user) {
      loadProfile();
    }
  }, [session]);

  const loadProfile = async () => {
    if (!session?.user) return;

    try {
      setLoading(true);
      const data = await getUserProfile(session.user.id);
      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          mobile: data.mobile || '',
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    if (formData.mobile && !validateMobile(formData.mobile)) {
      setError('Please enter a valid Australian mobile number (04XX XXX XXX)');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const updates = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        mobile: formData.mobile.replace(/\s+/g, ''),
      };

      await updateUserProfile(session.user.id, updates);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-electric-blue" />
        <h2 className="font-fredoka font-bold text-2xl text-navy">Profile Information</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="font-nunito text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="font-nunito text-green-700">Profile updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 font-nunito font-medium text-navy mb-2">
            <Mail className="w-4 h-4 text-gray-400" />
            Email Address
          </label>
          <input
            type="email"
            value={profile?.email || ''}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-nunito font-medium text-navy mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block font-nunito font-medium text-navy mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 font-nunito font-medium text-navy mb-2">
            <Phone className="w-4 h-4 text-gray-400" />
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors"
            placeholder="04XX XXX XXX"
          />
          <p className="mt-1 text-xs text-gray-500">Australian mobile format: 04XX XXX XXX</p>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={saving}
            loading={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
