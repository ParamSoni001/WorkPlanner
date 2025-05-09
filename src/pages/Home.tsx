import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Users, FolderKanban } from 'lucide-react';
import Hero from '../components/home/Hero';
import FeatureCard from '../components/home/FeatureCard';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Everything you need to manage your team's work
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Work Planner provides powerful tools for project management, 
                task assignment, and team collaboration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Task Management"
                description="Create, assign, and track tasks with deadlines, priorities, and real-time status updates."
                icon={ClipboardCheck}
                color="blue"
              />
              <FeatureCard
                title="Team Collaboration"
                description="Connect your team members, track their performance, and improve coordination."
                icon={Users}
                color="green"
              />
              <FeatureCard
                title="Project Organization"
                description="Group related tasks into projects, set milestones, and monitor overall progress."
                icon={FolderKanban}
                color="amber"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to boost your team's productivity?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of teams already using Work Planner to achieve their goals.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button size="lg" variant="accent">
                  Start for free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;