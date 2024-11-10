import React, { createContext, useContext, useState } from 'react';
import { UserRole, UserProgress } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  phone?: string;
  savedProperties: string[];
  listedProperties?: string[];
  enrolledCourses: string[];
  courseProgress: UserProgress[];
  permissions: {
    canListProperties: boolean;
    canAccessAnalytics: boolean;
    canManageUsers: boolean;
    canCreateCourses: boolean;
    canModerateContent: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  saveProperty: (propertyId: string) => void;
  removeSavedProperty: (propertyId: string) => void;
  enrollInCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => UserProgress | undefined;
}

// Demo users for each role
const demoUsers: Record<string, User> = {
  'investor@demo.com': {
    id: '1',
    name: 'John Smith',
    email: 'investor@demo.com',
    role: 'investor',
    savedProperties: ['1', '3', '5'],
    enrolledCourses: ['1', '2'],
    courseProgress: [],
    permissions: {
      canListProperties: false,
      canAccessAnalytics: true,
      canManageUsers: false,
      canCreateCourses: false,
      canModerateContent: false,
    }
  },
  'broker@demo.com': {
    id: '2',
    name: 'Sarah Johnson',
    email: 'broker@demo.com',
    role: 'broker',
    company: 'Elite Real Estate Group',
    phone: '(555) 123-4567',
    savedProperties: [],
    listedProperties: ['2', '4', '6'],
    enrolledCourses: [],
    courseProgress: [],
    permissions: {
      canListProperties: true,
      canAccessAnalytics: true,
      canManageUsers: false,
      canCreateCourses: false,
      canModerateContent: false,
    }
  },
  'manager@demo.com': {
    id: '3',
    name: 'Michael Chen',
    email: 'manager@demo.com',
    role: 'property_manager',
    company: 'Skyline Properties Management',
    phone: '(555) 234-5678',
    savedProperties: [],
    listedProperties: ['7', '8', '9'],
    enrolledCourses: ['4'],
    courseProgress: [],
    permissions: {
      canListProperties: true,
      canAccessAnalytics: true,
      canManageUsers: false,
      canCreateCourses: false,
      canModerateContent: false,
    }
  },
  'instructor@demo.com': {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    email: 'instructor@demo.com',
    role: 'instructor',
    savedProperties: [],
    enrolledCourses: [],
    courseProgress: [],
    permissions: {
      canListProperties: false,
      canAccessAnalytics: true,
      canManageUsers: false,
      canCreateCourses: true,
      canModerateContent: true,
    }
  },
  'admin@demo.com': {
    id: '5',
    name: 'David Wilson',
    email: 'admin@demo.com',
    role: 'admin',
    savedProperties: [],
    enrolledCourses: [],
    courseProgress: [],
    permissions: {
      canListProperties: true,
      canAccessAnalytics: true,
      canManageUsers: true,
      canCreateCourses: true,
      canModerateContent: true,
    }
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll use the demo users
    const demoUser = demoUsers[email.toLowerCase()];
    if (demoUser) {
      setUser(demoUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // For demo purposes, we'll create a new user with basic permissions
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      savedProperties: [],
      enrolledCourses: [],
      courseProgress: [],
      permissions: {
        canListProperties: role === 'broker' || role === 'property_manager',
        canAccessAnalytics: true,
        canManageUsers: false,
        canCreateCourses: role === 'instructor',
        canModerateContent: false,
      }
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const saveProperty = (propertyId: string) => {
    if (user) {
      setUser({
        ...user,
        savedProperties: [...user.savedProperties, propertyId],
      });
    }
  };

  const removeSavedProperty = (propertyId: string) => {
    if (user) {
      setUser({
        ...user,
        savedProperties: user.savedProperties.filter(id => id !== propertyId),
      });
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (user && !user.enrolledCourses.includes(courseId)) {
      setUser({
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
        courseProgress: [
          ...user.courseProgress,
          {
            courseId,
            completedLessons: [],
            quizScores: {},
            lastAccessed: new Date().toISOString(),
            certificateEarned: false,
          },
        ],
      });
    }
  };

  const updateCourseProgress = (courseId: string, lessonId: string) => {
    if (user) {
      const updatedProgress = user.courseProgress.map(progress => {
        if (progress.courseId === courseId) {
          return {
            ...progress,
            completedLessons: [...progress.completedLessons, lessonId],
            lastAccessed: new Date().toISOString(),
          };
        }
        return progress;
      });

      setUser({
        ...user,
        courseProgress: updatedProgress,
      });
    }
  };

  const getCourseProgress = (courseId: string) => {
    return user?.courseProgress.find(progress => progress.courseId === courseId);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout, 
        saveProperty, 
        removeSavedProperty,
        enrollInCourse,
        updateCourseProgress,
        getCourseProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};