import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import Records from './src/index.vue'
import { ElLoading } from "element-plus";
Records.install = (app: App): void => {
  app.component(Records.name, Records)
}

const _Records: SFCWithInstall<typeof Records> = Records
export default _Records
