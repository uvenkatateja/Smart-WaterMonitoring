import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignupForm from '@/components/SignupForm';
import { useAuth } from '@/context/auth-context';

const Signup = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (currentUser || signupSuccess) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-b from-water-50 to-water-100">
        <div className="w-full max-w-md px-4">
          <SignupForm onSignupSuccess={handleSignupSuccess} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
