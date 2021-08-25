const yargs = require('yargs')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const uppercamelcase = require('uppercamelcase')
const { recreateEntry } = require('./recreate-entry')

const args = yargs.argv._
const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages/'))
  .filter((pck) => pck !== 'index.ts')
if (args.length === 0 || packages.findIndex((pck) => pck === args[0]) === -1) {
  console.log(chalk.red('Fail: Package not found in current project!'))
  return
}

try {
  fs.unlinkSync(path.resolve(__dirname, '../stories', uppercamelcase(args[0]) + '.stories.ts'))
} catch (e) {
  console.log(e)
}
delDir(path.resolve(__dirname, '../packages', args[0]))
recreateEntry()

function delDir(path) {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file, index) => {
      let curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath) //递归删除文件夹
      } else {
        fs.unlinkSync(curPath) //删除文件
      }
    })
    fs.rmdirSync(path)
  }
}
