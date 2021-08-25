import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import ExportButton from './src/index.vue'

ExportButton.install = (app: App): void => {
  app.component(ExportButton.name, ExportButton)
}

const _ExportButton: SFCWithInstall<typeof ExportButton> = ExportButton
export default _ExportButton