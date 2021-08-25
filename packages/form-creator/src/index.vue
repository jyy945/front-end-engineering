<template>
  <el-form ref="nodeRef" v-bind="formProps" :model="modelValue">
    <el-row v-for="(group, index) in formattedItems" :key="index" :gutter="20">
      <el-col
        v-for="(item, key) in group"
        :key="item.key"
        :xl="columnSpan"
        :lg="columnSpan"
        :md="12"
        :sm="24"
      >
        <el-form-item :key="item.key" :label="item.label" :prop="key" v-bind="item.formItemProps">
          <el-input
            v-if="item.type === FormItemType.INPUT"
            v-model="modelValue[key]"
            v-bind="item.elementProps"
            size="small"
          />
          <el-input-number
            v-else-if="item.type === FormItemType.INPUT_NUMBER"
            v-model="modelValue[key]"
            size="small"
            v-bind="item.elementProps"
          />
          <el-select
            v-else-if="item.type === FormItemType.SELECT"
            v-model="modelValue[key]"
            v-bind="item.elementProps"
            size="small"
          >
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            >
            </el-option>
          </el-select>
          <SelectTree
            v-else-if="item.type === FormItemType.SELECT_TREE"
            v-model="modelValue[key]"
            v-bind="item.elementProps"
            :input-value="item.inputValue"
            :tree-props="item.treeProps"
            :tree-data="item.treeData"
          />
          <el-date-picker
            v-else-if="item.type === FormItemType.DATE"
            v-model="modelValue[key]"
            size="small"
            v-bind="item.elementProps"
          >
          </el-date-picker>
          <el-cascader
            v-else-if="item.type === FormItemType.CASCADER"
            v-model="modelValue[key]"
            v-bind="item.elementProps"
            size="small"
          ></el-cascader>
          <!--          <FileUpload-->
          <!--            v-else-if="item.type === FormItemType.FILE"-->
          <!--            v-model="modelValue[key]"-->
          <!--            v-bind="item.elementProps"-->
          <!--          ></FileUpload>-->
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, computed } from 'vue'
import SelectTree from '@/select-tree/src/index.vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElDatePicker,
  ElInputNumber,
  ElCascader,
  ElRow,
  ElCol,
  ElOption,
} from 'element-plus'
import { FormCreatorPropType, ItemType, FormItemType } from '@/types'
import useValidate from '@/hooks/useValidate'
import { useDealColumns } from '@/form-creator/src/hooks'

export default defineComponent({
  name: 'CelFormCreator',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElDatePicker,
    ElInputNumber,
    ElCascader,
    SelectTree,
    ElRow,
    ElCol,
    ElOption,
  },
  props: {
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    items: {
      type: Object as PropType<Record<string, ItemType>>,
      required: true,
    },
    formProps: {
      type: Object as PropType<Record<string, any>>,
      default: (): Record<string, any> => ({}),
    },
    columnsPerRow: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  setup(props: FormCreatorPropType) {
    const { nodeRef } = useValidate()
    const formattedItems = computed((): Record<string, ItemType>[] => {
      return useDealColumns(props.columnsPerRow, props.items)
    })
    const columnSpan = computed((): number =>
      props.columnsPerRow < 5 ? 24 / props.columnsPerRow : 6
    )
    onMounted(() => {
      nodeRef && nodeRef.value.resetFields()
    })
    return {
      columnSpan,
      nodeRef,
      formattedItems,
      FormItemType,
    }
  },
})
</script>

<style scoped lang="scss"></style>
