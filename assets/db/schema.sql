DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  -- create numeric column id --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- create name column --
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  salary DECIMAL(7, 2) NOT NULL,
  SELECT
    department.department_id,
  FROM
    department
    LEFT JOIN department.department_id
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager VARCHAR(30),
  SELECT
    role.role_id,
  FROM
    role
    LEFT JOIN role.role_id,
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
);

INSERT INTO
  department_name;

INSERT INTO
  role_name;

INSERT INTO
  employee;

UPDATE
  employee (
    SET
      [FROM role VALUE],
    WHERE
      role
  );