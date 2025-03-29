
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplet } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 bg-water-50">
        <div className="container mx-auto px-4 text-center">
          <Droplet className="h-16 w-16 text-water-600 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-water-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-water-700 mb-8">Page Not Found</h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Button size="lg" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
