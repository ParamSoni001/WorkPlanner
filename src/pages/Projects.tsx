import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import Button from '../components/ui/Button';
import { STORAGE_KEYS } from '../utils/constants';
import { User } from '../types';

const Projects: React.FC = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuth();
  const { userProjects } = useProjects();
  const { tasks } = useTasks();
  
  const isManager = user?.role === 'manager';
  
  // Get all team members for project creation
  const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const teamMembers = allUsers.filter(u => u.role === 'member');
  
  // Filter projects by search query
  const filteredProjects = userProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="mt-1 text-sm text-gray-600">
                {isManager 
                  ? 'Create and manage your team projects' 
                  : 'View your assigned projects'}
              </p>
            </div>
            
            {isManager && (
              <Button
                onClick={() => setShowCreateProject(true)}
                variant="primary"
              >
                <Plus size={18} className="mr-1" />
                New Project
              </Button>
            )}
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Projects grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  tasks={tasks.filter(task => task.projectId === project.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'Try adjusting your search query'
                  : isManager
                  ? 'Create your first project to get started'
                  : 'You have not been assigned to any projects yet'}
              </p>
              
              {isManager && !searchQuery && (
                <div className="mt-4">
                  <Button
                    onClick={() => setShowCreateProject(true)}
                    variant="outline"
                  >
                    <Plus size={18} className="mr-1" />
                    Create Project
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Create Project Modal */}
          {showCreateProject && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="max-w-md w-full">
                <ProjectForm 
                  onClose={() => setShowCreateProject(false)}
                  availableMembers={teamMembers}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;