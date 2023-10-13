const inquirer = require(`inquirer`);
const fs = require('fs');
const mysql = require('mysql2');
const department = require('../assets/db/schema.sql')

// Create an array of questions for user input
const questions = [];

inquirer
    .prompt([
        {
        name: "department",
        type: "list",
        message: "Please select a department: ",
        choices: ['FROM department VALUE']  
        }
    ])

    // function to write questions
    const answers = await answers();
    inquirer.prompt(questions) 
    .then (answers => {
        console.log(answers);
    });

    module.exports = answers;
