// src/store/useThemeStore.ts
import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>(set => ({
  darkMode: false, // 기본은 라이트 모드
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
  setDarkMode: (value: boolean) => set({ darkMode: value }),
}));
