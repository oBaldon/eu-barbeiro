import axios, { AxiosInstance } from "axios";

/**
 * Cria uma instância Axios com baseURL e Authorization Bearer (se houver).
 * getToken: função que retorna o JWT atual ou null.
 */
export function createApi(baseURL: string, getToken: () => string | null): AxiosInstance {
  const api = axios.create({ baseURL, timeout: 15000 });
  api.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return api;
}
