import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
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
      updateAvatar: (avatarPath) => set((state) => ({ user: {...state.user, avatar_path: avatarPath, v: (state?.v || 1)+1}, isHydrated: true })),
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

export const useCacheStore = create(
  persist(
    (set) => ({
      usStates: null,
      usCarriers: null,
      usTimezones: null,
      isHydrated: false,
      setStates: (usStates) => {
        set({ usStates, isHydrated: true });
      },
      setCarriers: (usCarriers) => {
        set({ usCarriers, isHydrated: true });
      },
      setTimezones: (usTimezones) => {
        set({ usTimezones, isHydrated: true });
      },
      clearStorage: () => set({ usStates: null, usTimezones: null, usCarriers: null }),
      setHydrated: () => set({ isHydrated: true }), // Устанавливаем флаг после загрузки
    }),
    {
      name: 'ec81-storage', // Ключ для sessionStorage
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined, // Используем sessionStorage только на клиенте
      onRehydrateStorage: () => (state) => {
        // Вызывается после восстановления состояния
        state?.setHydrated();
      },
    }
  )
);