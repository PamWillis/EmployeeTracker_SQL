INSERT INTO department(name)
VALUES
    ("Engineering"),
    ( "Finance"),
    ("Legal"),
    ( "Sales");

INSERT INTO role(title, salary, departmentID)
    VALUES  ("Sales Lead", 80000, 4);

    INSERT INTO employee(first_name, last_name, roleID, managerID)
    VALUES  ("Pam", "Willis", 1, NULL);