import Constants from "expo-constants";
import { createApi } from "@eu-barbeiro/shared";
import { useAuthStore } from "../store/auth";

const base =
  process.env.EXPO_PUBLIC_API_BASE ||
  (Constants.expoConfig?.extra as any)?.apiBase ||
  "http://localhost:8000/api/v1";

export const api = createApi(base, () => useAuthStore.getState().token);
