<template>
  <template v-if="item.children">
    <el-table-column :key="item.key" :label="item.labelId" align="center">
      <column v-for="child in item.children" :key="child.key" :item="child" />
    </el-table-column>
  </template>
  <!-- 格式化方法 -->
  <el-table-column
    v-else-if="item.formatter"
    :label="item.labelId"
    align="center"
    :width="columnWidth"
    :formatter="item.formatter"
    :sortable="sortable"
    :prop="item.key"
  />
  <el-table-column
    v-else
    :label="item.labelId"
    align="center"
    :width="columnWidth"
    :sortable="sortable"
    :prop="item.key"
  >
    <template #default="scope">
      <!-- 日期 -->
      <span v-if="item.type === 'date'">{{ handleDate(scope.row) }}</span>
      <!-- 选择类型  -->
      <span v-else-if="item.type === 'option'">{{ handleOption(scope.row) }}</span>
      <!-- 字符串 -->
      <span v-else-if="item.type === 'string'">{{ scope.row[item.key] }}</span>
      <!-- 机构 -->
      <span v-else-if="item.type === 'org'">{{ handleOrg(scope.row) }}</span>
      <!-- 进度条 -->
      <span v-else-if="item.type === 'progress'">
        <table-progress :value="scope.row[item.key]" />
      </span>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue'
import { find, get } from 'lodash'
import { findNode } from '@/utils/util'
import TableProgress from './Progress.vue'
import dayjs from 'dayjs'
import { ObjectType } from '@/types/interfaces'
import { ElTableColumn } from 'element-plus'
import { BaseColumn } from '@/types'

export default defineComponent({
  name: 'Column',
  props: {
    item: {
      type: Object as PropType<BaseColumn>,
      required: true,
    },
    options: {
      type: Array as PropType<Array>,
      default: () => [],
    },
    orgTree: {
      type: Array as PropType<ObjectType>,
    },
  },
  components: {
    TableProgress,
    ElTableColumn,
  },
  setup(props) {
    const key = get(props, 'item.key')
    // 此处改为从外部传入
    const orgTree = reactive(props.orgTree)
    const handleOrg = (row: ObjectType) => {
      const value = get(row, key)
      const name = get(findNode(orgTree.value, { id: value }), 'name')
      return name
    }

    return {
      handleOrg,
      columnWidth: props.item?.width || 80,
      sortable: computed(() => (props.item.sortable ? 'custom' : false)),
    }
  },
  methods: {
    handleOption(row: ObjectType) {
      const key = get(this, 'item.key', '')
      const value = get(find(this.options[key], { itemValue: get(row, key, '') }), 'itemText')
      return value
    },
    handleDate(row: ObjectType) {
      const key = get(this, 'item.key', '')
      const value = get(row, key)
      return value ? dayjs(value).format(this.item?.formate) : value
    },
    prop({ $index }: ObjectType) {
      if ($index === -1) return ''
      return 'dataSource.' + $index + '.name'
    },
  },
})
</script>
