import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ClipboardList, Users, Calendar, CheckCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TaskList from '../components/dashboard/TaskList';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import { formatDate, getUserById } from '../utils/helpers';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById } = useProjects();
  const { tasks, updateTask, approveTask } = useTasks();
  
  const project = getProjectById(id || '');
  
  if (!project) {
    return <Navigate to="/projects" replace />;
  }
  
  const projectTasks = tasks.filter(task => task.projectId === project.id);
  const completedTasks = projectTasks.filter(
    task => task.status === 'completed' || task.status === 'approved'
  ).length;
  const progress = projectTasks.length > 0 
    ? Math.round((completedTasks / projectTasks.length) * 100) 
    : 0;
  
  const manager = getUserById(project.managerId);
  const teamMembers = project.members.map(id => getUserById(id)).filter(Boolean);
  
  // Handler for task status updates
  const handleStatusChange = (taskId: string, status: 'pending' | 'in-progress' | 'completed' | 'approved') => {
    updateTask(taskId, { status });
  };
  
  // Handler for task approval
  const handleApproveTask = (taskId: string) => {
    approveTask(taskId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="mt-1 text-gray-600">{project.description}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Created</p>
                  <p className="text-sm text-gray-900">{formatDate(project.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Size</p>
                  <p className="text-sm text-gray-900">{teamMembers.length} members</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ClipboardList className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasks</p>
                  <p className="text-sm text-gray-900">{projectTasks.length} total</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-sm text-gray-900">{progress}% complete</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tasks */}
            <div className="lg:col-span-2">
              <TaskList 
                tasks={projectTasks}
                title="Project Tasks"
                onStatusChange={handleStatusChange}
                onApprove={handleApproveTask}
              />
            </div>
            
            {/* Team */}
            <div className="lg:col-span-1 space-y-6">
              {/* Manager */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Manager</h3>
                  {manager && (
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={manager.avatar}
                        fallback={manager.name}
                        size="lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{manager.name}</p>
                        <p className="text-sm text-gray-600">{manager.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              
              {/* Team Members */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                  <div className="space-y-4">
                    {teamMembers.map(member => member && (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar
                          src={member.avatar}
                          fallback={member.name}
                          size="md"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;