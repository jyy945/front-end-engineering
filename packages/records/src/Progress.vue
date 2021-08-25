<template>
  <el-progress :percentage="percent" />
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import { ElProgress } from 'element-plus'

export default defineComponent({
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  components: { ElProgress },
  setup(props) {
    const percent = ref<number>(0)

    onMounted(() => {
      if (props.value) {
        percent.value = props.value * 100
      }
    })
    return {
      percent,
    }
  },
})
</script>
