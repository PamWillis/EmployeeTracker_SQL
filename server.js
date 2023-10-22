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
  initMenu();



  //----------------------------------------------------------

  // //functions for prompt that starts the run thru the questions
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

        //--------------------------------------------------
        //view departments
        async function viewDepartments() {
          const allDept = "SELECT department.id AS id, department.name as Department FROM department;"
          const [rows] = await db.promise().query(allDept);
          console.table(rows);
          initMenu();
        };
        //--------------------------------------------------
        //view roles
        async function viewRoles() {
          const allRoles = 'SELECT role.title AS Title, role.id AS RoleID, department.name AS Department, role.salary AS Salary FROM role INNER JOIN department ON role.departmentID = department.id;';
          const [rows] = await db.promise().query(allRoles);
          console.table(rows);
          initMenu();
        };
        //--------------------------------------------------
        //view employees
        async function viewEmployees() {
          const allEmployees = `
        SELECT employee.id AS id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
          FROM employee INNER JOIN role ON employee.roleID = role.id 
          INNER JOIN department ON role.departmentID = department.id 
          LEFT JOIN employee AS manager ON employee.managerID = manager.id;
        `;
          const [rows] = await db.promise().query(allEmployees);
          console.table(rows);
          initMenu();
        };
        //----------------------------------------------------
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
        //---------------------------------------------------

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
              const fetchDepartmentIdQuery = `SELECT id FROM department WHERE name = '${answer.departmentChoice}'`;
              const [rows] = await db.promise().query(fetchDepartmentIdQuery);
              const departmentID = rows[0].id;

              // Prepare the INSERT statement with placeholders
              const insertRoleQuery = `INSERT INTO role (title, salary, departmentID) VALUES (?, ?, (SELECT id FROM department WHERE name = ?));`;

              // Define the parameter values for the new role
              const insertRoleParam = [answer.newTitle, answer.Salary, answer.departmentChoice];

              // Execute the INSERT statement with the parameter values
              const [row] = await db.promise().query(insertRoleQuery, insertRoleParam);

              console.log("your new role has been added");
              initMenu();
            })
        };
        //--------------------------------------------------
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
              name: "managerChoice", //create choice by selecting existing managers
              type: "list",
              choices: async () => {
                try {
                  const [data] = await db.promise().query(`SELECT * FROM employee`);
                  console.log("this is data", data)
                  const choiceArray = data.map((row) => { return { name: row.first_name + ' ' + row.last_name, value: row.id } });
                  console.log("this is choiceArray", choiceArray)
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
              console.log(answer.managerChoice)

              // Fetch the role ID from the database
              const fetchRoleIdQuery = `SELECT id FROM role WHERE title = "${answer.RoleChoice}"`;
              const [rows1] = await db.promise().query(fetchRoleIdQuery);
              const roleID = rows1[0].id;

              // Prepare the INSERT statement with placeholders
              const insertEmployeeQuery = `INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES (?, ?, ?, ?)`;

              // Define the parameter values for the new employee
              const insertEmployeeParams = [answer.newFirstName, answer.newLastName, roleID, answer.managerChoice];

              // Execute the INSERT statement with the parameter values
              const myEmployee = await db.promise().query(insertEmployeeQuery, insertEmployeeParams);
              console.log("your new employee has been added");

              initMenu();

            })
        };
        //------------------------------------------------

        //   //update a employee role  

        async function updateEmployeeRole() {
          //prompt to change Employee role)
          inquirer.prompt([
            {
              name: "employee",
              type: "list",
              choices: () => {
                return new Promise(async (resolve, reject) => {
                  try {
                    const [rows] = await db.promise().query("SELECT id, first_name, last_name FROM employee");
                    const choiceArray = rows.map((row) => ({
                      name: `${row.first_name} ${row.last_name}`,
                      value: row.id
                    }));
                    resolve(choiceArray);
                  } catch (error) {
                    reject(error);
                  }
                });
              },
              message: 'Select Employee:'
            },
            {
              name: "newRole",
              type: "list",
              choices: () => {
                return new Promise(async (resolve, reject) => {
                  try {
                    const [rows] = await db.promise().query("SELECT id, title FROM role");
                    const choiceArray = rows.map((row) => ({
                      name: `${row.title}`,
                      value: row.id
                    }));
                    resolve(choiceArray);
                  } catch (error) {
                    reject(error);
                  }
                });
              },
              message: 'Select New Role for Employee:'
            }
          ])

            //then for each detail of employee (first_name, last_name, title and manager))
            .then(async (answers) => {
              const employeeID = answers.employee;
              const roleID = answers.newRole;

              // Prepare the UPDATE statement with placeholders
              const updateRoleQuery = 'UPDATE employee SET roleID = ? WHERE id = ?';

              // Define the parameter values for the updated role
              const updateRoleParams = [roleID, employeeID];

              // Execute the UPDATE statement with the parameter values
              const [rows] = await db.promise().query(updateRoleQuery, updateRoleParams);
              console.log("The role for this employee has been updated");

              initMenu();
            })
        };
        //--------------------------------------------------------

        // end  allows to quit out of application   
        async function quit() {

          console.log("Ending Employee Tracker, enjoy your day");
          process.exit()
        }
      })
  }


};
init()