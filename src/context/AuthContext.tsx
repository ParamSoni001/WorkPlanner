import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Manager',
    email: 'manager@example.com',
    role: 'manager',
    avatar: '',
  },
  {
    id: '2',
    name: 'Param Soni',
    email: 'param.soni@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '3',
    name: 'Mohit Agarwal',
    email: 'mohit.agarwal@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '4',
    name: 'Rishbah Jain',
    email: 'rishbah.jain@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '5',
    name: 'Mehul Mangal',
    email: 'mehul.mangal@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '6',
    name: 'Pradeep Singh',
    email: 'pradeep.singh@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '7',
    name: 'Ram Modi',
    email: 'ram.modi@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '8',
    name: 'Vishal Agarwal',
    email: 'vishal.agarwal@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '9',
    name: 'Praveen Dudi',
    email: 'praveen.dudi@example.com',
    role: 'member',
    avatar: '',
  },
  {
    id: '10',
    name: 'Team Member',
    email: 'member@example.com',
    role: 'member',
    avatar: '',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!storedUsers) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    }

    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const foundUser = users.find((u: User) => 
        u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (foundUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(foundUser));
        setUser(foundUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    role: UserRole
  ): Promise<void> => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      
      if (users.some((u: User) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: generateId(),
        name,
        email,
        role,
        avatar: '',
      };
      
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...users, newUser]));
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
