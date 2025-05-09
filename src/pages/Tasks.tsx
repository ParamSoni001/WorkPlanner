import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TaskList from '../components/dashboard/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import Button from '../components/ui/Button';
import { STORAGE_KEYS } from '../utils/constants';
import { Task, User } from '../types';

const Tasks: React.FC = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Task['status'] | 'all'>('all');
  
  const { user } = useAuth();
  const { userProjects } = useProjects();
  const { userTasks, updateTask, approveTask } = useTasks();
  
  const isManager = user?.role === 'manager';
  
  // Get all team members for task assignment
  const allUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const teamMembers = allUsers.filter(u => u.role === 'member');
  
  // Filter tasks
  const filteredTasks = userTasks.filter(task => {
    // Filter by search query
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="mt-1 text-sm text-gray-600">
                {isManager 
                  ? 'Manage and track all project tasks' 
                  : 'View and update your assigned tasks'}
              </p>
            </div>
            
            {isManager && (
              <Button
                onClick={() => setShowCreateTask(true)}
                variant="primary"
              >
                <Plus size={18} className="mr-1" />
                New Task
              </Button>
            )}
          </div>
          
          {/* Search and filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Task['status'] | 'all')}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
          
          {/* Tasks list */}
          {filteredTasks.length > 0 ? (
            <TaskList 
              tasks={filteredTasks} 
              title="All Tasks"
              onStatusChange={!isManager ? handleStatusChange : undefined}
              onApprove={isManager ? handleApproveTask : undefined}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : isManager
                  ? 'Create your first task to get started'
                  : 'You have not been assigned any tasks yet'}
              </p>
              
              {isManager && !searchQuery && statusFilter === 'all' && (
                <div className="mt-4">
                  <Button
                    onClick={() => setShowCreateTask(true)}
                    variant="outline"
                  >
                    <Plus size={18} className="mr-1" />
                    Create Task
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Create Task Modal */}
          {showCreateTask && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="max-w-md w-full">
                <TaskForm 
                  onClose={() => setShowCreateTask(false)}
                  projects={userProjects}
                  teamMembers={teamMembers}
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

export default Tasks;