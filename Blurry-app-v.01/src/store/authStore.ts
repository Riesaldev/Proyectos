import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// This is a mock implementation. In a real app, you would connect to a backend.
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockUser: User = {
            id: '1',
            email,
            name: 'John Doe',
            age: 28,
            gender: 'male',
            location: 'New York, NY',
            bio: 'I love hiking and photography',
            interests: ['photography', 'hiking', 'cooking'],
            photos: [
              'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            isVerified: false,
            createdAt: new Date(),
            preferences: {
              ageRange: { min: 25, max: 35 },
              distance: 25,
              genderPreference: ['female'],
              interests: [],
            },
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: 'Invalid email or password', isLoading: false });
        }
      },
      
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockUser: User = {
            id: '2',
            email: 'jane@example.com',
            name: 'Jane Smith',
            age: 26,
            gender: 'female',
            location: 'Los Angeles, CA',
            bio: 'Art lover and coffee enthusiast',
            interests: ['art', 'coffee', 'travel'],
            photos: [
              'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            isVerified: true,
            createdAt: new Date(),
            preferences: {
              ageRange: { min: 25, max: 35 },
              distance: 15,
              genderPreference: ['male'],
              interests: [],
            },
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: 'Google login failed', isLoading: false });
        }
      },
      
      loginWithFacebook: async () => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockUser: User = {
            id: '3',
            email: 'mike@example.com',
            name: 'Mike Johnson',
            age: 30,
            gender: 'male',
            location: 'Chicago, IL',
            bio: 'Music lover and foodie',
            interests: ['music', 'food', 'movies'],
            photos: [
              'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            ],
            isVerified: true,
            createdAt: new Date(),
            preferences: {
              ageRange: { min: 25, max: 35 },
              distance: 20,
              genderPreference: ['female'],
              interests: [],
            },
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: 'Facebook login failed', isLoading: false });
        }
      },
      
      register: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful registration
          const mockUser: User = {
            id: '4',
            email,
            name,
            age: 25,
            gender: 'male',
            location: 'San Francisco, CA',
            bio: '',
            interests: [],
            photos: [],
            isVerified: false,
            createdAt: new Date(),
            preferences: {
              ageRange: { min: 18, max: 35 },
              distance: 25,
              genderPreference: ['female'],
              interests: [],
            },
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: 'Registration failed', isLoading: false });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);