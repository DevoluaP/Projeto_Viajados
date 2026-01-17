const deletar = async (usuarioId, token, navigation) => {
  try {
    const baseURL = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(
      `${baseURL}/alterardados/excluir?idUsuario=${usuarioId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();

    if (response.ok) {
      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      });
    } else {
      console.error("Erro ao deletar conta:", data);
    }
  } catch (error) {
    console.error("Erro ao deletar conta:", error);

    navigation.reset({
      index: 0,
      routes: [{ name: "index" }],
    });
  }
};

export default deletar;
