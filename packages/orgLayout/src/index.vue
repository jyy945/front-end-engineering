<template>
  <main :class="$style.main">
    <org-tree :org-tree="orgTreeData" :class="$style.org_tree" @click-node="clickNode" />
    <section :class="$style.content">
      <slot />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import OrgTree from '../../orgTree/src/index.vue'
// import { isEmpty, get } from 'lodash'
import { ObjectType } from '@/types/interfaces'
// import { useStore } from 'vuex'
// import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'CelOrgLayout',
  emits: {
    'click-node': null,
  },
  props: {
    orgTreeData: {
      type: Object as PropType<ObjectType>,
    },
  },
  components: {
    OrgTree,
  },
  setup(props, { emit }) {
    // const store = useStore()
    // onBeforeRouteUpdate(() => {
    //   /* 获取机构树 */
    //   if (isEmpty(get(store, 'state.global.orgTree'))) {
    //     store.dispatch('getOrgTree', { depth: 4 })
    //   }
    // })
    return {
      clickNode: (data) => emit('click-node', data),
    }
  },
})
</script>

<style module lang="scss">
main {
  display: flex;
  height: 100%;
  section {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    overflow: auto;
    // box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%);
  }
  .org_tree {
    flex: 0 0 250px;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #dcdfe6;
    height: 100%;
    overflow: auto;
  }
}
</style>
