const inquirer = require(`inquirer`);
const fs = require('fs');
const mysql = require('mysql2');
const connections = require('/connections.js')




// This will initiate the prompts function

function initMenu() {
    inquirer.prompt([
        {
            name: "menu",
            type: "list",
            message: "What would you like to do",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
        },
        {
            name: "continues",
            type: "list",
            message: "Would you like to continue",
            choices: ["continue", "quit"]
        }
    ])
        .then((answers) => {
            switch (answers.menu) {
                case "view all departments":
                    viewDepartments();
                    break;
                case "view all roles":
                    viewRoles();
                    break;
                case "view all employees":
                    viewEmployees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
                case "update an employee role":
                    updateEmployeeRole();
                    break;
                case "Would you like to continue":
                    continueorEnd();
            }

            switch (answers.continue) {
                case "continue":
                    continues();
                    break;
                case "quit":
                    quits();

            }
        });
}

function viewDepartments() {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.department(result);
        startPrompt();
    });
};

function viewRoles() {
    const sql = 'SELECT * FROM role';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.role(result);
        startPrompt();
    });
};
function viewEmployees() {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.employee(result);
        startPrompt();
    });
};
function addDepartment() {
    const sql = 'INSERT INTO department';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.department(result);
        startPrompt();
    });
};
function addRole() {
    const sql = 'INSERT INTO role';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.role(result);
        startPrompt();
    });
};
function addEmployee() {
    const sql =
        'INSERT INTO employee VALUES (first_name, last_name, title, department, salary, manager';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.employee(result);
        startPrompt();
    });
};
function updateEmployeeRole() {
    const sql =
        'UPDATE table_employee SET role WHERE role';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        };
        console.employee(result);
        startPrompt();
    });
};
function continues() {
    db.query((err, results) => {
        if (err) {
            throw err;
        };
        startPrompt();
    });
};
function quit() {
    db.query((err, results) => {
        if (err) {
            throw err;
        };
        return "Ending Employee Tracker, enjoy your day"
    });
};




module.exports = answers;
