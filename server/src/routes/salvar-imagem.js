const express = require('express');
const db = require("../db/conn");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { foto_usuario, idUsuario } = req.body;
    if (!idUsuario) {
      return res.status(400).json({ mensagem: 'idUsuario é necessário.'});
    }

    const verificarUsuarioQuery = 'SELECT * FROM usuario WHERE idUsuario = ?';
    const [usuario] = await db.query(verificarUsuarioQuery, [idUsuario]);
    if (usuario.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.'});
    }

    if (foto_usuario) {
      let base64Data = foto_usuario;
      if (base64Data.startsWith('data:image')) {
        base64Data = base64Data.replace(/^data:image\/\w+;base64,/, "");
      }

      const imageBuffer = Buffer.from(base64Data, 'base64');

      const updateQuery = 'UPDATE usuario SET foto_usuario = ? WHERE idUsuario = ?';
      await db.query(updateQuery, [imageBuffer, idUsuario]);
    } else {
      const updateQuery = 'UPDATE usuario SET foto_usuario = NULL WHERE idUsuario = ?';
      await db.query(updateQuery, [idUsuario]);
    }

    res.status(200).json({ mensagem: 'Foto do usuário cadastrada com sucesso!'});
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor'});
  }
});

module.exports = router;