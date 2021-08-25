<template>
  <el-radio-group v-model="form[item.key]" :style="style" :disabled="itemDisabled">
    <el-radio
      v-for="{ itemText, itemValue } of options[item.key]"
      :key="itemValue"
      :label="itemValue"
      >{{ itemText }}</el-radio
    >
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useDisabled from '../hooks/useDisabled'
import { FormItemKey } from '@/types/interfaces'
import { FormItem, Option } from '@/types/form'
import { ElRadio, ElRadioGroup } from 'element-plus'

export default defineComponent({
  components: { ElRadio, ElRadioGroup },
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
    options: {
      type: Object as PropType<Record<FormItemKey, Option[]>>,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const itemDisabled = useDisabled(props.disabled, props.item.disabled)
    return {
      itemDisabled,
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
    }
  },
})
</script>
