import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Droplet, 
  Gauge, 
  Thermometer, 
  Droplets, 
  Bell, 
  LineChart, 
  BarChart, 
  Share2, 
  CloudRain 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-water-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6 text-water-800">Our Features</h1>
            <p className="text-xl max-w-3xl mx-auto">
              ClearWater Watch provides comprehensive water quality monitoring with a range of powerful features
            </p>
          </div>
        </section>
        
        {/* Key Monitoring Parameters */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Monitoring Parameters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Droplet className="h-6 w-6 text-water-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">pH Monitoring</h3>
                  <p className="text-gray-600">
                    Our system continuously monitors pH levels, measuring the acidity or alkalinity of water. 
                    The ideal pH range for most water systems is between 6.5 and 8.5. Our sensors provide highly 
                    accurate readings with precision up to ±0.1 pH units.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Gauge className="h-6 w-6 text-water-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">TDS Measurement</h3>
                  <p className="text-gray-600">
                    Total Dissolved Solids (TDS) represents the total concentration of dissolved substances in water. 
                    Our sensors measure TDS in parts per million (ppm), helping to assess water purity and identify 
                    potential contaminants.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Thermometer className="h-6 w-6 text-water-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Temperature Tracking</h3>
                  <p className="text-gray-600">
                    Water temperature affects dissolved oxygen levels, aquatic life, and chemical processes. 
                    Our system provides accurate temperature readings in real-time, helping to maintain 
                    optimal conditions for your water environment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-water-100 p-3 rounded-full">
                  <Droplets className="h-6 w-6 text-water-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Overall Quality Assessment</h3>
                  <p className="text-gray-600">
                    Our system uses advanced algorithms to evaluate overall water quality based on all measured 
                    parameters. The assessment provides a quick overview of water condition, from "Excellent" to 
                    "Poor," making it easy to understand water quality at a glance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Dashboard Features */}
        <section className="py-16 bg-water-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Dashboard Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-water-100 p-3 rounded-full">
                    <LineChart className="h-6 w-6 text-water-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Historical Data Trends</h3>
                <p className="text-gray-600 text-center">
                  View historical data over various time periods to identify trends and patterns 
                  in your water quality parameters.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-water-100 p-3 rounded-full">
                    <Bell className="h-6 w-6 text-water-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Real-time Alerts</h3>
                <p className="text-gray-600 text-center">
                  Receive instant notifications when water quality parameters exceed defined thresholds, 
                  allowing for immediate action.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-water-100 p-3 rounded-full">
                    <BarChart className="h-6 w-6 text-water-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Data Visualization</h3>
                <p className="text-gray-600 text-center">
                  Interactive charts and graphs provide clear visual representations of your water quality data, 
                  making analysis easier.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-water-100 p-3 rounded-full">
                    <Share2 className="h-6 w-6 text-water-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Data Export</h3>
                <p className="text-gray-600 text-center">
                  Export your water quality data in various formats for external analysis, reporting, 
                  or sharing with stakeholders.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-water-100 p-3 rounded-full">
                    <CloudRain className="h-6 w-6 text-water-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Weather Integration</h3>
                <p className="text-gray-600 text-center">
                  Correlate water quality with local weather conditions to better understand environmental impacts 
                  on your water source.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="bg-water-100 p-3 rounded-full">
                    <Droplet className="h-6 w-6 text-water-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Recommendations</h3>
                <p className="text-gray-600 text-center">
                  Receive actionable recommendations based on your water quality data to help you maintain 
                  optimal conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-water-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start monitoring your water quality today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join ClearWater Watch and gain access to all these powerful features
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
