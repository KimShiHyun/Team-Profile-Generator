const Manager = require("./lib/manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");

//to create command prompts from command line
const inquirer = require("inquirer");
// path for file to generate
const path = require("path");
// to write to file
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/temphtml");

const employees = [];

const manager = () =>
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the team manager's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the team manager's e-mail?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
      },
    ])
    .then((answers) => {
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employees.push(newManager);
      promptUser();
    });

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which role for your team member would you like to add?",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I don't want to add anymore team-members.",
        ],
      },
    ])

    .then((answers) => {
      if (answers.role == "I don't want to add anymore team-members.") {
        createTeamProfile();
      } else if (answers.role == "Manager") {
        manager();
      } else if (answers.role == "Engineer") {
        engineer();
      } else if (answers.role == "Intern") {
        intern();
      }
    });
};

const engineer = () =>
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's e-mail?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github username?",
      },
    ])
    .then((answers) => {
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employees.push(newEngineer);
      promptUser();
    });

const intern = () =>
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's e-mail?",
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school?",
      },
    ])
    .then((answers) => {
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employees.push(newIntern);
      promptUser();
    });

manager();

function createTeamProfile() {
  fs.writeFileSync(outputPath, render(employees));
  console.log(
    "Success! See your output folder for your new Team Profile html document."
  );
}
