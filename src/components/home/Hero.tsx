import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block">Streamline Your</span>
              <span className="block text-blue-600">Team's Workflow</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Work Planner helps you manage projects, assign tasks, and track progress 
              all in one place. Boost your team's productivity and achieve your goals together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" variant="primary">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-blue-100 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="h-4 w-3/4 bg-blue-100 rounded-full"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-3">
                    <div className="col-span-1 h-6 bg-blue-50 rounded-md"></div>
                    <div className="col-span-4 h-6 bg-blue-50 rounded-md"></div>
                    <div className="col-span-1 h-6 bg-green-100 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-6 gap-3">
                    <div className="col-span-1 h-6 bg-blue-50 rounded-md"></div>
                    <div className="col-span-4 h-6 bg-blue-50 rounded-md"></div>
                    <div className="col-span-1 h-6 bg-yellow-100 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-6 gap-3">
                    <div className="col-span-1 h-6 bg-blue-50 rounded-md"></div>
                    <div className="col-span-4 h-6 bg-blue-50 rounded-md"></div>
                    <div className="col-span-1 h-6 bg-red-100 rounded-md"></div>
                  </div>
                </div>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="w-3/4 h-4 bg-blue-100 rounded-full"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-blue-50 rounded-lg"></div>
                  <div className="h-24 bg-blue-100 rounded-lg"></div>
                  <div className="h-24 bg-blue-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract shapes */}
      <div className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20">
        <div className="w-80 h-80 rounded-full bg-yellow-100 bg-opacity-30"></div>
      </div>
      <div className="hidden sm:block absolute bottom-0 left-0 -mb-20 -ml-20">
        <div className="w-60 h-60 rounded-full bg-blue-100 bg-opacity-30"></div>
      </div>
    </div>
  );
};

export default Hero;