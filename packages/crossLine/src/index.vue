<template>
  <div :class="$style.cross_line">
    <span :class="$style.text" @click="$emit('update:visible', !visible)">
      {{ text }}
      <i :class="className"></i>
    </span>
    <hr />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CelCrossLine',
  emits: ['update:visible'],
  props: {
    text: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const className = computed(() => (props.visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'))
    return {
      className,
    }
  },
})
</script>

<style lang="scss" module>
.cross_line {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
  .text {
    padding: 8px 8px;
    background: #1890ff;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
  }
  hr {
    flex: 1;
    border: 1px solid #5bb0ff;
  }
}
</style>
