import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import { useAuthStore } from "./src/store/auth";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const { token, hydrated, hydrate } = useAuthStore();

  useEffect(() => { if (!hydrated) hydrate(); }, [hydrated]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0b1220" }}>
        <ActivityIndicator color="#10b981" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
