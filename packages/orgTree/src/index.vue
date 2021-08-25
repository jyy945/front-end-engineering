<template>
  <el-tree
    :data="orgTree"
    default-expand-all
    :props="propsConfig"
    @node-click="(data) => $emit('click-node', data)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
// import useOrgTree from '@/hooks/useOrgTree'
import { ElTree } from 'element-plus'
import { ObjectType } from '@/types/interfaces'

export default defineComponent({
  name: 'CelOrgTree',
  components: { ElTree },
  props: {
    orgTree: {
      type: Object as PropType<ObjectType>,
      required: true,
    },
    propsConfig: {
      type: Object as PropType<{ label: string; children: string }>,
      default: () => ({
        label: 'name',
        children: 'children',
      }),
    },
  },
  emits: {
    'click-node': null,
  },

  // setup() {
  //   const { orgTree } = useOrgTree()
  //
  //   return {
  //     orgTree,
  //   }
  // },
})
</script>
