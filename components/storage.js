import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      setAuth: (token, user) => {
        if (typeof token !== 'string') {
          console.error('Token must be a string:', token);
          return;
        }
        if (typeof user !== 'object' || user === null) {
          console.error('User must be an object:', user);
          return;
        }
        set({ token, user, isHydrated: true });
      },
      clearAuth: () => set({ token: null, user: null }),
      setHydrated: () => set({ isHydrated: true }), // Устанавливаем флаг после загрузки
    }),
    {
      name: 'auth-storage', // Ключ для localStorage
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined, // Используем localStorage только на клиенте
      onRehydrateStorage: () => (state) => {
        // Вызывается после восстановления состояния
        state?.setHydrated();
      },
    }
  )
);

export default useAuthStore;