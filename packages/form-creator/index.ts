import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import FormCreator from './src/index.vue'

FormCreator.install = (app: App): void => {
  app.component(FormCreator.name, FormCreator)
}

const _FormCreator: SFCWithInstall<typeof FormCreator> = FormCreator
export default _FormCreator
