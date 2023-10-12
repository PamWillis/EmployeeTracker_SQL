DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
    -- create numeric column id --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- create name column --
  name VARCHAR(30) NOT NULL
);

INSERT INTO
    department (id, name)
VALUES
    (1, "Engineering"),
    (2, "Finance"),
    (3, "Legal"),
    (4, "Sales");



