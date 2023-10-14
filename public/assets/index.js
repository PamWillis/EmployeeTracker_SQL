const inquirer = require(`inquirer`);
const fs = require('fs');
const mysql = require('mysql2');
const connections = require('../public/connections.js')


init();

// This will initiate the prompts function
function init() {
    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            name: "view_departments",
            type: "list",
            message: "Please select a department: ",
            choices: ['FROM department VALUE']
        },

        {
            name: "view_roles",
            type: "list",
            message: "Please select a role: ",
            choices: ['FROM role VALUE']
        },

        {
            name: "view_employee",
            type: "text",
            message: "Add a employee name:",
            text: ['FROM employee VALUE']
        },


        {
            name: "add_department",
            type: "text",
            message: "Add a department name:",
            text: ['INSERT INTO department_name']
        },

        {
            name: "add_role",
            type: "text",
            message: "Add a role:",
            text: ['INSERT INTO role_name']
        },

        {
            name: "add_employee",
            type: "text",
            message: "Add an employee:",
            text: ['INSERT INTO employee_name']
        },

        {
            name: "update_employee_role",
            type: "text",
            message: "Change employee's role:",
            text: ['UPDATE employee, SET [FROM role VALUE] WHERE role']
        },


    ]).then(res => {
        let answers = answers;
        switch (answers) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "VIEW_ROLE":
                viewRole();
                break;
            case "ADD_ROLL":
                addRole();
                break;
            case "VIEW_EMPLOYEE":
                viewEmployee();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
        }
        })
}

function viewDepartments() {
    // query from db using the db object that you will import 
};
function addDepartment() {
    // query from db using the db object that you will import 
}
function viewRole() {
    // query from db using the db object that you will import 
};
function addRole() {
    // query from db using the db object that you will import 
}
function viewEmployee() {
    // query from db using the db object that you will import 
};
function addEmployee() {
    // query from db using the db object that you will import 
}
function updateEmployeeRole() {
    // query from db using the db object that you will import 
}



module.exports = answers;
