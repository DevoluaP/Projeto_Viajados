require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const porta = process.env.PORT || 3000;

const cadastro = require("./routes/cadastro");
const login = require("./routes/login");
const alterarSenha = require("./routes/alterarSenha");
const hoteis = require("./routes/hoteis");
const voos = require("./routes/voos");
const favoritos = require("./routes/favoritos");
const alterarDados = require("./routes/alterarDados");
const verificarToken = require("./middlewares/verificarToken");
const salvarimagem = require("./routes/salvar-imagem")
const reservas = require("./routes/reservas")

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.use("/cadastro", cadastro);
app.use("/login", login);
app.use("/alterarsenha", alterarSenha);

app.use(verificarToken);

app.use("/hoteis", hoteis);
app.use("/voos", voos);
app.use("/favoritos", favoritos);
app.use("/alterardados", alterarDados);
app.use("/salvar-imagem", salvarimagem);
app.use("/reservas", reservas);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});