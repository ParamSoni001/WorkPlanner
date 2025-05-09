import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address');
      }
      
      if (!password.trim()) {
        throw new Error('Please enter your password');
      }

      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Invalid credentials') {
          setError('Email not found. Please use demo accounts (manager@example.com or member@example.com) or register a new account. Any password will work for demo accounts.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <LogIn size={28} className="text-blue-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Log in to your account
      </h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </div>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Demo Accounts:
        </p>
        <div className="mt-2 space-y-2 text-xs text-gray-500">
          <p>Manager: manager@example.com</p>
          <p>Team Member: member@example.com</p>
          <p className="italic">(any password will work)</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;