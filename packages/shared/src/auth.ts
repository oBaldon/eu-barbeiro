import { AxiosInstance } from "axios";
import type { TokenResponse } from "./types";

/** Realiza login no endpoint /auth/login. Tenta JSON; se 405/422, usa querystring. */
export async function login(api: AxiosInstance, email: string, password: string): Promise<TokenResponse> {
  try {
    const { data } = await api.post<TokenResponse>("/auth/login", { email, password });
    return data;
  } catch (ex: any) {
    const status = ex?.response?.status;
    if (status === 405 || status === 422) {
      const qs = new URLSearchParams({ email, password }).toString();
      const { data } = await api.post<TokenResponse>(`/auth/login?${qs}`);
      return data;
    }
    throw ex;
  }
}
