import { create } from 'zustand';
import { VideoCall } from '../types';

interface VideoCallState {
  activeCall: VideoCall | null;
  callHistory: VideoCall[];
  isLoading: boolean;
  error: string | null;
  blurLevel: number;
  notes: string;
  callDuration: number;
}

interface VideoCallStore extends VideoCallState {
  initiateCall: (userId: string) => Promise<void>;
  endCall: () => Promise<void>;
  updateNotes: (notes: string) => void;
  rateCall: (rating: number) => Promise<void>;
  fetchCallHistory: () => Promise<void>;
  sendUnblurRequest: (userId: string) => Promise<void>;
  acceptUnblurRequest: (userId: string) => Promise<void>;
  rejectUnblurRequest: (userId: string) => Promise<void>;
}

export const useVideoCallStore = create<VideoCallStore>()((set, get) => ({
  activeCall: null,
  callHistory: [],
  isLoading: false,
  error: null,
  blurLevel: 8,
  notes: '',
  callDuration: 0,
  
  initiateCall: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCall: VideoCall = {
        id: `call-${Date.now()}`,
        participants: ['1', userId],
        startTime: new Date(),
        blurLevel: get().blurLevel,
      };
      
      // Start tracking call duration
      const durationInterval = setInterval(() => {
        set((state) => ({ callDuration: state.callDuration + 1 }));
      }, 1000);
      
      set({ 
        activeCall: newCall, 
        isLoading: false,
        callDuration: 0
      });
    } catch (error) {
      set({ error: 'Failed to initiate call', isLoading: false });
    }
  },
  
  endCall: async () => {
    const { activeCall } = get();
    if (!activeCall) return;
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const endedCall: VideoCall = {
        ...activeCall,
        endTime: new Date(),
        notes: get().notes,
      };
      
      set((state) => ({
        activeCall: null,
        callHistory: [endedCall, ...state.callHistory],
        notes: '',
        callDuration: 0,
      }));
    } catch (error) {
      set({ error: 'Failed to end call' });
    }
  },
  
  updateNotes: (notes: string) => {
    set({ notes });
  },
  
  rateCall: async (rating: number) => {
    const { callHistory } = get();
    const lastCall = callHistory[0];
    
    if (!lastCall) return;
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const ratedCall: VideoCall = {
        ...lastCall,
        rating,
      };
      
      set((state) => ({
        callHistory: [
          ratedCall,
          ...state.callHistory.slice(1),
        ],
      }));
    } catch (error) {
      set({ error: 'Failed to rate call' });
    }
  },
  
  fetchCallHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock call history
      const mockCallHistory: VideoCall[] = [
        {
          id: 'call-1',
          participants: ['1', '101'],
          startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
          blurLevel: 8,
          notes: 'Great conversation about travel and food',
          rating: 4,
        },
        {
          id: 'call-2',
          participants: ['1', '102'],
          startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000),
          blurLevel: 8,
          notes: 'Shared interests in art and museums',
          rating: 5,
        },
      ];
      
      set({ callHistory: mockCallHistory, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch call history', isLoading: false });
    }
  },
  
  sendUnblurRequest: async (userId: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, this would send a request to the other user
    } catch (error) {
      set({ error: 'Failed to send unblur request' });
    }
  },
  
  acceptUnblurRequest: async (userId: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, this would update both users' blur settings
    } catch (error) {
      set({ error: 'Failed to accept unblur request' });
    }
  },
  
  rejectUnblurRequest: async (userId: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, this would notify the other user
    } catch (error) {
      set({ error: 'Failed to reject unblur request' });
    }
  },
}));