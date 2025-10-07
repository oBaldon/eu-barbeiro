import { useAuthStore } from "../store/auth";
import { api } from "../lib/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { token, logout } = useAuthStore();
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/users/me");
        setMe(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-white">Painel — Eu Barbeiro</h1>
        <div className="flex items-center gap-3">
          <span className="text-slate-300 text-sm">{me ? me.email : "..."}</span>
          <button onClick={logout} className="rounded-md bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5">
            Sair
          </button>
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-800/60 p-4">
          <h2 className="font-medium text-white mb-2">Bem-vindo!</h2>
          <p className="text-slate-300 text-sm">Seu ambiente web está conectado à API.</p>
        </div>
        <div className="rounded-2xl bg-slate-800/60 p-4">
          <h2 className="font-medium text-white mb-2">Status</h2>
          <ul className="text-slate-300 text-sm list-disc ml-5">
            <li>Auth JWT ativa</li>
            <li>Rotas protegidas com Zustand + React Router</li>
            <li>Axios com interceptor de Bearer</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
