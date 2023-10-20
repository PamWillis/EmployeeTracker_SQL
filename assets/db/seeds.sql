INSERT INTO department(name)
VALUES
    ("Engineering"),
    ( "Finance"),
    ("Legal"),
    ( "Sales"),
    ("Manager");
    

INSERT INTO role(title, salary, departmentID)
    VALUES  ("Manager", 99000, 5),
    ("Sales Lead", 80000, 4);

    INSERT INTO employee(first_name, last_name, roleID, managerID)
    VALUES  ("Frank", "Kane", 2, NULL),
    ("Pam", "Willis", 1, NULL);