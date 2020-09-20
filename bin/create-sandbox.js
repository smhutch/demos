#!/usr/bin/env node

const path = require("path")
const fs = require("fs")
const inquirer = require("inquirer")
const ncp = require("ncp")

const demoDir = path.join(__dirname, "../sandboxes")
const templateDir = path.join(__dirname, "../templates")
const demos = fs.readdirSync(demoDir)
const templates = fs.readdirSync(templateDir)

var questions = [
  {
    type: "list",
    name: "template",
    message: "What project template would you like to generate?",
    choices: templates,
  },
  {
    type: "input",
    name: "name",
    message: "Demo name",
    validate: function (string) {
      if (string === "") {
        return "Please input a name"
      }

      if (demos.includes(string)) {
        return `${string} already exists. Please choose another name.`
      }

      return true
    },
  },
]

inquirer.prompt(questions).then(({ template, name }) => {
  const templatePath = path.join(templateDir, template)
  const outPath = path.join(__dirname, "../sandboxes", name)

  ncp(templatePath, outPath, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log(`Created ${outPath}`)
  })

  // TODO: automatic variable replacement.
})
