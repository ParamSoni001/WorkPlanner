import React from 'react';
import { User, Task } from '../../types';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';

interface TeamMemberCardProps {
  member: User;
  tasks: Task[];
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, tasks }) => {
  // Calculate member stats
  const memberTasks = tasks.filter(task => task.assignedTo === member.id);
  const totalTasks = memberTasks.length;
  const completedTasks = memberTasks.filter(
    task => task.status === 'completed' || task.status === 'approved'
  ).length;
  const pendingTasks = memberTasks.filter(
    task => task.status === 'pending' || task.status === 'in-progress'
  ).length;
  
  // Calculate overdue tasks
  const overdueTasks = memberTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return (
      dueDate < today && 
      task.status !== 'completed' && 
      task.status !== 'approved'
    );
  }).length;
  
  // Calculate completion rate
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  return (
    <Card hover className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{member.role}</p>
        </div>
        
        <div className="mt-6 space-y-4">
          {/* Completion rate */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Completion Rate</span>
              <span className="text-sm font-medium text-gray-700">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
          
          {/* Task statistics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle size={16} className="text-blue-600 mr-1" />
                <span className="text-sm font-medium text-blue-600">{completedTasks}</span>
              </div>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="text-amber-600 mr-1" />
                <span className="text-sm font-medium text-amber-600">{pendingTasks}</span>
              </div>
              <p className="text-xs text-gray-600">Pending</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <AlertTriangle size={16} className="text-red-600 mr-1" />
                <span className="text-sm font-medium text-red-600">{overdueTasks}</span>
              </div>
              <p className="text-xs text-gray-600">Overdue</p>
            </div>
          </div>
          
          {/* Total tasks */}
          <div className="flex justify-between items-center text-sm text-gray-600 pt-2">
            <span>Total Tasks:</span>
            <span className="font-semibold text-gray-900">{totalTasks}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
