import React from 'react';
import Navbar from '../components/Navbar';
import ProfileForm from '../components/ProfileForm';
import PasswordUpdateForm from '../components/PasswordUpdateForm';
import AuthWrapper from '../components/AuthWrapper';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative h-[30vh] min-h-[250px] flex items-end justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img
            src="https://8oo57dacv4.ufs.sh/f/71xRIOSybaYnmdNJe7FvCGxr36QdWe2UqpMoNRzhYFIk9nEA"
            alt="Profile settings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-navy/70"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-white mb-4">
            Profile Settings
          </h1>
          <p className="font-nunito text-lg text-white/90">
            Manage your personal information and security settings
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <AuthWrapper requiredForAction="access profile settings">
            <div className="space-y-8">
              <ProfileForm />
              <PasswordUpdateForm />
            </div>
          </AuthWrapper>
        </div>
      </section>
    </div>
  );
};

export default Profile;
