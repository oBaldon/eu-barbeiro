import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  token: string | null;
  hydrated: boolean;
  setToken: (t: string | null) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  hydrated: false,
  setToken: async (t) => {
    if (t) await SecureStore.setItemAsync("token", t);
    else await SecureStore.deleteItemAsync("token");
    set({ token: t });
  },
  hydrate: async () => {
    const t = await SecureStore.getItemAsync("token");
    set({ token: t, hydrated: true });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ token: null });
  },
}));
