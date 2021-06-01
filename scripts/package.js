const yargs = require('yargs')
const lerna = require('lerna')
const args = yargs.argv._
lerna(['create', '@checc/' + args[0]])
