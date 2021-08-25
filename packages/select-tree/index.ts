import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import SelectTree from './src/index.vue'

SelectTree.install = (app: App): void => {
  app.component(SelectTree.name, SelectTree)
}

const _SelectTree: SFCWithInstall<typeof SelectTree> = SelectTree
export default _SelectTree
