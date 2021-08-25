<template>
  <el-date-picker
    v-model="form[item.key]"
    :type="item.dateType"
    :placeholder="placeholder"
    :style="style"
    :disabled="itemDisabled"
    @change="change"
  ></el-date-picker>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import useDisabled from '../hooks/useDisabled'
import dayjs from 'dayjs'
import { DatePick } from '@/types/form'
import { ElDatePicker } from 'element-plus'
import usePlaceholder from '@/hooks/usePlaceholder'

export default defineComponent({
  components: { ElDatePicker },
  props: {
    item: {
      type: Object as PropType<DatePick>,
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
    const placeholder = usePlaceholder(props.item, 'placeholder.select')
    const { form, item } = toRefs(props)
    const change = (value: Date) => {
      if (value) {
        form.value[item.value.key] = dayjs(value).format(item.value.formate)
      }
    }
    const itemDisabled = useDisabled(props.disabled, props.item.disabled)
    return {
      placeholder,
      change,
      itemDisabled,
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
    }
  },
})
</script>
