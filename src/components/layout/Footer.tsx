import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-blue-600 font-bold text-xl">
              Work Planner
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Streamline your team's workflow with our intuitive task management platform. 
              Assign tasks, track progress, and achieve your goals together.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                &copy; {currentYear} Work Planner. All rights reserved.
              </p>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-base font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Tasks
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-base font-semibold text-gray-900">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;