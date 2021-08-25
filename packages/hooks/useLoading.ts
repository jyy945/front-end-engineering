import { ref } from 'vue'
import { ElLoading } from 'element-plus'

// 由于组件库为按需引入el，故el-loading组件无法全局安装，暂使用服务方式添加loading
export default (args?: Record<string, any>) => {
  const loadingRef = ref(null)
  let loading
  const openLoading = () => {
    loading = ElLoading.service({ ...args, target: loadingRef.value.$el })
  }
  const closeLoading = () => {
    loading && loading.close()
  }
  return {
    openLoading,
    closeLoading,
    loadingRef,
  }
}
