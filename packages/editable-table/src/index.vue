<template>
  <div :class="$style['container']">
    <el-button-group v-if="type !== EditType.REVIEW" :class="$style['btn-group']">
      <el-button size="small" icon="el-icon-circle-plus" @click="addRow">增行</el-button>
      <el-popconfirm icon="el-icon-info" title="确定删除所选信息？" @confirm="delRow">
        <template #reference>
          <el-button size="small" icon="el-icon-error">删行</el-button>
        </template>
      </el-popconfirm>
    </el-button-group>
    <div :class="$style['form-container']">
      <el-form ref="forms" label-width="0" :model="data.records">
        <el-table
          v-bind="$attrs"
          ref="loadingRef"
          :data="data.records"
          class="tableX"
          tooltip-effect="dark"
          style="width: 100%"
          height="280"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" fixed="left"></el-table-column>
          <el-table-column
            v-for="col in columns"
            :key="col.name"
            :label="col.label"
            :min-width="150"
            :prop="col.name"
          >
            <template #default="scope">
              <el-form-item :prop="col.name" v-bind="col.formItemProps">
                <el-input
                  v-if="col.type === FormItemType.INPUT"
                  v-model="scope.row[col.name]"
                  v-bind="col.elementProps"
                  size="small"
                  :disabled="type === EditType.REVIEW"
                ></el-input>
                <el-input-number
                  v-else-if="col.type === FormItemType.INPUT_NUMBER"
                  v-model="scope.row[col.name]"
                  v-bind="col.elementProps"
                  size="small"
                  :disabled="type === EditType.REVIEW"
                ></el-input-number>
                <el-select
                  v-else-if="col.type === FormItemType.SELECT"
                  v-model="scope.row[col.name]"
                  v-bind="col.elementProps"
                  size="small"
                  :disabled="type === EditType.REVIEW"
                >
                  <el-option
                    v-for="opt in col.options"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  >
                  </el-option>
                </el-select>
                <el-date-picker
                  v-else-if="col.type === FormItemType.DATE"
                  v-model="scope.row[col.name]"
                  size="small"
                  v-bind="col.elementProps"
                  :disabled="type === EditType.REVIEW"
                >
                </el-date-picker>
                <el-cascader
                  v-else-if="col.type === FormItemType.CASCADER"
                  v-model="scope.row[col.name]"
                  size="small"
                  v-bind="col.elementProps"
                  :disabled="type === EditType.REVIEW"
                ></el-cascader>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="type === EditType.EDIT"
            fixed="right"
            label="操作"
            align="center"
            width="100"
          >
            <template #default="{ row }">
              <el-button v-if="row.id === undefined" type="text" @click.prevent="saveRow(row)"
                >保存</el-button
              >
              <el-button v-if="row.id !== undefined" type="text" @click.prevent="updateRow(row)"
                >更新</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div :style="{ textAlign: 'center' }" :class="$style['page-container']">
        <el-pagination
          :page-size="page.pageSize"
          background
          :current-page="page.current"
          layout="total, prev, pager, next"
          :total="page.total"
          @current-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import {
  ElButtonGroup,
  ElButton,
  ElPagination,
  ElPopconfirm,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElDatePicker,
  ElCascader,
  ElOption,
} from 'element-plus'
import { FormItemType, EditType, Column, Data, OperateType, PropsType } from '@/types'
import usePage from '../hooks/usePage'
import useOperate from '@/editable-table/hooks/useOperate'
import useLoading from '@/hooks/useLoading'

export default defineComponent({
  name: 'CelEditableTable',
  components: {
    ElButtonGroup,
    ElButton,
    ElPagination,
    ElPopconfirm,
    ElTable,
    ElTableColumn,
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElSelect,
    ElDatePicker,
    ElCascader,
    ElOption,
  },
  props: {
    type: {
      type: Number as PropType<EditType>,
      default: EditType.ADD,
    },
    operate: {
      type: Object as PropType<OperateType>,
      required: true,
    },
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },
  },
  setup(props: PropsType) {
    // 已选择的数据行，用于批量删除和高亮显示
    let selectedRows = reactive<Record<string, Data[]>>({ records: [] })
    const data = reactive<Record<string, Data[]>>({
      records: [],
    })
    // loading相关
    const { openLoading, closeLoading, loadingRef } = useLoading()
    // 分页相关
    const { page, pageChange } = usePage(props.operate.get, data, openLoading, closeLoading)
    // 操作相关
    const { saveRow, delRow, updateRow } = useOperate(
      props.columns,
      data,
      selectedRows,
      props.operate,
      pageChange
    )

    // 增加一行
    const addRow = () => {
      // 获取所有的键名
      const columnKeys: string[] = props.columns.map(
        (item: Record<string, any>): string => item.name
      )
      // 为新一行数据初始化
      const temp: { [p: string]: string } = columnKeys.reduce(
        (rst, key) => ({ ...rst, [key]: '' }),
        {}
      )
      data.records.unshift(<Data>temp)
    }

    // 选择行后触发事件
    const handleSelectionChange = (selectedData: Data[]) => {
      selectedRows.records = selectedData
    }

    onMounted(async () => {
      await pageChange(1)
    })

    return {
      // data
      data,
      page,
      FormItemType,
      EditType,
      selectedRows,
      loadingRef,
      // methods
      pageChange,
      addRow,
      saveRow,
      delRow,
      updateRow,
      handleSelectionChange,
    }
  },
})
</script>

<style lang="scss" module>
.container {
  padding: 5px 0;
  .btn-group {
    margin-bottom: 5px;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    .page-container {
      flex: 0 32px;
    }
  }
}
</style>
