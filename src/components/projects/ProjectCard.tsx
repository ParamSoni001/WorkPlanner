import React from 'react';
import { Link } from 'react-router-dom';
import { Users, CalendarDays } from 'lucide-react';
import { Project, Task } from '../../types';
import { formatDate, getUserById } from '../../utils/helpers';
import Avatar from '../ui/Avatar';
import Card, { CardContent } from '../ui/Card';

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, tasks }) => {
  const manager = getUserById(project.managerId);
  
  // Calculate project stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    task => task.status === 'completed' || task.status === 'approved'
  ).length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <Link to={`/projects/${project.id}`}>
      <Card hover className="h-full">
        <CardContent>
          <div className="mb-2 flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              project.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : project.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="space-y-3">
            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Progress</span>
                <span className="text-xs font-medium text-gray-700">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Task stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Total Tasks: {totalTasks}</span>
              <span>Completed: {completedTasks}</span>
              <span>In Progress: {inProgressTasks}</span>
            </div>
            
            {/* Project meta */}
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <CalendarDays size={14} className="mr-1" />
                <span>Created {formatDate(project.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500 mr-1">{project.members.length}</span>
                
                {manager && (
                  <div className="flex items-center">
                    <Avatar 
                      src={manager.avatar}
                      fallback={manager.name}
                      size="sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;