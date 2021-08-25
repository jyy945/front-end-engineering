<template>
  <div :class="$style.container">
    <el-button v-bind="props">{{ text }}</el-button>
    <div :class="$style.section">this is the container</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElButton } from 'element-plus'
import { IButtonProps } from '../../types'

export default defineComponent({
  name: 'CelButton',
  components: {
    ElButton,
  },
  props: {
    text: {
      type: String,
      default: '点击',
    },
    transProps: {
      type: Object as PropType<IButtonProps>,
    },
  },
})
</script>

<style module lang="scss">
.container {
  width: 400px;
  height: 300px;
  border: 1px solid black;
  .section {
    color: red;
  }
}
</style>
