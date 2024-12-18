import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet } from "react-native";

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spdmfy</Text>
      <Text style={styles.loginLabel}>Login</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Senha"
        placeholderTextColor="#ccc"
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Fundo escuro
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "#B91D82", // Destaque principal
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  loginLabel: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "100%",
    fontSize: 16,
    borderColor: "#333",
    borderWidth: 1,
  },
});
