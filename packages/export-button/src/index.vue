<template>
  <el-button @click="onClick">
    {{ text }}
  </el-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'CelExportButton',
  props: {
    requestData: {
      type: Function as PropType<(...args: any) => Promise<any>>,
      required: true,
      default: () =>
        new Promise((resolve) => {
          alert('请传入导出函数')
          return
        }),
    },
    updateData: {
      type: Function as PropType<(...args: any) => void>,
      required: false,
    },
    text: {
      type: String as PropType<string>,
      default: '导出',
    },
  },
  components: { ElButton },
  setup(props) {
    return {
      onClick: async () => {
        try {
          await props.requestData()
          if (props.updateData) {
            await props.updateData()
          }
        } catch (e) {
          console.log(e)
        }
      },
    }
  },
})
</script>
