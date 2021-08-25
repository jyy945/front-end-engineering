<template>
  <el-select
    v-model="form[item.key]"
    :style="style"
    :multiple="item.multiple"
    :disabled="item.disabled"
    popper-class="dropdown"
    @visible-change="visible = true"
    @remove-tag="removeTag"
  >
    <el-option
      v-for="option of selectedRows"
      :key="option.id"
      :label="option.cname"
      :value="option.cname"
    />
  </el-select>
  <el-dialog
    v-if="visible"
    v-model="visible"
    :title="dialogTitle"
    append-to-body
    width="80%"
    style="height: 50vh"
  >
    <org-layout :org-tree-data="item.orgTreeData">
      <search :placeholder-id="searchPlaceholder" :class="$style.search" @on-search="changePage" />
      <el-card :class="$style.selectedUser" shadow="never">
        <span>{{ subTitle }}</span>
        <el-tag
          v-for="row in selectedRows"
          :key="row.id"
          :class="$style.tag"
          closable
          type="success"
          @close="closeTag(row)"
        >
          {{ row.cname }}
        </el-tag>
      </el-card>
      <records
        v-model:selectedRows="selectedRows"
        :selection="item.multiple"
        :columns="columns"
        :sort="sort"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        value-path="userId"
        @change-page="changePage"
      />
    </org-layout>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, toRefs } from 'vue'
// import Search from '@/components/Filter/Search.vue'
// import Records from '@/components/Records/index.vue'
// import { User } from '@/components/Form/types'
// import { fetchRecordsRequest } from '@/api/user'
import useSearch from '@/hooks/useSearch'
import { COLUMNS } from './config'
import { differenceBy, map, remove } from 'lodash'
// import OrgLayout from '@/components/OrgLayout/index.vue'
// import { ObjectType } from 'typings/interfaces'
import { User } from '@/types/form'
import { ObjectType } from '@/types/interfaces'
import { ElOption, ElSelect, ElDialog, ElCard, ElTag } from 'element-plus'
import OrgLayout from '../../../../orgLayout/src/index.vue'
import Search from '../../../../advanceSearch/src/Search.vue'
import Records from '../../../../records/src/index.vue'
interface Row {
  id: string
  cname: string
  username: string
  phone: string
  email: string
}

export default defineComponent({
  name: 'Users',
  components: { ElSelect, ElOption, ElDialog, Search, Records, OrgLayout, ElCard, ElTag },
  emits: {
    'update:form': null,
  },
  props: {
    dialogTitle: {
      type: String as PropType<string>,
      default: '请选择人员',
    },
    subTitle: {
      type: String as PropType<string>,
      default: '人员',
    },
    searchPlaceholder: {
      type: String as PropType<string>,
      default: '请输入',
    },
    form: {
      type: Object as PropType<ObjectType>,
      required: true,
    },
    item: {
      type: Object as PropType<User>,
      required: true,
    },
    placeholderId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const selectedRows = ref<Row[]>([])
    const { dataSource, changePage, loading, pagination, sort } = useSearch(
      props.item.fetchRecordsRequest
    )
    const { form, item } = toRefs(props)

    // 设置表单值
    watch(
      selectedRows,
      (newValue) =>
        (form.value[item.value.key] = item.value.multiple
          ? map(newValue, ({ cname }) => cname)
          : newValue[0].cname)
    )

    return {
      visible: ref(false),
      selectedRows,
      queryFields: ['cname', 'username'],
      dataSource,
      columns: COLUMNS,
      loading,
      changePage,
      pagination,
      sort,
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
      removeTag: (cname: string) => remove(selectedRows.value, { cname }),
      closeTag: (row: Row) => (selectedRows.value = differenceBy(selectedRows.value, [row])),
      onSearch: (value: string) => {
        changePage(1, {
          cname: value,
          username: value,
        })
      },
    }
  },
})
</script>

<style lang="scss" module>
.selectedUser {
  margin: 10px 0;
  height: 76px;
  overflow: auto;
  .tag {
    margin: 5px;
  }
}

.search {
  width: 300px;
}
:global {
  .dropdown {
    display: none;
    // :global(.el-select__popper.el-popper[role='tooltip']) {
    //   display: none;
    // }
    // :global(.el-select-dropdown) {
    //   display: none;
    // }
  }
}
</style>
