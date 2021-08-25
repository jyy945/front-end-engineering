const fs = require('fs')
const path = require('path')

fs.copyFileSync(
  path.resolve(__dirname, '../types/vue-shim.d.ts'),
  path.resolve(__dirname, '../lib/checc-element-plus.d.ts')
)
