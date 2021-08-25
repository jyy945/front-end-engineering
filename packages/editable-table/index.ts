import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import EditableTable from './src/index.vue'

EditableTable.install = (app: App): void => {
  app.component(EditableTable.name, EditableTable)
}

const _EditableTable: SFCWithInstall<typeof EditableTable> = EditableTable
export default _EditableTable
