<template>
  <el-input-number
    v-model="form[item.key]"
    :placeholder="placeholder"
    :style="style"
    controls-position="right"
    :min="item.min"
    :disabled="itemDisabled"
    :precision="item.precision"
    :step="item.step"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useDisabled from '../hooks/useDisabled'
import { InputNumber } from '@/types/form'
import { ElInputNumber } from 'element-plus'
import usePlaceholder from '@/hooks/usePlaceholder'

export default defineComponent({
  components: { ElInputNumber },
  props: {
    item: {
      type: Object as PropType<InputNumber>,
      required: true,
    },
    form: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const placeholder = usePlaceholder(props.item, 'placeholder.input')
    const itemDisabled = useDisabled(props.disabled, props.item.disabled)
    return {
      itemDisabled,
      placeholder,
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
    }
  },
})
</script>
