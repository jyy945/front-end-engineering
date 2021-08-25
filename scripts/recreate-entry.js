const fs = require('fs')
const path = require('path')
const uppercamelcase = require('uppercamelcase')
const render = require('json-templater/string')

exports.recreateEntry = function () {
  const template = `import type { App } from 'vue'
import { use, i18n } from './locale'
{{import_info}}

export interface InstallOptions {
  locale?: any
  i18n?: (...args: any[]) => string
}

const locale = use
{{components_info}}
const install = (app: App, opt: InstallOptions): void => {
  if (opt && opt.locale) {
    locale(opt.locale)
  }
  if (opt && opt.i18n) {
    i18n(opt.i18n)
  }
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

{{export_info}}
export default {
  install,
}
`
  const packages = fs
    .readdirSync(path.resolve(__dirname, '../packages/'))
    .filter(
      (pck) =>
        pck !== 'index.ts' &&
        pck !== 'types' &&
        pck !== 'locale' &&
        pck !== 'utils' &&
        pck !== 'hooks'
    )
  const import_info = packages
    .map((item) => `import ${uppercamelcase(item)} from './${item}/index'`)
    .join('\n')
  const components_info = `const components = [${packages
    .map((item) => uppercamelcase(item))
    .join(',')}]`
  const export_info = `export { ${packages.map((item) => uppercamelcase(item)).join(',')}, locale }`
  const tmp_str = render(template, {
    import_info,
    components_info,
    export_info,
  })
  fs.writeFileSync(path.resolve(__dirname, '../packages/index.ts'), tmp_str)
}
