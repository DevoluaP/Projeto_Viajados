import AsyncStorage from "@react-native-async-storage/async-storage";

const logout = async (navigation) => {
  try {
    await AsyncStorage.removeItem("userToken");

    navigation.reset({
      index: 0,
      routes: [{ name: "index" }],
    });
  } catch (error) {
    console.error("Erro ao fazer logout:", error);

    navigation.reset({
      index: 0,
      routes: [{ name: "index" }],
    });
  }
};

export default logout;
