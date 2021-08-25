import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import AdvanceSearch from './src/index.vue'

AdvanceSearch.install = (app: App): void => {
  app.component(AdvanceSearch.name, AdvanceSearch)
}

const _AdvanceSearch: SFCWithInstall<typeof AdvanceSearch> = AdvanceSearch
export default _AdvanceSearch
