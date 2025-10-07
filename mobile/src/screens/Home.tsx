import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth";

export default function Home({ navigation }: any) {
  const { logout } = useAuthStore();
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/users/me");
        setMe(data);
      } catch (e) {}
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0b1220", padding: 16, paddingTop: 48 }}>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
        Eu Barbeiro — Mobile
      </Text>
      <Text style={{ color: "#cbd5e1", marginBottom: 16 }}>
        Logado como: <Text style={{ color: "#fff" }}>{me?.email ?? "..."}</Text>
      </Text>
      <TouchableOpacity onPress={async () => { await logout(); navigation.replace("Login"); }}
        style={{ backgroundColor: "#334155", padding: 10, borderRadius: 10, alignSelf: "flex-start" }}>
        <Text style={{ color: "#fff" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
