const inquirer = require(`inquirer`);
const fs = require('fs');
const mysql = require('mysql2');
const db = require("./config/connection");





initMenu();

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

//view departments
async function viewDepartments() {
    const sql = 'SELECT * FROM department';
    const results = await db.promise().query(sql);
    console.department(result);
    startPrompt();
};

//view roles
async function viewRoles() {
    const sql = 'SELECT * FROM role';
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

//view employees
async function viewEmployees() {
    const sql = 'SELECT * FROM employees';
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

//view role
async function viewRoles() {
    const sql = 'INSERT INTO department';
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

//add a role
async function addRole() {
    const sql = 'INSERT INTO role';
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

//add a employee
async function addEmployee() {
    const sql =
        'INSERT INTO employee VALUES (first_name, last_name, title, department, salary, manager';
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

//update a employee role     
async function updateEmployeeRole() {
    const sql =
        'UPDATE table_employee SET role WHERE role';
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

//to continue?     
async function continues() {
    const results = await db.promise().query(sql);
    console.role(result);
    startPrompt();
};

// end     
async function quits() {
    const results = await db.promise().query(sql);
    console.role(result);
    return results = "Ending Employee Tracker, enjoy your day"
};


