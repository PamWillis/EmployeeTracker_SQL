const inquirer = require(`inquirer`);
const db = require("./db");
const logo = require('asciiart-logo');

init();

//create logo to display
function init() {
    const logoText = logo({
        name: "Company Employee Manager"
    }).render();

    console.log(logoText);

    //starts prompts
    loadMainPrompts();
}


//functions for prompts
function loadMainPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [

                {
                    name: "view all departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "view all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "view all roles",
                    value: "VIEW_ROLES"
                },

                {
                    name: "add a role",
                    value: "ADD_ROLES"
                },
                {
                    name: "add an employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "update an employee role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "delete an employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "quit",
                    value: "QUIT"
                },

            ]
        }
    ])
        .then(res => {
            let choice = res.choice;
            //call the proper function according to what is chosen
            switch (choice) {
                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    break;
                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    break;
                case "VIEW_ROLES":
                    viewRoles();
                    break;
                case "ADD_ROLES":
                    addRoles();
                    break;
                case "ADD_EMPLOYEE":
                    addEmployee();
                    break;
                case "UPDATE_EMPLOYEE_ROLE":
                    updateEmployeeRole();
                    break;
                case "QUIT":
                    quit();
                    break;
            }
        })
    // .catch(err => console.error(err));
}

//coming from db helper

//VIEW EMPLOYEES
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, department })({
                name: department,
                value: id
            }));
        });
}

//need to do more complicated ones, some had prompts ie Employee by manager

