import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  userProjects: Project[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'managerId'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  getProjectsByMember: (userId: string) => Project[];
}

// Create the Project Context
const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  loading: true,
  userProjects: [],
  createProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  getProjectById: () => undefined,
  getProjectsByMember: () => [],
});

// Mock project data for demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the company website with modern UI/UX principles',
    managerId: '1',
    members: ['1', '2'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a cross-platform mobile app for our customers',
    managerId: '1',
    members: ['1', '2'],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
];

// Project Provider Component
export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Initialize projects state
  useEffect(() => {
    // Check if projects exist in localStorage, if not, initialize with mock data
    const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!storedProjects) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mockProjects));
      setProjects(mockProjects);
    } else {
      setProjects(JSON.parse(storedProjects));
    }
    
    setLoading(false);
  }, []);

  // Get projects relevant to the current user
  const userProjects = user
    ? projects.filter(
        (project) =>
          (user.role === 'manager' && project.managerId === user.id) ||
          project.members.includes(user.id)
      )
    : [];

  // Create a new project
  const createProject = (
    project: Omit<Project, 'id' | 'createdAt' | 'managerId'>
  ): void => {
    if (!user) return;

    const newProject: Project = {
      ...project,
      id: generateId(),
      managerId: user.id,
      createdAt: new Date().toISOString(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));
  };

  // Update an existing project
  const updateProject = (id: string, updatedData: Partial<Project>): void => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, ...updatedData } : project
    );
    
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));
  };

  // Delete a project
  const deleteProject = (id: string): void => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));
  };

  // Get a project by ID
  const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id);
  };

  // Get projects by member ID
  const getProjectsByMember = (userId: string): Project[] => {
    return projects.filter((project) => project.members.includes(userId));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        userProjects,
        createProject,
        updateProject,
        deleteProject,
        getProjectById,
        getProjectsByMember,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use project context
export const useProjects = () => useContext(ProjectContext);

export default ProjectContext;