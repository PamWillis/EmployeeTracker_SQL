USE employeeTracker_db;


INSERT INTO department(name) VALUES ("Janitorial");
INSERT INTO role(title, salary) VALUES ("Legal", 45000);
INSERT INTO employee(first_name, last_name, managerID) VALUES ("fname", "lname", 2);
JOIN department.id ON role = department.roleID;
JOIN role.id ON employee = role.employeeID;
