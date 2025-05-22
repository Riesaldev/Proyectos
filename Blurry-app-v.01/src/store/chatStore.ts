import { create } from 'zustand';
import { Message } from '../types';

interface ChatState {
  messages: Record<string, Message[]>;
  activeChat: string | null;
  isLoading: boolean;
  error: string | null;
}

interface ChatStore extends ChatState {
  fetchMessages: (userId: string) => Promise<void>;
  sendMessage: (recipientId: string, content: string) => Promise<void>;
  setActiveChat: (userId: string | null) => void;
  markAsRead: (userId: string) => void;
  reportMessage: (messageId: string) => Promise<void>;
}

// Mock data for messages
const mockMessages: Record<string, Message[]> = {
  '101': [
    {
      id: 'm1',
      sender: '1',
      recipient: '101',
      content: 'Hi Emma, how are you?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      reported: false,
    },
    {
      id: 'm2',
      sender: '101',
      recipient: '1',
      content: 'Hey! I\'m good, thanks. How about you?',
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
      read: true,
      reported: false,
    },
    {
      id: 'm3',
      sender: '1',
      recipient: '101',
      content: 'I\'m doing well! Would you like to have a video call sometime?',
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
      read: true,
      reported: false,
    },
    {
      id: 'm4',
      sender: '101',
      recipient: '1',
      content: 'Sure, that sounds fun! When are you free?',
      timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000),
      read: false,
      reported: false,
    },
  ],
  '102': [
    {
      id: 'm5',
      sender: '1',
      recipient: '102',
      content: 'Hey Sophia, I saw that you like art. What\'s your favorite museum?',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
      reported: false,
    },
    {
      id: 'm6',
      sender: '102',
      recipient: '1',
      content: 'Hi! I love the MoMA in New York, but the Louvre is my all-time favorite. Have you been?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      reported: false,
    },
  ],
};

export const useChatStore = create<ChatStore>()((set, get) => ({
  messages: {},
  activeChat: null,
  isLoading: false,
  error: null,
  
  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Return mock messages or empty array if none exist
      const userMessages = mockMessages[userId] || [];
      set((state) => ({
        messages: {
          ...state.messages,
          [userId]: userMessages,
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch messages', isLoading: false });
    }
  },
  
  sendMessage: async (recipientId: string, content: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newMessage: Message = {
        id: `m${Date.now()}`,
        sender: '1', // Current user ID
        recipient: recipientId,
        content,
        timestamp: new Date(),
        read: false,
        reported: false,
      };
      
      set((state) => {
        const existingMessages = state.messages[recipientId] || [];
        return {
          messages: {
            ...state.messages,
            [recipientId]: [...existingMessages, newMessage],
          },
        };
      });
    } catch (error) {
      set({ error: 'Failed to send message' });
    }
  },
  
  setActiveChat: (userId: string | null) => {
    set({ activeChat: userId });
    if (userId) {
      get().markAsRead(userId);
    }
  },
  
  markAsRead: (userId: string) => {
    set((state) => {
      const userMessages = state.messages[userId] || [];
      const updatedMessages = userMessages.map(msg => 
        msg.recipient === '1' ? { ...msg, read: true } : msg
      );
      
      return {
        messages: {
          ...state.messages,
          [userId]: updatedMessages,
        },
      };
    });
  },
  
  reportMessage: async (messageId: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => {
        const updatedMessages = { ...state.messages };
        
        // Find and update the reported message
        Object.keys(updatedMessages).forEach(userId => {
          updatedMessages[userId] = updatedMessages[userId].map(msg => 
            msg.id === messageId ? { ...msg, reported: true } : msg
          );
        });
        
        return { messages: updatedMessages };
      });
    } catch (error) {
      set({ error: 'Failed to report message' });
    }
  },
}));