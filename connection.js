const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'pw37,R2!',
      database: 'employeeTracker_db'
    },
    console.log(`Connected to the employee_tracker database.`)
  );

  module.exports = db;