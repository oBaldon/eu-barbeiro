import axios from "axios";
import { useAuthStore } from "../store/auth";

// Base vem do docker-compose (VITE_API_URL=http://localhost:8000/api/v1)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
