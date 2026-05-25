const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql-db",
  user: "root",
  password: "password",
  database: "pokemon_db"
});

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = connection;