import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Heart, Shield, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  const [showAuthForm, setShowAuthForm] = useState<'login' | 'register' | null>(null);
  const navigate = useNavigate();
  
  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Video className="h-8 w-8 text-primary-600" />
          <h1 className="ml-2 text-2xl font-bold text-gray-900">Blurry</h1>
        </div>
        
        <div>
          <Button
            variant="outline"
            className="mr-3"
            onClick={() => setShowAuthForm('login')}
          >
            Sign In
          </Button>
          
          <Button
            variant="primary"
            onClick={() => setShowAuthForm('register')}
          >
            Sign Up
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect Match Through Blurred Video Dates
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Connect with people based on personality, not just appearance. Our blurred video calls let you get to know someone before revealing your full appearance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowAuthForm('register')}
              >
                Get Started - It's Free
              </Button>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 md:pl-10">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <img
                  src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Video dating"
                  className="w-full h-auto"
                  style={{ filter: 'blur(8px)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold">Video Date in Progress</h3>
                    <p className="mt-2">Discover personality before appearance</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-primary-500 text-white p-3 rounded-full shadow-lg">
                <Heart size={24} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Blurry?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-neumorphic"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
                <Video className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Blurred Video Calls
              </h3>
              <p className="text-gray-600">
                Our unique blurred video technology lets you get to know someone's personality first. Gradually reduce the blur as you feel more comfortable.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-neumorphic"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="bg-secondary-100 p-4 rounded-full inline-block mb-4">
                <Heart className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Compatibility-Based Matching
              </h3>
              <p className="text-gray-600">
                Our smart algorithm matches you with people who share your interests and values, increasing your chances of finding meaningful connections.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-gray-50 p-6 rounded-xl shadow-neumorphic"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="bg-accent-100 p-4 rounded-full inline-block mb-4">
                <Shield className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Your safety is our priority. Our AI moderates all communications, and you can report any inappropriate behavior instantly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Create a Profile
              </h3>
              <p className="text-gray-600">
                Sign up and tell us about your interests, preferences, and what you're looking for.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Get Matched
              </h3>
              <p className="text-gray-600">
                Our algorithm finds people who match your preferences and might be a good fit.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Have Blurred Video Dates
              </h3>
              <p className="text-gray-600">
                Connect through our blurred video call feature and get to know each other.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Reduce the Blur & Connect
              </h3>
              <p className="text-gray-600">
                As you become comfortable, reduce the blur and take your connection to the next level.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Sarah, 28</h4>
                  <p className="text-sm text-gray-600">New York, NY</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was tired of superficial dating apps. On Blurry, I connected with Michael based on our conversations, not just looks. We've been dating for 6 months now!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="David"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">David, 34</h4>
                  <p className="text-sm text-gray-600">Chicago, IL</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The blurred video feature is brilliant. It took the pressure off and let us focus on having great conversations. My match and I are now planning our third date!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Jennifer"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Jennifer, 31</h4>
                  <p className="text-sm text-gray-600">Los Angeles, CA</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was skeptical at first, but the games during the video call really helped break the ice. Two months later, we're officially a couple!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Meaningful Connections?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who are finding matches based on personality, not just appearance.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowAuthForm('register')}
          >
            Create Your Free Account
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Video className="h-6 w-6" />
                <h3 className="ml-2 text-xl font-bold">Blurry</h3>
              </div>
              <p className="text-gray-400">
                A new way to date based on personality first, appearance second.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Dating Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community Guidelines</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Blurry. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Auth Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAuthForm(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {showAuthForm === 'login' ? (
              <LoginForm 
                onSuccess={handleAuthSuccess}
                onRegisterClick={() => setShowAuthForm('register')}
              />
            ) : (
              <RegisterForm 
                onSuccess={handleAuthSuccess}
                onLoginClick={() => setShowAuthForm('login')}
              />
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;