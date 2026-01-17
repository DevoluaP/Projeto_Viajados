import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Button from "../components/Button";
import Input from "../components/Input";

export default function AlterarSenha() {
  const navigation = useNavigation();
  const route = useRoute();
  const email = (route.params as { email: string }).email;

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const alterarSenha = async () => {
    if (!novaSenha.trim() || novaSenha.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const baseURL = process.env.EXPO_PUBLIC_API_URL;
      const resposta = await fetch(
        `${baseURL}/alterarsenha/alterar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword: novaSenha,
          }),
        }
      );

      const dados = await resposta.json();

      if (resposta.status === 200) {
        Alert.alert("Sucesso!", "Senha alterada com sucesso!", [
          {
            text: "OK",
            onPress: () => (navigation as any).navigate("index"),
          },
        ]);
      } else {
        Alert.alert("Erro", dados.error || "Erro ao alterar senha.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.titulo}>Alterar Senha</Text>
        <Text style={styles.descricao}>
          Defina sua nova senha para a conta: {email}
        </Text>

        <Input
          label="Nova senha:"
          placeholder="••••••••"
          value={novaSenha}
          onChange={setNovaSenha}
          secureTextEntry
        />

        <Input
          label="Confirmar senha:"
          placeholder="••••••••"
          value={confirmarSenha}
          onChange={setConfirmarSenha}
          secureTextEntry
        />

        <Button label="Alterar Senha" onPress={alterarSenha} />
      </View>
    </TouchableWithoutFeedback>
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
  containerLogo: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 130,
    height: 90,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D6005D",
    marginBottom: 20,
  },
  descricao: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
});
