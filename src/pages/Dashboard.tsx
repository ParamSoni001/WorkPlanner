import React from 'react';
import { ClipboardList, Users, CheckSquare, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatsCard from '../components/dashboard/StatsCard';
import TaskList from '../components/dashboard/TaskList';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { userProjects } = useProjects();
  const { userTasks, updateTask, approveTask } = useTasks();

  // Calculate statistics based on role
  const isManager = user?.role === 'manager';
  
  // Task statistics
  const totalTasks = userTasks.length;
  const completedTasks = userTasks.filter(
    task => task.status === 'completed' || task.status === 'approved'
  ).length;
  const pendingTasks = userTasks.filter(
    task => task.status === 'pending' || task.status === 'in-progress'
  ).length;
  
  // Calculate overdue tasks
  const overdueTasks = userTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return (
      dueDate < today && 
      task.status !== 'completed' && 
      task.status !== 'approved'
    );
  });
  
  // Filter tasks by status for different views
  const tasksNeedingApproval = userTasks.filter(task => task.status === 'completed');
  const tasksAssigned = userTasks.filter(task => 
    task.assignedTo === user?.id && 
    (task.status === 'pending' || task.status === 'in-progress')
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
            <h1 className="text-2xl font-bold text-gray-900">
              {isManager ? 'Manager Dashboard' : 'Team Member Dashboard'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back, {user?.name}
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Tasks"
              value={totalTasks}
              icon={ClipboardList}
              color="blue"
            />
            <StatsCard
              title="Completed Tasks"
              value={completedTasks}
              icon={CheckSquare}
              color="green"
            />
            <StatsCard
              title="Active Projects"
              value={userProjects.length}
              icon={Users}
              color="purple"
            />
            <StatsCard
              title="Overdue Tasks"
              value={overdueTasks.length}
              icon={AlertTriangle}
              color="amber"
            />
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isManager && (
              <TaskList 
                tasks={tasksNeedingApproval} 
                title="Tasks Awaiting Approval"
                onApprove={handleApproveTask}
              />
            )}
            
            {!isManager && (
              <TaskList 
                tasks={tasksAssigned} 
                title="My Tasks"
                onStatusChange={handleStatusChange}
              />
            )}
            
            <TaskList 
              tasks={overdueTasks} 
              title="Overdue Tasks"
              onStatusChange={!isManager ? handleStatusChange : undefined}
              onApprove={isManager ? handleApproveTask : undefined}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;