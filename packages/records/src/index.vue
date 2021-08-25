<template>
  <div :class="$style.table">
    <el-table
      ref="tableRef"
      border
      v-loading="loading"
      :data="dataSource"
      @sort-change="sortChange"
      @select="onSelect"
      @select-all="onSelect"
      @row-click="clickRow"
    >
      <!-- 多选 -->
      <el-table-column v-if="selection" type="selection" width="55" fixed />
      <!-- 序号 -->
      <el-table-column v-if="index" type="index" :label="t('cel.index')" fixed />
      <column v-for="column of columns" :key="column.key" :item="column" :options="options" />
      <!-- 操作列 -->
      <el-table-column
        v-if="$slots.operate"
        :label="$t('lang.operate.name')"
        fixed="right"
        :min-width="200"
        align="center"
      >
        <template #default="scope">
          <div class="operate">
            <slot :row="scope.row" name="operate" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      v-model:current-page="pagination.pageNum"
      :class="$style.pagination"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      background
      @current-change="changePage"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch, nextTick, onMounted } from 'vue'
// import { DataSource, Columns, Pagination } from './types'
import Column from './Column.vue'
import { intersectionBy, forEach, differenceBy } from 'lodash'
import { ObjectType } from '@/types/interfaces'
import { Options } from '@/types/form'
import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { Optional } from '@/types/util'
import { t } from '@/locale'
import { Columns, DataSource, Pagination } from "@/types";
// export * from './types'

type Sort = Optional<Pagination>

interface Order {
  order: 'ascending' | 'descending' | null
  prop: string
}

export default defineComponent({
  name: 'CelRecords',
  components: {
    Column,
    ElTable,
    ElTableColumn,
    ElPagination,
  },
  emits: {
    'change-page': null,
    'update:selectedRows': null,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    columns: {
      type: Array as PropType<Columns>,
      required: true,
    },
    dataSource: {
      type: Array as PropType<DataSource>,
      required: true,
    },
    pagination: {
      type: Object as PropType<Pagination>,
      required: true,
    },
    // 非必填
    index: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: Boolean,
      default: true,
    },
    selectedRows: {
      type: Array as PropType<ObjectType[]>,
      default: () => [],
    },
    defaultSelectedRows: {
      type: Array as PropType<ObjectType[]>,
      default: () => [],
    },
    options: {
      type: Object as PropType<Options>,
      default: () => ({}),
    },
    maxHeight: {
      type: Number,
      default: 500,
    },
    valuePath: {
      type: String,
      default: 'id',
    },
    sort: {
      type: Function as PropType<(obj: Sort) => Promise<ObjectType[]>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const tableRef = ref<ObjectType | null>(null)
    const toggleSelection = (selectedRows: ObjectType[], toggleStatus: boolean) =>
      forEach(selectedRows, (row) => tableRef?.value?.toggleRowSelection(row, toggleStatus))

    // 初始已选择行
    onMounted(() =>
      toggleSelection(intersectionBy(props.dataSource, props.selectedRows, props.valuePath), true)
    )
    // 监听数据发生变化
    watch(
      () => props.dataSource,
      () =>
        nextTick().then(() =>
          toggleSelection(
            intersectionBy(props.dataSource, props.selectedRows, props.valuePath),
            true
          )
        )
    )

    // 选择项发生变化
    watch(
      () => props.selectedRows,
      () =>
        toggleSelection(differenceBy(props.dataSource, props.selectedRows, props.valuePath), false)
    )

    // 多选,选择行
    const onSelect = (rows: ObjectType[]) => {
      const initRows = differenceBy(
        props.selectedRows,
        intersectionBy(props.dataSource, props.selectedRows, props.valuePath),
        props.valuePath
      )
      emit('update:selectedRows', [...initRows, ...rows])
    }
    /* 排序 */
    const sortChange = ({ order, prop }: Order) => {
      const types: Record<string, 'ASC' | 'DESC'> = {
        ascending: 'ASC',
        descending: 'DESC',
      }
      if (order) {
        props.sort({ orderType: types[order], orderBy: prop })
      }
    }
    // let loadingInstance
    // onMounted(() => {
    //   loadingInstance = ElLoading.Service({
    //     target: tableRef.value.$el,
    //     fullscreen: false,
    //   })
    // })
    //
    // watch(props.loading, (newValue) => {
    //   if (newValue) {
    //     loadingInstance.open()
    //     return
    //   }
    //   loadingInstance.close()
    // })
    return {
      t,
      tableRef,
      onSelect,
      sortChange,
      changePage: (page: number) => emit('change-page', page),
      clickRow: (row: ObjectType) => props.selection || emit('update:selectedRows', [row]),
    }
  },
})
</script>
<style module lang="scss">
.table {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  :global(.el-pagination) {
    text-align: end;
  }
  .pagination {
    margin-top: auto;
  }
}
</style>
