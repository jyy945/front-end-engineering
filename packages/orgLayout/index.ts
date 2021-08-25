import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import OrgLayout from './src/index.vue'

OrgLayout.install = (app: App): void => {
  app.component(OrgLayout.name, OrgLayout)
}

const _OrgLayout: SFCWithInstall<typeof OrgLayout> = OrgLayout
export default _OrgLayout