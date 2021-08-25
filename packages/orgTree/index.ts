import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import OrgTree from './src/index.vue'

OrgTree.install = (app: App): void => {
  app.component(OrgTree.name, OrgTree)
}

const _OrgTree: SFCWithInstall<typeof OrgTree> = OrgTree
export default _OrgTree