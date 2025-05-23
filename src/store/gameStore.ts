import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  balance: number;
  updateBalance: (amount: number) => void;
  resetBalance: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      balance: 1000,
      updateBalance: (amount) =>
        set((state) => ({ balance: state.balance + amount })),
      resetBalance: () => set({ balance: 1000 }),
    }),
    {
      name: 'game-store',
    }
  )
);

export default useGameStore;