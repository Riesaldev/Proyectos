export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  location: string;
  bio: string;
  interests: string[];
  photos: string[];
  isVerified: boolean;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;
  genderPreference: ('male' | 'female' | 'non-binary' | 'other')[];
  interests: string[];
}

export interface Match {
  id: string;
  users: [string, string];
  createdAt: Date;
  status: 'pending' | 'accepted' | 'declined';
  compatibility: number;
}

export interface VideoCall {
  id: string;
  participants: [string, string];
  startTime: Date;
  endTime?: Date;
  blurLevel: number;
  notes?: string;
  rating?: number;
}

export interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  read: boolean;
  reported: boolean;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  image: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}