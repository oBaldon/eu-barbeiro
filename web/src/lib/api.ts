import { createApi } from "@eu-barbeiro/shared";
import { useAuthStore } from "../store/auth";

const baseURL = import.meta.env.VITE_API_URL;
export const api = createApi(baseURL, () => useAuthStore.getState().token);
