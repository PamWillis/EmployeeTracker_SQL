const connection = require("../../config/connection.js");
//db helper code

//create class to connect
class DB {
    constructor(connection) {
        this.connection = connection;
    }
}

//Find all the employees, join with roles and departments to display their roles, salaries, departments, and managers

//view departments
 function viewDepartments(department) {
    return this.connection.promise().query(
    "SELECT * department.name, department.id FROM department"
    );
}
//view all employees
function viewEmployees() {
    return this.connection.promise().query(
        "SELECT * employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager FROM employee"
    );
    }

//view roles
function viewRoles() {
    return this.connection.promise().query(
    "SELECT * role.title FROM role"
    );
}

//add a role
function addRoles() {
    return this.connection.promise().query("INSERT role.title WHERE ?", role)
}


//add an employee
function addEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee)
}

//update a employee role     
function updateEmployeeRole (employeeID, roleID) {
    return this.connection.promise().query(
    "UPDATE employee SET roleID WHERE employee.id = ?"
    );
}

//delete employee
function removeEmployee (employee) {
    return this.connection.promise().query(
    "DELETE FROM employee WHERE employee.id = ?"
    );
}

//end     
function quit () {
    return this.connection.promise().query(
    "Good Bye"
    );
}

module.exports = newDB(connection);


