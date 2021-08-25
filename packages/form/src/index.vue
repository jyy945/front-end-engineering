<template>
  <el-form
    ref="nodeRef"
    :model="modelValue"
    :label-width="labelWidth"
    :inline="inline"
    :rules="rules"
  >
    <el-form-item
      v-for="item of items"
      :key="item.labelId"
      :label="item.label"
      :prop="item.key"
      :required="item.required"
      :error="item.error"
      :rules="handleRule(item)"
    >
      <component
        :is="`cmp-${item.type}`"
        v-model:form="modelValue"
        :item="item"
        :options="options"
        :disabled="disabled"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { map } from 'lodash'
import useValidate from '@/hooks/useValidate'
import { handleFormItems } from '@/utils/util'
import CmpInput from './Item/Input.vue'
import CmpSelect from './Item/Select.vue'
import CmpInputNumber from './Item/InputNUmber.vue'
import CmpDatePick from './Item/DatePick.vue'
import CmpUser from './Item/User/index.vue'
import CmpUpload from './Item/Upload/index.vue'
import CmpSelectOrg from './Item/SelectOrg.vue'
import CmpRadio from './Item/Radio.vue'
import { ElForm, ElFormItem } from 'element-plus'
import { FormItemKey, ObjectType } from '@/types/interfaces'
import { FormItem, FormItems, Options } from '@/types/form'
import { t } from '@/locale'

export default defineComponent({
  name: 'CelForm',
  components: {
    ElForm,
    ElFormItem,
    CmpInput,
    CmpSelect,
    CmpUser,
    CmpInputNumber,
    CmpDatePick,
    CmpUpload,
    CmpSelectOrg,
    CmpRadio,
  },
  emits: ['update:modelValue', 'update:nodeRef'],
  props: {
    modelValue: {
      type: Object as PropType<ObjectType>,
      required: true,
    },
    options: {
      type: Object as PropType<Options>,
      default: () => ({}),
    },
    formItems: {
      type: Array as PropType<FormItems>,
      required: true,
    },
    initValues: {
      type: Object as PropType<ObjectType>,
      default: () => ({}),
    },
    labelWidth: {
      type: String as PropType<string>,
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    initialValues: {
      type: Object as PropType<ObjectType>,
      default: () => ({}),
    },
    rules: {
      type: Object as PropType<
        Record<
          FormItemKey,
          Array<{
            required: boolean
            message: string
            validator?: (...args: any) => any
            trigger?: 'blur' | 'change'
          }>
        >
      >,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { nodeRef } = useValidate()
    const form = reactive({
      ...handleFormItems(props.formItems),
      ...props.initialValues,
    })

    const handleRule = (item: FormItem) => {
      if (!props.rules[item.key] && item.required) {
        return [
          {
            required: true,
            message: t('cel.required'),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error(t('cel.required')))
              }
            },
          },
        ]
      }
    }

    /* 初始化清除表单校验 */
    onMounted(() => {
      nodeRef.value?.resetFields()
    })

    const items = map(props.formItems, (item) => ({ ...item, label: item.labelId }))
    return {
      nodeRef,
      form,
      items,
      handleRule,
    }
  },
})
</script>
