
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Droplet } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-water-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6 text-water-800">About ClearWater Watch</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're dedicated to providing accurate, real-time water quality monitoring solutions 
              to ensure clean and safe water for all.
            </p>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg mb-4">
                  At ClearWater Watch, our mission is to empower individuals, communities, and organizations 
                  with accurate water quality data to make informed decisions about their water sources.
                </p>
                <p className="text-lg mb-4">
                  We believe that access to clean water is a fundamental right, and our monitoring systems 
                  help ensure water safety through continuous surveillance and early detection of potential issues.
                </p>
                <p className="text-lg">
                  By providing accessible, user-friendly technology, we aim to democratize water quality 
                  monitoring and contribute to global water conservation efforts.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-water-100 rounded-lg transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Clean Water" 
                    className="relative z-10 rounded-lg shadow-lg w-full max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach */}
        <section className="py-16 bg-water-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Droplet className="h-8 w-8 text-water-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Precision Monitoring</h3>
                <p className="text-gray-600 text-center">
                  Our sensors provide highly accurate measurements of key water quality parameters 
                  including pH, TDS, temperature, and overall condition assessment.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Droplet className="h-8 w-8 text-water-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Real-time Analysis</h3>
                <p className="text-gray-600 text-center">
                  Our platform processes and analyzes data in real-time, providing immediate insights 
                  and alerts when water quality parameters fall outside of optimal ranges.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-water-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Droplet className="h-8 w-8 text-water-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Actionable Insights</h3>
                <p className="text-gray-600 text-center">
                  Beyond just data, we provide practical recommendations and insights to help 
                  users take appropriate actions to maintain water quality.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section - Placeholder */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Our Team</h2>
            <p className="text-lg max-w-3xl mx-auto mb-12">
              Our team of water quality experts, engineers, and environmental scientists are passionate 
              about preserving water resources and providing the best monitoring solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team member cards would go here - using placeholders */}
              <div className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Dr. Jane Smith</h3>
                <p className="text-water-600 mb-2">Chief Water Scientist</p>
                <p className="text-gray-600 text-sm">
                  PhD in Environmental Engineering with 15 years of experience in water quality research.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Michael Johnson</h3>
                <p className="text-water-600 mb-2">IoT Systems Architect</p>
                <p className="text-gray-600 text-sm">
                  Expert in designing sensor networks and IoT solutions for environmental monitoring.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Dr. Lisa Chen</h3>
                <p className="text-water-600 mb-2">Data Analytics Lead</p>
                <p className="text-gray-600 text-sm">
                  Specializes in water quality data analysis and predictive modeling.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
