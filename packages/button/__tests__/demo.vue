<template>
  <div>
    <div id="container" :class="$style.container">123</div>
    <el-button>123</el-button>
  </div>
</template>

<script lang="ts">
import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Demo',
  components: {
    ElButton,
  },
})
</script>
<style module lang="scss">
.container {
  background: red;
}
</style>
