DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  departmentID INT UNSIGNED NOT NULL,
  INDEX dep_ind (departmentID),
  PRIMARY KEY (roleID), 
  CONSTRAINT fk_departmentRole 
  FOREIGN KEY (departmentID) 
  REFERENCES department(departmentID) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roleID INT UNSIGNED NOT NULL,
  CONSTRAINT FK_roleEmployee 
  FOREIGN KEY (roleID) 
  REFERENCES role(roleID) ON DELETE CASCADE,
  managerID INT UNSIGNED,
  CONSTRAINT FK_managerEmployee 
  FOREIGN KEY (managerID) 
  REFERENCES employee(employeeID) ON DELETE SET NULL
);

-- CREATE INDEX idx_rolename
-- ON employee (role, roleID);

-- CREATE INDEX idx_managername
-- ON employee (managerID);



