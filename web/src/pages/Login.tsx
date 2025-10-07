import { useState } from "react";
import { api } from "../lib/api";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@eubarbeiro.dev");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const setToken = useAuthStore(s => s.setToken);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      // aceita snake_case ou camelCase, conforme backend atual
      const { data } = await api.post("/auth/login", { email, password }).catch(async (ex) => {
        // fallback para querystring, se seu /auth/login ainda não estiver em JSON
        if (ex?.response?.status === 405 || ex?.response?.status === 422) {
          return api.post(`/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        }
        throw ex;
      });
      const token = data?.accessToken || data?.access_token;
      if (!token) throw new Error("Token ausente na resposta");
      setToken(token);
      navigate("/", { replace: true });
    } catch (e: any) {
      setErr(e?.response?.data?.detail ?? e?.message ?? "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-slate-800/60 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-4">Entrar</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-sm text-slate-300">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Senha</span>
            <input
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </label>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
