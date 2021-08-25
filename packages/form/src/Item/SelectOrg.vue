<template>
  <el-select
    v-model="form[item.key]"
    :placeholder="placeholder"
    :loading="loading"
    :remote="!!item.remoteMethod"
    :remote-method="remoteMethod"
    :style="style"
    :disabled="itemDisabled"
    :collapse-tags="item.collapseTags"
    clearable
    filterable
    multiple
    @change="change"
  >
    <div v-infinite-scroll="loadNextPage" :infinite-scroll-immediate="false">
      <el-option
        v-for="{ itemText, itemValue, disabled } of option"
        :key="itemValue"
        :label="itemText"
        :value="itemValue"
        :disabled="disabled"
      />
    </div>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { get, find, forEach, map } from 'lodash'
import usePlaceholder from '@/hooks/usePlaceholder'
import useSearch from '@/hooks/useSearch'
import useDisabled from '../hooks/useDisabled'
import useFilterOption from '../hooks/useFilterOption'
import { Option, Select } from '@/types/form'
import { FormItemKey, ObjectType } from '@/types/interfaces'
import { ElOption, ElSelect } from 'element-plus'

export default defineComponent({
  components: { ElSelect, ElOption },
  props: {
    item: {
      type: Object as PropType<Select>,
      required: true,
    },
    form: {
      type: Object as PropType<ObjectType>,
      required: true,
    },
    filterOptions: {
      type: Object as PropType<ObjectType>,
      default: () => ({}),
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
    const placeholder = usePlaceholder(props.item, 'placeholder.select')
    const itemDisabled = useDisabled(props.disabled, props.item.disabled)
    const key = get(props, 'item.alias') ?? get(props, 'item.key', '')
    const loading = ref(false)
    const { changePage, pagination, dataSource } = useSearch(props.item?.remoteMethod)
    const option = ref<Option[]>(get(props.options, [props.item.key], []))
    // 更新option
    // props.form[key] = props.form[key].map((item: any) => ({ inspectPosition: item }))
    // console.log(props.form)
    watch(
      () => props.options[props.item.key],
      (state) => (option.value = state)
    )
    //筛选option
    if (props.item.linkage) {
      useFilterOption({
        option,
        dictMap: props.item.linkage.dictMap,
        primevalOption: get(props.options, [props.item.key], []),
        key: key,
        form: props.form,
        watchKey: props.item.linkage.key,
      })
    }

    watch(dataSource, (state) => {
      pagination.pageNum === 1
        ? (option.value = map(state, (item) => ({
            ...item,
            itemText: item[key],
            itemValue: item[key],
          })))
        : (option.value = [
            ...option.value,
            ...map(state, (item) => ({
              ...item,
              itemText: item[key],
              itemValue: item[key],
            })),
          ])
    })

    const remoteMethod = (value: string) => {
      loading.value = true
      changePage(1, { [props.item.key]: value })
        .then(() => (loading.value = false))
        .catch(() => (loading.value = false))
    }

    /* 加载下一页 */
    const loadNextPage = () => {
      const { pageNum, pageSize, total } = pagination
      if (pageNum * pageSize < total) {
        changePage(pageNum + 1, { [props.item.key]: props.form[props.item.key] })
      }
    }

    // 动态修改其他表单项
    const change = (value: string) => {
      const row = find(option.value, { [key]: value })
      forEach(props.item.shouldUpdate, ([key, alias]) => {
        props.form[key] = get(row, alias ?? key)
      })
    }
    return {
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
      option,
      loading,
      remoteMethod,
      placeholder,
      loadNextPage,
      change,
      itemDisabled,
    }
  },
})
</script>
