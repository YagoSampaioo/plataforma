import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  clearError: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      updateUser: (user: User) => {
        set({ user });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.login(email, password);
          set({ user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Erro ao fazer login'
          });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.logout();
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error) {
          set({ 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Erro ao fazer logout'
          });
        }
      },

      checkSession: async () => {
        const storedUser = localStorage.getItem('auth-storage');
        if (storedUser) {
          const { state } = JSON.parse(storedUser);
          if (state.user) {
            set({ user: state.user, isAuthenticated: true });
          }
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);