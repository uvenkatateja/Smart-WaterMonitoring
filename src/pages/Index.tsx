import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplet, Gauge, Thermometer, Droplets, Activity, BarChart3, Mail, Phone, MapPin, ArrowRight, Check, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/auth-context';
import WaterAnimation from '@/components/WaterAnimation';

const Index = () => {
  const { currentUser } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <WaterAnimation 
              type="wave" 
              color="#0284c7" 
              height="100%" 
              width="200%" 
              duration={20}
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight">
              Smart Water Quality <span className="text-water-600">Monitor</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Real-time water quality monitoring system for a cleaner and healthier environment
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              {currentUser ? (
                <Button size="lg" className="bg-water-600 hover:bg-water-700 relative overflow-hidden group" asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <span className="relative z-10">View Dashboard</span> <ChevronRight size={16} className="relative z-10" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                      <div className="absolute inset-0">
                        <WaterAnimation 
                          type="wave" 
                          color="#ffffff" 
                          height="100%" 
                          width="100%" 
                          duration={1.5}
                        />
                      </div>
                    </div>
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="bg-water-600 hover:bg-water-700" asChild>
                    <Link to="/signup" className="flex items-center gap-2">
                      Get Started <ChevronRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-water-600 text-water-600" asChild>
                    <Link to="/login">Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-water-800">About Us</h2>
              <div className="w-20 h-1 bg-water-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 mb-8">
                At Smart Water Quality Monitor, we're dedicated to revolutionizing water quality management through innovative technology and real-time monitoring solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`transform transition-all duration-1000 ${scrollY > 300 ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <div className="relative rounded-xl overflow-hidden h-80 shadow-xl">
                  <div className="absolute inset-0">
                    <WaterAnimation 
                      type="wave" 
                      color="#bae6fd" 
                      height="100%" 
                      width="100%" 
                      duration={10}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8 bg-water-700/30">
                    <Droplets className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
              
              <div className={`transform transition-all duration-1000 ${scrollY > 300 ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <h3 className="text-2xl font-bold mb-4 text-water-700">Our Mission</h3>
                <p className="text-gray-700 mb-4">
                  We strive to provide accessible and reliable water quality monitoring solutions that empower communities, industries, and individuals to make informed decisions about their water resources.
                </p>
                <p className="text-gray-700 mb-6">
                  Our team of engineers and water quality experts has developed cutting-edge sensors and analytics that deliver accurate, real-time data about critical water parameters.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-water-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Advanced sensor technology for precise measurements</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-water-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Real-time data transmission and analysis</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-water-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Intuitive dashboard for easy water quality management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-water-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-water-800">Key Features</h2>
            <div className="w-20 h-1 bg-water-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive water quality monitoring system provides powerful features to help you maintain optimal water conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-700 transform hover:-translate-y-2 ${scrollY > 700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '0ms'}}>
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-4 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50">
                    <WaterAnimation type="ripple" height="100%" color="#38bdf8" />
                  </div>
                  <Droplet className="relative z-10 h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-water-700 text-center">pH Monitoring</h3>
              <p className="text-gray-600 text-center">Real-time pH level monitoring for water quality assessment with alerts for abnormal levels</p>
            </div>
            
            <div className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-700 transform hover:-translate-y-2 ${scrollY > 700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-4 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50">
                    <WaterAnimation type="wave" height="100%" color="#38bdf8" duration={2} />
                  </div>
                  <Gauge className="relative z-10 h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-water-700 text-center">TDS Analysis</h3>
              <p className="text-gray-600 text-center">Total Dissolved Solids measurement for water purity with detailed trend analysis</p>
            </div>
            
            <div className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-700 transform hover:-translate-y-2 ${scrollY > 700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-4 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50">
                    <WaterAnimation type="fill" height="100%" color="#38bdf8" duration={3} />
                  </div>
                  <Thermometer className="relative z-10 h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-water-700 text-center">Temperature Tracking</h3>
              <p className="text-gray-600 text-center">Continuous water temperature monitoring with historical data visualization</p>
            </div>
            
            <div className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-700 transform hover:-translate-y-2 ${scrollY > 700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <div className="flex justify-center mb-4">
                <div className="bg-water-100 p-4 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50">
                    <WaterAnimation type="wave" height="100%" color="#38bdf8" duration={1.5} />
                  </div>
                  <Activity className="relative z-10 h-8 w-8 text-water-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-water-700 text-center">Quality Assessment</h3>
              <p className="text-gray-600 text-center">Comprehensive water quality evaluation with actionable recommendations</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-water-800">How It Works</h2>
            <div className="w-20 h-1 bg-water-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our system works seamlessly to provide you with accurate and timely water quality data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`bg-white p-8 rounded-xl shadow-lg border border-water-100 relative transition-all duration-700 ${scrollY > 1200 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '0ms'}}>
              <div className="w-14 h-14 bg-water-500 text-white rounded-full flex items-center justify-center text-2xl font-bold absolute -top-7 left-1/2 transform -translate-x-1/2 shadow-lg">1</div>
              <div className="pt-6">
                <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <WaterAnimation type="ripple" color="#38bdf8" height="100%" width="100%" />
                  </div>
                  <Droplets className="relative z-10 h-8 w-8 text-water-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-water-700">Sensor Measurement</h3>
                <p className="text-gray-600 text-center">Our sensors continuously measure pH, TDS, and temperature in your water source with high precision</p>
              </div>
            </div>
            
            <div className={`bg-white p-8 rounded-xl shadow-lg border border-water-100 relative transition-all duration-700 ${scrollY > 1200 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-14 h-14 bg-water-500 text-white rounded-full flex items-center justify-center text-2xl font-bold absolute -top-7 left-1/2 transform -translate-x-1/2 shadow-lg">2</div>
              <div className="pt-6">
                <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <WaterAnimation type="wave" color="#38bdf8" height="100%" width="100%" />
                  </div>
                  <Activity className="relative z-10 h-8 w-8 text-water-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-water-700">Data Transmission</h3>
                <p className="text-gray-600 text-center">The collected data is transmitted to our secure cloud database in real-time through encrypted channels</p>
              </div>
            </div>
            
            <div className={`bg-white p-8 rounded-xl shadow-lg border border-water-100 relative transition-all duration-700 ${scrollY > 1200 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-14 h-14 bg-water-500 text-white rounded-full flex items-center justify-center text-2xl font-bold absolute -top-7 left-1/2 transform -translate-x-1/2 shadow-lg">3</div>
              <div className="pt-6">
                <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <WaterAnimation type="fill" color="#38bdf8" height="100%" width="100%" />
                  </div>
                  <BarChart3 className="relative z-10 h-8 w-8 text-water-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-water-700">Analysis & Reporting</h3>
                <p className="text-gray-600 text-center">Access your data through our intuitive dashboard with detailed analysis and proactive alerts</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-water-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-water-800">Contact Us</h2>
            <div className="w-20 h-1 bg-water-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our water quality monitoring solutions? Get in touch with our team.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-700 ${scrollY > 1700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '0ms'}}>
              <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-water-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-water-700">Email Us</h3>
              <p className="text-gray-600 mb-4">We'll respond to your inquiry within 24 hours</p>
              <a href="mailto:info@smartwatermonitor.com" className="text-water-600 font-medium hover:text-water-700">info@smartwatermonitor.com</a>
            </div>
            
            <div className={`bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-700 ${scrollY > 1700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-water-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-water-700">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our water quality experts</p>
              <a href="tel:+18005551234" className="text-water-600 font-medium hover:text-water-700">+1 (800) 555-1234</a>
            </div>
            
            <div className={`bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-700 ${scrollY > 1700 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-water-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-water-700">Visit Us</h3>
              <p className="text-gray-600 mb-4">Schedule a visit to our demonstration facility</p>
              <address className="text-water-600 font-medium not-italic">
                123 Water Tech Plaza<br/>
                San Francisco, CA 94105
              </address>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-water-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <WaterAnimation type="wave" color="#ffffff" height="100%" width="100%" duration={15} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to monitor your water quality?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join Smart Water Quality Monitor today and gain insights into your water quality parameters
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-water-600 hover:bg-gray-100" asChild>
              <Link to="/signup" className="flex items-center gap-2">
                Get Started <ArrowRight size={16} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Animation keyframes */}
      <style>{`
        @keyframes water-surface {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fast-water {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes water-surface-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(5); opacity: 0; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes circuit-flow {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        @keyframes circuit-flow-reverse {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes circuit-flow-horizontal {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }
        @keyframes circuit-flow-horizontal-reverse {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-50px); opacity: 0; }
        }
        @keyframes circuit-flow-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        @keyframes circuit-flow-up-reverse {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        .animate-water-surface {
          animation: water-surface 15s linear infinite;
        }
        .animate-fast-water {
          animation: fast-water 4s linear infinite;
        }
        .animate-water-surface-reverse {
          animation: water-surface-reverse 20s linear infinite;
        }
        .animate-ripple {
          animation: ripple 3s infinite ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-circuit-flow {
          animation: circuit-flow 2s infinite linear;
        }
        .animate-circuit-flow-reverse {
          animation: circuit-flow-reverse 2s infinite linear;
        }
        .animate-circuit-flow-horizontal {
          animation: circuit-flow-horizontal 2s infinite linear;
        }
        .animate-circuit-flow-horizontal-reverse {
          animation: circuit-flow-horizontal-reverse 2s infinite linear;
        }
        .animate-circuit-flow-up {
          animation: circuit-flow-up 3s infinite linear;
        }
        .animate-circuit-flow-up-reverse {
          animation: circuit-flow-up-reverse 2s infinite linear;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
      
      <Footer />
    </div>
  );
};

export default Index;
