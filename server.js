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
}

initMenu();


// //functions for initial prompt that starts the run thru the questions
function initMenu() {
  inquirer.prompt(
    {
      name: "menu",
      type: "list",
      message: "What would you like to do",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"]
    })

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
        //prompt for new name of department
        inquirer.prompt({
          name: "newDepartment",
          message: "New Department Name:",
          type: "input"
        })
          .then(async (answer) => {
            // console.log(answer.newDepartment)
            const newDept = `INSERT INTO department(name) VALUES ("${answer.newDepartment}");`;
            const myDept = await db.promise().query(newDept);
            console.log("your new department has been added");
            initMenu();
          })
      };

      //add a role
      async function addRole() {
        //prompt for new title, salary, and choose department
        inquirer.prompt([
          {
            name: "newTitle",
            message: "New Title of Role:",
            type: "input"
          },
          {
            name: "Salary",
            message: "Salary per year:",
            type: "input"
          },
          {
            name: 'departmentChoice',
            type: 'list',
            choices: () => {
              return new Promise(async (resolve, reject) => {
                try {
                  const [rows] = await db.promise().query("SELECT name FROM department;");
                  const choiceArray = rows.map((row) => row.name);
                  resolve(choiceArray);
                } catch (error) {
                  reject(error);
                }
              });
            },
            message: 'Select Department for New Title:'
          }
        ])
          .then(async (answer) => {
            // Fetch the department ID from the database
            const fetchDepartmentIdQuery = `SELECT id FROM department WHERE name = "${answer.departmentChoice}"`;
            const [rows] = await db.promise().query(fetchDepartmentIdQuery);
            const departmentID = rows[0].id;

            //insert id in Select Statement for new role
            const newRole = `INSERT INTO role (title, salary, departmentID) VALUES ("${answer.newTitle}", "${answer.Salary}", (SELECT id FROM department WHERE name = "${answer.departmentChoice}"))`;
            const myRole = await db.promise().query(newRole);
            console.log("your new role has been added");
            initMenu();
          })
      };

      //Add a New Employee

      async function addEmployee() {
        //prompt for each detail of employee (first_name, last_name, title and manager if there is one)
        inquirer.prompt([
          {
            name: "newFirstName",
            message: "First Name:",
            type: "input"
          },
          {
            name: "newLastName",
            message: "Last Name:",
            type: "input"
          },
          {
            name: "RoleChoice",
            type: "list",
            choices: () => {
              return new Promise(async (resolve, reject) => {
                try {
                  const [rows] = await db.promise().query("SELECT title FROM role;");
                  const choiceArray = rows.map((row) => row.title);
                  resolve(choiceArray);
                } catch (error) {
                  reject(error);
                }
              });
            },
            message: 'Select Role for New Emmployee:'
          },
          {
            name: "managerChoice",
            type: "list",
            choices: async () => {
              try {
                const [rows0] = await db.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE roleID IN (SELECT id FROM role WHERE title = 'Manager');");
                const choiceArray = rows0.map((row) => row.manager);
                choiceArray.push("None"); // Add "None" option if the employee doesn't have a manager
                return choiceArray;
              } catch (error) {
                console.error(error);
                return [];
              }
            },
            message: "Select Manager or None for New Employee:"
          }
        ])
          //then for each detail of employee (first_name, last_name, title and manager))
          .then(async (answer) => {

            // Fetch the role ID from the database
            const fetchRoleIdQuery = `SELECT id FROM role WHERE title = "${answer.RoleChoice}"`;
            const [rows1] = await db.promise().query(fetchRoleIdQuery);
            const roleID = rows1[0].id;

            // Fetch the manager ID from the database defined by role
            const fetchManagerIdQuery = `SELECT id FROM employee WHERE managerID = "${answer.managerChoice}"`;
            const [rows2] = await db.promise().query(fetchManagerIdQuery);
            const mymanagerID = rows2[0].id;

            //insert name, role, id in Select Statement for new employee
            const newEmployee = `INSERT INTO role (first_name, last_name, roleID, managerID) VALUES ("${answer.newFirstName}", "${answer.newLastName}", 
            (SELECT id FROM role WHERE title = "${answer.roleChoice}"), (SELECT id FROM manager WHERE name = "${answer.managerChoice}") )`;

            //create new employee
            const myEmployee = await db.promise().query(newEmployee);
            console.log("your new employee has been added");
            










            initMenu();

          })


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

// initMenu();
