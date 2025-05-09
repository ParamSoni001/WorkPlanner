import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  userTasks: Task[];
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasksByProject: (projectId: string) => Task[];
  getTasksByAssignee: (userId: string) => Task[];
  approveTask: (id: string) => void;
}

// Create the Task Context
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  loading: true,
  userTasks: [],
  createTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  getTaskById: () => undefined,
  getTasksByProject: () => [],
  getTasksByAssignee: () => [],
  approveTask: () => {},
});

// Mock task data for demo
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create a mockup for the new homepage design',
    projectId: '1',
    assignedTo: '2',
    createdBy: '1',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up user authentication system with email and password',
    projectId: '1',
    assignedTo: '2',
    createdBy: '1',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Create App Wireframes',
    description: 'Design wireframes for the mobile app screens',
    projectId: '2',
    assignedTo: '2',
    createdBy: '1',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    priority: 'high',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Task Provider Component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Initialize tasks state
  useEffect(() => {
    // Check if tasks exist in localStorage, if not, initialize with mock data
    const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!storedTasks) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(mockTasks));
      setTasks(mockTasks);
    } else {
      setTasks(JSON.parse(storedTasks));
    }
    
    setLoading(false);
  }, []);

  // Get tasks relevant to the current user
  const userTasks = user
    ? tasks.filter(
        (task) =>
          (user.role === 'manager' && task.createdBy === user.id) ||
          task.assignedTo === user.id
      )
    : [];

  // Create a new task
  const createTask = (
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>
  ): void => {
    if (!user) return;

    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdBy: user.id,
      createdAt: now,
      updatedAt: now,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
  };

  // Update an existing task
  const updateTask = (id: string, updatedData: Partial<Task>): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, ...updatedData, updatedAt: new Date().toISOString() }
        : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
  };

  // Delete a task
  const deleteTask = (id: string): void => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
  };

  // Get a task by ID
  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  };

  // Get tasks by project ID
  const getTasksByProject = (projectId: string): Task[] => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  // Get tasks by assignee ID
  const getTasksByAssignee = (userId: string): Task[] => {
    return tasks.filter((task) => task.assignedTo === userId);
  };

  // Approve a completed task
  const approveTask = (id: string): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id && task.status === 'completed'
        ? { ...task, status: 'approved', updatedAt: new Date().toISOString() }
        : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        userTasks,
        createTask,
        updateTask,
        deleteTask,
        getTaskById,
        getTasksByProject,
        getTasksByAssignee,
        approveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTasks = () => useContext(TaskContext);

export default TaskContext;