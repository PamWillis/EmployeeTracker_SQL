const mysql = require('mysql2');

var employeeTracker_db = require('mysql2-promise')();

employeeTracker_db.configure({
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // TODO: Add MySQL password here
  password: 'pw37,R2!',
  database: 'employeeTracker_db'
},
  console.log(`Connected to the employee_tracker database.`)
);

