export type UserRole = 'manager' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  members: string[];
  createdAt: string;
  status: 'active' | 'completed' | 'archived';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  createdBy: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'approved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
