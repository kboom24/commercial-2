export type UserRole = 'investor' | 'broker' | 'property_manager' | 'instructor' | 'admin';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  size: number;
  units: number;
  location: string;
  imageUrl: string;
  features: string[];
  cap_rate: number;
  noi: number;
  price_per_unit: number;
  estimatedValue: number;
  specialFeatures: string[];
  listingDate: string;
  views: number;
  potentialBuyers: number;
  priceHistory: PriceHistoryEntry[];
  taxHistory: TaxHistoryEntry[];
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
  change: number;
}

export interface TaxHistoryEntry {
  year: number;
  amount: number;
  change: number;
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastAccessed: string;
  certificateEarned: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  level: string;
  price: number;
  image: string;
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
  };
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment';
}