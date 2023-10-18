const inquirer = require(`inquirer`);

const logo = require('asciiart-logo');
// const connection = require("./config/connection.js")
const mysql = require("mysql2");
const db = require("./config/connection");




// create logo to display
function init() {
  const logoText = logo({
    name: "Company Employee Manager"
  }).render();

  console.log(logoText);

  //starts prompts
  loadMainPrompts();
}


// //functions for prompts
function initMenu() {
  inquirer.prompt([
    {
      name: "menu",
      type: "list",
      message: "What would you like to do",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"]
    },

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
        case "quit":
          quit();
      }


      //view departments
      async function viewDepartments() {
        const allDept = "SELECT department.name FROM department;"
        const [rows] = await db.promise().query(allDept);
        // const text = JSON.parse(rows);
        console.table(rows);
        initMenu();
      };

      //view roles
      async function viewRoles() {
        const allRoles = 'SELECT role.title FROM role;';
        const [rows] = await db.promise().query(allRoles);
        console.table(rows);
        initMenu();
      };

      //view employees
      async function viewEmployees() {
        const allEmploy = 'SELECT employee.first_name, employee.last_name FROM employee;';
        const [rows] = await db.promise().query(allEmploy);
        console.table(rows);
        initMenu();
      };

      //add a department
      async function addDepartment() {
        //need a prompt for new name of department
        inquirer.prompt({
          name: "newDepartment",
          message: "Name of new department?",
          type: "input"
      })
      .then(async (answer) => {
        console.log(answer.newDepartment)
        const newDept = `INSERT INTO department(name) VALUES ("${answer.newDepartment}");`;
        const mydept = await db.promise().query(newDept);
        console.log("your department has been added");
        initMenu();
      })
      };

      //add a role
      async function addRole() {
        // need a prompt for new role title
        const newrole = 'INSERT INTO role(title) VALUES [?];';
        const [rows] = await db.promise().query(newDept);
        console.table(rows);
        initMenu();
      };

      //add a employee
      async function addEmployee() {
        //need a prompt for new employee first_name,last_name and salary choices for title, department and manager
        const newEmp =
          'INSERT INTO employee(first_name, last_name, title, department, salary, manager)  VALUES [?];';
        const [row] = await db.promise().query(newEmp);
        console.table(row);
        initMenu();
      };

      //   //update a employee role     
      async function updateEmployeeRole() {
        const chgRole =
          'UPDATE employee SET role.id WHERE id IS [?];';
        const [row] = await db.promise().query(chgRole);
        console.table(row);
        initMenu();
      };

      // end     
      async function quit() {
       
        console.log("Ending Employee Tracker, enjoy your day");
        process.exit() 
      };
    });
};

initMenu();
