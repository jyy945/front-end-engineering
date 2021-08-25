import { onMounted, ref, inject } from 'vue'
import { Ref } from '@vue/reactivity'

interface NodeRef {
  nodeRef: Ref<Record<string, any> | null>
}

export default (): NodeRef => {
  const nodeRef = ref<Record<string, any> | null>(null)
  const addValidate = inject<any>('AddValidate')
  onMounted(() => {
    if (!addValidate) return
    const validate = (): Promise<boolean> =>
      new Promise((resolve, reject) => {
        nodeRef.value
          ?.validate()
          .then(() => resolve(true))
          .catch(() => reject(false))
      })
    addValidate(validate)
  })
  return {
    nodeRef,
  }
}
