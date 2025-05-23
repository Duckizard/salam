import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  signIn: (username: string, password: string, remember: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      signIn: async (username, password, remember) => {
        // Simple authentication for testing
        if (username === 'Duckizard' && password === 'Mingyiisthebest61') {
          set({
            user: {
              id: '1',
              username: 'Duckizard'
            }
          });
        } else {
          throw new Error('Invalid username or password');
        }
      },

      signOut: async () => {
        set({ user: null });
      }
    }),
    {
      name: 'auth-store'
    }
  )
);