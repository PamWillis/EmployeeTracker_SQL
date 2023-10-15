DROP DATABASE IF EXISTS employee_trackers_db;
CREATE DATABASE employee_trackers_db;
USE employee_trackers_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL,
  salary DECIMAL(7, 2) INT,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  manager VARCHAR(30),
  manager_id IN AUTO_INCREMENT PRIMARY KEY
);

