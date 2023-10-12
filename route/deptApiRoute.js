const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const db = require('../connection.js');

const PORT = process.env.PORT || 3001;
const app = express();
var uniqid = require("uniqid");


//to make promises asynchronous example
// async function example1 () {
//     const mysql = require('mysql2/promise');
//     const conn = await mysql.createConnection({ database: test });
//     const [rows, fields] = await conn.execute('select ?+? as sum', [2, 2]);
//     await conn.end();
//   }

//   async function example2 () {
//     const mysql = require('mysql2/promise');
//     const pool = mysql.createPool({database: test});
//     // execute in parallel, next console.log in 3 seconds
//     await Promise.all([pool.query('select sleep(2)'), pool.query('select sleep(3)')]);
//     console.log('3 seconds after');
//     await pool.end();
//   }

// Connect to database


// Create a department
app.post('/api/employeeTracker', ({ body }, res) => {
  const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
  const params = [body.department_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Read all departments
app.get('/api/employeeTracker', (req, res) => {
  const sql = `SELECT id, department_name AS name FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete a dept_name
app.delete('/api/department_name/:id', (req, res) => {
  const sql = `DELETE name FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all Departments and associated department_name
app.get('/api/department_name', (req, res) => {
  const sql = `SELECT department AS department_id, department_name`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});


module.exports = app;