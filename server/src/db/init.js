import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

await connection.query("CREATE DATABASE IF NOT EXISTS viajados");
await connection.query("USE viajados");

const sql = fs.readFileSync("./src/db/viajados.sql", "utf8");
await connection.query(sql);

console.log("✅ Banco configurado com sucesso");
connection.end();
process.exit();