const connection = require("../config/connection");
//db helper code

//create class to connect
class DB {
    constructor(connection) {
        this.connection = connection;
    }
}

//Find all the employees, join with roles and departments to display their roles, salaries, departments, and managers

//view departments
 viewDepartments(department) {
    return this.connection.promise().query(
    "SELECT * department.name, department.id FROM department"
    );
}
//view all employees
viewEmployees() {
    return this.connection.promise().query(
        "SELECT * employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager FROM employee"
    );
    }

//view roles
viewRoles() {
    return this.connection.promise().query(
    "SELECT * role.title FROM role"
    );
}

//add a role
addRoles() {
    return this.connection.promise().query("INSERT role.title WHERE ?", role)
}


//add an employee
addEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee)
}

//update a employee role     
updateEmployeeRole (employeeID, roleID) {
    return this.connection.promise().query(
    "UPDATE employee SET roleID WHERE employee.id = ?"
    );
}

//delete employee
removeEmployee (employee) {
    return this.connection.promise().query(
    "DELETE FROM employee WHERE employee.id = ?"
    );
}

//end     
quit () {
    return this.connection.promise().query(
    "Good Bye"
    );
}

module.exports = newDB(connection);


