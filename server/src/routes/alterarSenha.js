const express = require("express");
const db = require("../db/conn.js");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/verificar-email", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "O campo e-mail é obrigatório." });
  }

  try {
    const [user] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    return res.status(200).send({ message: "E-mail encontrado!", exists: true });
  } catch (err) {
    console.error("Erro ao verificar e-mail:", err);
    return res.status(500).send({ error: "Erro ao verificar e-mail." });
  }
});

router.post("/alterar", async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).send({ error: "E-mail e nova senha são obrigatórios." });
  }

  try {
    const [user] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE usuario SET senha = ? WHERE email = ?",
      [hashedPassword, email]
    );

    return res.status(200).send({ message: "Senha atualizada com sucesso." });
  } catch (err) {
    console.error("Erro ao alterar a senha:", err);
    return res.status(500).send({ error: "Erro ao alterar a senha." });
  }
});

module.exports = router;