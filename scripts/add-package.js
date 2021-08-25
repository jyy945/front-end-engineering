const yargs = require('yargs')
const render = require('json-templater/string')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const Project = require('@lerna/project')
const getTemplate = require('./templates.js')
const { recreateEntry } = require('./recreate-entry')

const projects = Project.getPackagesSync()
const args = yargs.argv._

if (args.length === 0) {
  console.log(chalk.red('Fail: create package fail, please input a package name!'))
  return
}
if (projects.findIndex((proj) => proj.name === '@checc/' + args[0]) !== -1) {
  console.log(
    chalk.red('Fail: The current project already contains the package. Please rename it!')
  )
  return
}
const packageDir = path.resolve(__dirname, '../packages/' + args[0])
fs.mkdirSync(packageDir)
fs.mkdirSync(path.resolve(packageDir, '__tests__'))
fs.mkdirSync(path.resolve(packageDir, 'src'))

const templates = getTemplate(packageDir, args[0])
templates.forEach((tmp) => {
  let tmp_str = render(tmp.template, tmp.params)
  fs.writeFileSync(tmp.path, tmp_str)
})
recreateEntry()
