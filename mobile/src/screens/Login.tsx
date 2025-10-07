import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth";
import { login as loginHelper } from "@eu-barbeiro/shared";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("admin@eubarbeiro.dev");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const setToken = useAuthStore((s) => s.setToken);

  async function onSubmit() {
    setErr(null);
    setLoading(true);
    try {
      const data: any = await loginHelper(api, email, password);
      const token = data.accessToken || data.access_token;
      if (!token) throw new Error("Token ausente na resposta");
      await setToken(token);
      navigation.replace("Home");
    } catch (e: any) {
      setErr(e?.response?.data?.detail ?? e?.message ?? "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0b1220", padding: 16, justifyContent: "center" }}>
      <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 16 }}>Entrar</Text>
      <Text style={{ color: "#9fb3c8" }}>E-mail</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
        style={{ backgroundColor: "#0f172a", color: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 }} />
      <Text style={{ color: "#9fb3c8" }}>Senha</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry
        style={{ backgroundColor: "#0f172a", color: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 }} />
      {err && <Text style={{ color: "#fca5a5", marginBottom: 8 }}>{err}</Text>}
      <TouchableOpacity onPress={onSubmit} disabled={loading}
        style={{ backgroundColor: "#10b981", padding: 12, borderRadius: 10, opacity: loading ? 0.7 : 1 }}>
        <Text style={{ color: "#00110a", textAlign: "center", fontWeight: "700" }}>
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
