import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import Confirm from './src/index.vue'

Confirm.install = (app: App): void => {
  app.component(Confirm.name, Confirm)
}

const _Confirm: SFCWithInstall<typeof Confirm> = Confirm
export default _Confirm