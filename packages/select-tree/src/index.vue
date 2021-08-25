<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom"
    trigger="click"
    :width="popWidth"
    :popper-class="$style['pop-container']"
  >
    <template #reference>
      <el-input
        v-bind="inputProps"
        size="small"
        :value="inputValue"
        readonly
        @focus="focus"
      ></el-input>
    </template>
    <el-tree
      v-bind="treeProps"
      ref="treeRef"
      :data="treeData"
      :expand-on-click-node="false"
      :default-expanded-keys="expandedKeys"
      highlight-current
      accordion
      @node-click="nodeClick"
    ></el-tree>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed } from 'vue'
import { ElPopover, ElInput, ElTree } from 'element-plus'
import { TreeNodeData, TreeComponentProps } from 'element-plus/lib/el-tree/src/tree.type'
import type Tree from 'element-plus/lib/el-tree'
import { ComputedRef } from '@vue/reactivity'
import { TreeData, TreeDataType } from '@/types'

interface SelectTreeType {
  treeProps: Record<string, any>
  inputProps: Record<string, any>
  treeData: TreeDataType
  modelValue: string
}

export default defineComponent({
  name: 'CelSelectTree',
  components: {
    ElPopover,
    ElInput,
    ElTree,
  },
  props: {
    treeProps: {
      type: Object as PropType<Record<string, any>>,
      default: (): Record<string, any> => ({
        props: {
          children: 'children',
          label: 'label',
        },
        nodeKey: 'id',
      }),
    },
    inputProps: {
      type: Object as PropType<Record<string, any>>,
      default: (): Record<string, any> => ({}),
    },
    treeData: {
      type: Array as PropType<TreeData[]>,
      default: (): TreeDataType => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'selectChange'],
  setup(props: SelectTreeType, { emit }) {
    const treeRef = ref<typeof Tree>(null)
    const visible = ref<boolean>(false)
    const popWidth = ref<number>(150)
    let expandedKeys = reactive<string[]>([])

    // 根据节点的id获取对应的节点名称赋值给input,并获取对应的展开节点id
    const inputValue: ComputedRef<string> = computed<string>(() => {
      if (!props.modelValue) return ''
      const label = props.treeProps.props.label
      const key = props.treeProps.nodeKey
      const stack: Array<string> = []
      treeRef.value && treeRef.value.setCurrentKey(props.modelValue)
      const rst = treeRecursion(props.treeData, props.modelValue)
      expandedKeys = reactive<string[]>(stack)
      return rst

      function treeRecursion(data: TreeData[], val: string): string | undefined {
        for (let i = 0, l = data.length; i < l; i++) {
          const item = data[i]
          if (item[key] === val) return item[label]
          if (item.children && item.children.length > 0) {
            stack.push(item[key])
            const rst = treeRecursion(item.children, val)
            if (rst) return rst
          }
        }
        stack.pop()
        return ''
      }
    })

    const focus = (e: Event): void => {
      popWidth.value = (e.target as HTMLElement).offsetWidth
    }

    const nodeClick = (data: TreeNodeData) => {
      visible.value = false
      emit('update:modelValue', data.id)
      emit('selectChange', data)
    }
    return {
      // ref
      visible,
      treeRef,
      popWidth,
      expandedKeys,

      // computed
      inputValue,

      // methods
      focus,
      nodeClick,
    }
  },
})
</script>

<style module lang="scss">
.pop-container {
  box-sizing: border-box;
  max-height: 400px;
  overflow: auto;
  \:global {
    .el-tree-node__children {
      overflow: inherit !important;
    }
  }
}
</style>
