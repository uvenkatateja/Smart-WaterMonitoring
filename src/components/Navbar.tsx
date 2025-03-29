import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Droplet } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/language-context';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="bg-water-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-water-300" />
            <Link to="/" className="text-xl font-bold text-white">Smart Water Quality Monitor</Link>
          </div>
          
          {/* Main Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-water-100 hover:text-white transition-colors">Home</Link>
            <a href="#about" className="text-water-100 hover:text-white transition-colors">About Us</a>
            <a href="#features" className="text-water-100 hover:text-white transition-colors">Features</a>
            <a href="#contact" className="text-water-100 hover:text-white transition-colors">Contact</a>
          </div>
          
          {/* Authentication Links */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Button asChild variant="ghost" className="text-water-100 hover:text-white">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={logout} variant="secondary" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild variant="secondary" size="sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
          <li>
            <LanguageSelector variant="navbar" />
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
