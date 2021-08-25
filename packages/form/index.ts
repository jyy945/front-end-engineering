import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import Form from './src/index.vue'
import { ElInfiniteScroll } from 'element-plus'
Form.use(ElInfiniteScroll)
Form.install = (app: App): void => {
  app.use(ElInfiniteScroll)
  app.component(Form.name, Form)
}

const _Form: SFCWithInstall<typeof Form> = Form
export default _Form
