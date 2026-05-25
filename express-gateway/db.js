const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "mysql-db",
  user: "root",
  password: "password",
  database: "pokemon_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Pool Created");

module.exports = pool;