const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "18.188.21.33",
  user: "POrous",
  password: "proyectooo",
  database: "tallerSolutionMax",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

module.exports = pool;