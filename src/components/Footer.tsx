import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-water-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="h-6 w-6 text-water-300" />
              <span className="text-xl font-bold">Smart Water Quality Monitor</span>
            </div>
            <p className="text-water-200 mb-6">
              Advanced water quality monitoring solutions for a cleaner and healthier environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-water-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-water-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-water-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-water-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-water-200 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-water-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-water-200 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#about" className="text-water-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="text-water-200 hover:text-white transition-colors">Features</a></li>
              <li><Link to="/dashboard" className="text-water-200 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/contact" className="text-water-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-water-100">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-water-200 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-water-200 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-water-200 hover:text-white transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="text-water-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-water-200 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-water-100">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-water-300 mr-3 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@smartwatermonitor.com" className="text-water-200 hover:text-white transition-colors">info@smartwatermonitor.com</a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-water-300 mr-3 mt-0.5 flex-shrink-0" />
                <a href="tel:+18005551234" className="text-water-200 hover:text-white transition-colors">+1 (800) 555-1234</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-water-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-water-200">
                  123 Water Tech Plaza<br/>
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-water-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-water-300 text-sm">
            &copy; {currentYear} Smart Water Quality Monitor. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-water-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-water-300 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-water-300 hover:text-white text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
