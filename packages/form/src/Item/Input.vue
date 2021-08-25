<template>
  <el-input
    v-model="form[item.key]"
    :placeholder="placeholder"
    :style="style"
    :disabled="itemDisabled"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import usePlaceholder from '@/hooks/usePlaceholder'
import useDisabled from '../hooks/useDisabled'
import { FormItem } from '@/types/form'
import { ElInput } from 'element-plus'
export default defineComponent({
  components: { ElInput },
  emits: {
    'update:form': null,
  },
  props: {
    item: {
      type: Object as PropType<FormItem>,
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
    width: {
      type: Number,
    },
  },
  setup(props) {
    const placeholder = usePlaceholder(props.item, 'placeholder.input')
    const itemDisabled = useDisabled(props.disabled, props.item.disabled)
    return {
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
      itemDisabled,
      placeholder,
    }
  },
})
</script>
