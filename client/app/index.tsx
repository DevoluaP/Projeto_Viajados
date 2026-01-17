import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "expo-router";

export default function Index() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const validaEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function navegarParaHome() {
    (navigation as any).navigate("(tabs)", { screen: "explorar" });
  }

  const salvarDados = async (
    token: string,
    idUsuario: number | string,
    email: string,
    nome: string
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("idUsuario", String(idUsuario));
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("nome", nome);
    } catch (erro) {
      throw erro;
    }
  };

  const continuarPressionado = async () => {
    if (!email.trim() || !validaEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (!senha.trim()) {
      Alert.alert("Erro", "O campo de senha não pode estar vazio.");
      return;
    }

    setLoading(true);

    const dadosUsuario = { email, senha };

    try {
      const baseURL = process.env.EXPO_PUBLIC_API_URL;
      const resposta = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      });

      const dados = await resposta.json();

      if (resposta.status === 200) {
        const { token, usuario } = dados;
        const { idUsuario, email: emailUsuario, nome } = usuario;

        await salvarDados(token, idUsuario, emailUsuario, nome);

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Login realizado com sucesso!",
          visibilityTime: 1500,
          position: "top",
        });

        setTimeout(() => {
          setLoading(false);
          navegarParaHome();
        }, 1500);
      } else if (resposta.status === 404 || resposta.status === 401) {
        setLoading(false);
        Alert.alert("Erro", "Email e/ou senha incorretos!");
      } else {
        setLoading(false);
        Alert.alert(
          "Erro",
          dados.message || "Falha ao realizar login. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setLoading(false);

      let mensagemErro = "Ocorreu um erro inesperado. Tente novamente.";
      if (error instanceof Error) {
        if (error.message === "Network request failed") {
          mensagemErro =
            "Falha na conexão com o servidor. Verifique sua internet.";
        }
      }
      Alert.alert("Erro", mensagemErro);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FDD5E9"
        translucent={false}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>

          <Input
            label="Digite seu Email:"
            placeholder="email@gmail.com"
            onChange={setEmail}
            value={email}
          />
          <Input
            label="Digite sua Senha:"
            placeholder="*******"
            secureTextEntry
            value={senha}
            onChange={setSenha}
          />

          <View style={styles.ContainerRecPass}>
            <Link href="/recuperarSenha" style={styles.link}>
              Esqueceu a senha?
            </Link>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#FF3366" />
          ) : (
            <Button
              label="Continuar"
              onPress={continuarPressionado}
              disabled={loading}
            />
          )}

          <Text style={styles.textContainer}>
            Não tem uma conta?{" "}
            <Link href="/cadastro" style={styles.link}>
              Cadastre-se aqui
            </Link>
          </Text>

          <Text style={styles.termsText}>
            Ao criar uma conta, você concorda com a nossa{" "}
            <Text style={styles.link}>Política de privacidade</Text> e os nossos{" "}
            <Text style={styles.link}>Termos de uso</Text>.
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDD5E9",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 130,
    height: 90,
    marginBottom: 10,
  },
  textContainer: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "#FF3366",
    textDecorationLine: "underline",
  },
  ContainerRecPass: {
    marginBottom: 10,
  },
});
