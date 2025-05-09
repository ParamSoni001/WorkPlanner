import React from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { STORAGE_KEYS } from '../utils/constants';
import { User } from '../types';

const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const { user } = useAuth();
  const { tasks } = useTasks();
  
  // Get all team members
  const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  
  // Filter team members based on user role
  const teamMembers = allUsers.filter(member => {
    // Managers can see all members
    if (user?.role === 'manager') {
      return member.role === 'member';
    }
    // Members can only see members in their projects
    // (This is a simplified implementation, in a real app we'd check project membership)
    return member.id !== user?.id;
  });
  
  // Filter by search
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Team</h1>
            <p className="mt-1 text-sm text-gray-600">
              {user?.role === 'manager' 
                ? 'View and manage your team members' 
                : 'View your team members'}
            </p>
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Team members grid */}
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map(member => (
                <TeamMemberCard 
                  key={member.id} 
                  member={member} 
                  tasks={tasks.filter(task => task.assignedTo === member.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search query'
                  : 'There are no team members available'}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;