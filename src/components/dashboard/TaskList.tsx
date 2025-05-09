import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../../types';
import { formatDate, getDaysRemaining, getUserById } from '../../utils/helpers';
import { PRIORITY_COLORS, TASK_STATUS_COLORS } from '../../utils/constants';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface TaskListProps {
  tasks: Task[];
  title: string;
  onApprove?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  title,
  onApprove,
  onStatusChange,
}) => {
  const getTaskStatusIcon = (task: Task) => {
    const daysRemaining = getDaysRemaining(task.dueDate);
    
    if (task.status === 'completed' || task.status === 'approved') {
      return <CheckCircle size={16} className="text-green-500" />;
    }
    
    if (daysRemaining < 0) {
      return <AlertTriangle size={16} className="text-red-500" />;
    }
    
    if (daysRemaining <= 2) {
      return <Clock size={16} className="text-amber-500" />;
    }
    
    return null;
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {tasks.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => {
              const assignee = getUserById(task.assignedTo);
              const daysRemaining = getDaysRemaining(task.dueDate);
              const isOverdue = daysRemaining < 0 && task.status !== 'completed' && task.status !== 'approved';
              
              return (
                <div key={task.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">
                          {task.title}
                        </h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
                          {task.priority}
                        </span>
                        {getTaskStatusIcon(task)}
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {task.description}
                      </p>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-500 gap-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                            {isOverdue
                              ? `Overdue by ${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? 'day' : 'days'}`
                              : `Due ${formatDate(task.dueDate)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={TASK_STATUS_COLORS[task.status]}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                      
                      {assignee && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Assigned to</span>
                          <Avatar
                            src={assignee.avatar}
                            fallback={assignee.name}
                            size="sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-3 flex justify-end gap-2">
                    {/* Status change buttons for team members */}
                    {onStatusChange && task.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStatusChange(task.id, 'in-progress')}
                      >
                        Start Task
                      </Button>
                    )}
                    
                    {onStatusChange && task.status === 'in-progress' && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => onStatusChange(task.id, 'completed')}
                      >
                        Mark Complete
                      </Button>
                    )}
                    
                    {/* Approve button for managers */}
                    {onApprove && task.status === 'completed' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onApprove(task.id)}
                      >
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;