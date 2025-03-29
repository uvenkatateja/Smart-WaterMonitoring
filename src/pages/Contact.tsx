
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-water-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6 text-water-800">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions about ClearWater Watch? We're here to help!
            </p>
          </div>
        </section>
        
        {/* Contact Form and Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message here..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-water-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-water-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-600 mb-1">General Inquiries:</p>
                      <a href="mailto:info@clearwaterwatch.com" className="text-water-600 hover:underline">info@clearwaterwatch.com</a>
                      <p className="text-gray-600 mt-2 mb-1">Support:</p>
                      <a href="mailto:support@clearwaterwatch.com" className="text-water-600 hover:underline">support@clearwaterwatch.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-water-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-water-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600 mb-1">Main Office:</p>
                      <a href="tel:+12345678901" className="text-water-600 hover:underline">+1 (234) 567-8901</a>
                      <p className="text-gray-600 mt-2 mb-1">Customer Support:</p>
                      <a href="tel:+12345678902" className="text-water-600 hover:underline">+1 (234) 567-8902</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-water-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-water-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Office Location</h3>
                      <p className="text-gray-600">
                        123 Water Street<br />
                        Ocean City, CA 90210<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section (Placeholder) */}
        <section className="bg-gray-100">
          <div className="h-96 bg-gray-300 w-full">
            {/* This would be replaced with an actual map integration */}
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-600">Map integration would go here</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
