export const STORAGE_KEYS = {
  USERS: 'work-planner-users',
  PROJECTS: 'work-planner-projects',
  TASKS: 'work-planner-tasks',
  CURRENT_USER: 'work-planner-current-user',
};

export const COLORS = {
  primary: {
    light: '#93c5fd',
    DEFAULT: '#3b82f6',
    dark: '#2563eb',
  },
  secondary: {
    light: '#bae6fd',
    DEFAULT: '#38bdf8',
    dark: '#0284c7',
  },
  accent: {
    light: '#fde68a',
    DEFAULT: '#f59e0b',
    dark: '#d97706',
  },
  success: {
    light: '#86efac',
    DEFAULT: '#22c55e',
    dark: '#16a34a',
  },
  warning: {
    light: '#fed7aa',
    DEFAULT: '#f97316',
    dark: '#ea580c',
  },
  error: {
    light: '#fca5a5',
    DEFAULT: '#ef4444',
    dark: '#dc2626',
  },
};

export const TASK_STATUS_COLORS = {
  'pending': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'approved': 'bg-purple-100 text-purple-800',
};

export const PRIORITY_COLORS = {
  'low': 'bg-green-100 text-green-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-red-100 text-red-800',
};

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Tasks', path: '/tasks' },
  { name: 'Team', path: '/team' },
  { name: 'Profile', path: '/profile' },
];