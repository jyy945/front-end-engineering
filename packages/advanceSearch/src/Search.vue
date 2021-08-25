<template>
  <div :class="$style.search">
    <el-input
      v-model="inputValue"
      :placeholder="placeholderId || t('placeholder.input')"
      suffix-icon="el-icon-arrow-down"
      clearable
    >
    </el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { ElInput } from 'element-plus'
import { t } from '@/locale'
export default defineComponent({
  components: { ElInput },
  emits: ['on-search'],
  props: {
    placeholderId: {
      type: String as PropType<string>,
    },
  },
  setup() {
    const inputValue = ref(null)
    return {
      inputValue,
      t,
    }
  },
})
</script>

<style module lang="scss">
.search {
  .el-button {
    margin-left: 5px;
  }
  :global(.el-input-group__append) {
    padding-left: 0;
  }
}
</style>
