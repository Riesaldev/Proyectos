import { create } from 'zustand';
import { Match, User } from '../types';

interface MatchState {
  matches: Match[];
  potentialMatches: User[];
  isLoading: boolean;
  error: string | null;
}

interface MatchStore extends MatchState {
  fetchMatches: () => Promise<void>;
  fetchPotentialMatches: () => Promise<void>;
  likeUser: (userId: string) => Promise<void>;
  passUser: (userId: string) => Promise<void>;
}

// Mock data for potential matches
const mockPotentialMatches: User[] = [
  {
    id: '101',
    email: 'emma@example.com',
    name: 'Emma Wilson',
    age: 27,
    gender: 'female',
    location: 'New York, NY',
    bio: 'Passionate about dance and literature',
    interests: ['dancing', 'reading', 'yoga'],
    photos: ['https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    isVerified: true,
    createdAt: new Date(),
    preferences: {
      ageRange: { min: 25, max: 35 },
      distance: 15,
      genderPreference: ['male'],
      interests: ['music', 'travel'],
    },
  },
  {
    id: '102',
    email: 'sophia@example.com',
    name: 'Sophia Martinez',
    age: 29,
    gender: 'female',
    location: 'Boston, MA',
    bio: 'Art curator and wine enthusiast',
    interests: ['art', 'wine tasting', 'museums'],
    photos: ['https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    isVerified: true,
    createdAt: new Date(),
    preferences: {
      ageRange: { min: 27, max: 38 },
      distance: 20,
      genderPreference: ['male'],
      interests: ['art', 'culture'],
    },
  },
  {
    id: '103',
    email: 'olivia@example.com',
    name: 'Olivia Brown',
    age: 26,
    gender: 'female',
    location: 'Seattle, WA',
    bio: 'Software engineer and hiking enthusiast',
    interests: ['hiking', 'coding', 'photography'],
    photos: ['https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    isVerified: true,
    createdAt: new Date(),
    preferences: {
      ageRange: { min: 25, max: 35 },
      distance: 30,
      genderPreference: ['male', 'non-binary'],
      interests: ['tech', 'outdoors'],
    },
  },
];

// Mock data for matches
const mockMatches: Match[] = [
  {
    id: 'm1',
    users: ['1', '101'],
    createdAt: new Date(),
    status: 'accepted',
    compatibility: 85,
  },
  {
    id: 'm2',
    users: ['1', '102'],
    createdAt: new Date(),
    status: 'pending',
    compatibility: 78,
  },
];

export const useMatchStore = create<MatchStore>()((set, get) => ({
  matches: [],
  potentialMatches: [],
  isLoading: false,
  error: null,
  
  fetchMatches: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ matches: mockMatches, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch matches', isLoading: false });
    }
  },
  
  fetchPotentialMatches: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ potentialMatches: mockPotentialMatches, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch potential matches', isLoading: false });
    }
  },
  
  likeUser: async (userId: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter out the liked user from potential matches
      set((state) => ({
        potentialMatches: state.potentialMatches.filter(user => user.id !== userId),
      }));
      
      // Simulate a match (50% chance)
      if (Math.random() > 0.5) {
        const newMatch: Match = {
          id: `m${Date.now()}`,
          users: ['1', userId],
          createdAt: new Date(),
          status: 'accepted',
          compatibility: Math.floor(Math.random() * 20) + 75, // 75-95 compatibility
        };
        
        set((state) => ({
          matches: [...state.matches, newMatch],
        }));
      }
    } catch (error) {
      set({ error: 'Failed to like user' });
    }
  },
  
  passUser: async (userId: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter out the passed user from potential matches
      set((state) => ({
        potentialMatches: state.potentialMatches.filter(user => user.id !== userId),
      }));
    } catch (error) {
      set({ error: 'Failed to pass user' });
    }
  },
}));