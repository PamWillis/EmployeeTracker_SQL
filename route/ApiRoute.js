const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const connections = require('../config/connection.js');

const PORT = process.env.PORT || 3001;
const app = express();
var uniqid = require("uniqid");

// post answers
app.post('/api/employeeTracker_db', ({ body }, res) => {
  const sql = (answer);
  const params = [body.department_name];

  db.query(params, (err, result) => {
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

// Read answers
app.get('/api/employeeTracker_db', (req, res) => {
  const sql = (answers);

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

// Delete answers
app.delete('/api/employeeTracker_db', (req, res) => {
  const sql = `DELETE name FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(params, (err, result) => {
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

// Read l
app.get('/api/employeeTracker_db', (req, res) => {
  db.query((err, rows) => {
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