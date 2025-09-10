import { useState } from 'react';
import { User, LoginCredentials, Department } from '../types';
import { DEPARTMENTS } from '../constants';

// Mock user data - replace with actual API calls
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@geocasagroup.com',
    departments: [DEPARTMENTS[0], DEPARTMENTS[1]] // Multiple departments
  },
  {
    id: '2',
    name: 'Marie Nguema',
    email: 'marie@geocasagroup.com',
    departments: [DEPARTMENTS[2]] // Single department
  },
  {
    id: '3',
    name: 'Paul Mballa',
    email: 'paul@geocasagroup.com',
    departments: DEPARTMENTS // All departments
  }
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<User | null> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (foundUser && credentials.password === 'password') {
      setUser(foundUser);
      setLoading(false);
      return foundUser;
    }
    
    setLoading(false);
    return null;
  };

  const selectDepartment = (department: Department) => {
    if (user) {
      setUser({ ...user, currentDepartment: department });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    selectDepartment,
    logout
  };
};