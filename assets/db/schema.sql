DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
    -- create numeric column id --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- create name column --
  name VARCHAR(30) NOT NULL
);





