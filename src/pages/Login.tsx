import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/auth-context';

const Login = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser && !loading) {
      navigate('/dashboard');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-b from-water-50 to-water-100">
        <div className="w-full max-w-md px-4">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
