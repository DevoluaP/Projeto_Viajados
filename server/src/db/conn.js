require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 30,
    connectTimeout: 10000,
    queueLimit: 0,
});

async function testarConexao() {
    try {
        console.log('🔄 Tentando conectar ao banco de dados...');
        const conexao = await pool.getConnection();
        const [rows] = await conexao.query('SELECT 1');
        conexao.release();
        console.log('✅ Conexão bem-sucedida!', rows);
    } catch (err) {
        console.error('❌ Erro ao conectar ao banco de dados:');
        console.error('Código:', err.code);
        console.error('Mensagem:', err.sqlMessage || err.message);
        console.error('Detalhes:', err);
    }
}
testarConexao();

module.exports = pool;