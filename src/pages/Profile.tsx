import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProfileCard from '../components/profile/ProfileCard';
import TaskList from '../components/dashboard/TaskList';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { userTasks, updateTask, approveTask } = useTasks();
  
  const isManager = user?.role === 'manager';
  
  // Get relevant tasks for the profile page
  const completedTasks = userTasks.filter(task => 
    task.status === 'completed' || task.status === 'approved'
  );
  
  const pendingTasks = userTasks.filter(task => 
    task.status === 'pending' || task.status === 'in-progress'
  );
  
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="mt-1 text-sm text-gray-600">
              View and manage your profile information
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile information */}
            <div className="lg:col-span-1">
              {user && <ProfileCard user={user} />}
            </div>
            
            {/* Task information */}
            <div className="lg:col-span-2 space-y-6">
              <TaskList 
                tasks={pendingTasks} 
                title="Pending Tasks"
                onStatusChange={!isManager ? handleStatusChange : undefined}
                onApprove={isManager ? handleApproveTask : undefined}
              />
              
              <TaskList 
                tasks={completedTasks} 
                title="Completed Tasks"
                onApprove={isManager ? handleApproveTask : undefined}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;