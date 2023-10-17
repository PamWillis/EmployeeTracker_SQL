const inquirer = require(`inquirer`);
// const db = require("./assets/db/index.js");
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
        case "Would you like to continue":
          continueorEnd();
          break;
        case "quit":
          quit();
      }


      //view departments
      async function viewDepartments() {
        // CREATE VIEW dept_view AS 
        const sql = 'SELECT * FROM department';
        const result = await db.promise().query(sql);
        console.table(result);

        initMenu();
      };

    //   //view roles
    //   async function viewRoles() {
    //     const sql = 'SELECT * FROM role';
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     initMenu();
    //   };

    //   //view employees
    //   async function viewEmployees() {
    //     const sql = 'SELECT * FROM employees';
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     initMenu();
    //   };

    //   //view role
    //   async function viewRoles() {
    //     const sql = 'INSERT INTO department';
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     initMenu();
    //   };

    //   //add a role
    //   async function addRole() {
    //     const sql = 'INSERT INTO role';
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     initMenu();
    //   };

    //   //add a employee
    //   async function addEmployee() {
    //     const sql =
    //       'INSERT INTO employee VALUES (first_name, last_name, title, department, salary, manager';
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     initMenu();
    //   };

    //   //update a employee role     
    //   async function updateEmployeeRole() {
    //     const sql =
    //       'UPDATE table_employee SET role WHERE role';
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     initMenu();
    //   };

    //   // end     
    //   async function quit() {
    //     const result = await db.promise().query(sql);
    //     console.log(result);
    //     return results = "Ending Employee Tracker, enjoy your day"
    //   };
    // });
  })};
  initMenu();
