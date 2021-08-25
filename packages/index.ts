import type { App } from 'vue'
import { use, i18n } from './locale'
import AdvanceSearch from './advanceSearch/index'
import Button from './button/index'
import Confirm from './confirm/index'
import CrossLine from './crossLine/index'
import EditableTable from './editable-table/index'
import ExportButton from './export-button/index'
import Form from './form/index'
import FormCreator from './form-creator/index'
import OrgLayout from './orgLayout/index'
import OrgTree from './orgTree/index'
import Records from './records/index'
import SelectTree from './select-tree/index'

export interface InstallOptions {
  locale?: any
  i18n?: (...args: any[]) => string
}

const locale = use
const components = [AdvanceSearch,Button,Confirm,CrossLine,EditableTable,ExportButton,Form,FormCreator,OrgLayout,OrgTree,Records,SelectTree]
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

export { AdvanceSearch,Button,Confirm,CrossLine,EditableTable,ExportButton,Form,FormCreator,OrgLayout,OrgTree,Records,SelectTree, locale }
export default {
  install,
}
