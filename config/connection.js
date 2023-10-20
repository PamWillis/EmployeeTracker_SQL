const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  // Your username
  user: "root",
  // Your password
  password: "PamPress345!",
  database: "employeeTracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;