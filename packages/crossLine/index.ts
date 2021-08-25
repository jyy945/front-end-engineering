import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import CrossLine from './src/index.vue'

CrossLine.install = (app: App): void => {
  app.component(CrossLine.name, CrossLine)
}

const _CrossLine: SFCWithInstall<typeof CrossLine> = CrossLine
export default _CrossLine