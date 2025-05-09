import { STORAGE_KEYS } from './constants';
import { Project, Task, User } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Format date to readable format
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Get days remaining until due date
export const getDaysRemaining = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Calculate task completion percentage for a project
export const calculateProjectProgress = (tasks: Task[], projectId: string): number => {
  const projectTasks = tasks.filter(task => task.projectId === projectId);
  if (projectTasks.length === 0) return 0;
  
  const completedTasks = projectTasks.filter(
    task => task.status === 'completed' || task.status === 'approved'
  );
  
  return Math.round((completedTasks.length / projectTasks.length) * 100);
};

// Get user by ID
export const getUserById = (userId: string): User | undefined => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  return users.find((user: User) => user.id === userId);
};

// Get project by ID
export const getProjectById = (projectId: string): Project | undefined => {
  const projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
  return projects.find((project: Project) => project.id === projectId);
};

// Get tasks for a user
export const getUserTasks = (userId: string): Task[] => {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  return tasks.filter((task: Task) => task.assignedTo === userId);
};

// Get tasks for a project
export const getProjectTasks = (projectId: string): Task[] => {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  return tasks.filter((task: Task) => task.projectId === projectId);
};

// Check if user is project manager
export const isProjectManager = (userId: string, projectId: string): boolean => {
  const project = getProjectById(projectId);
  return project ? project.managerId === userId : false;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};