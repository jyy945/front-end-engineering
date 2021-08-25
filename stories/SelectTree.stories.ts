import { ref, reactive } from 'vue'
import CelSelectTree from '../packages/select-tree/src/index.vue'
import { TreeData } from '@/types'

export default {
  component: CelSelectTree,
  title: 'checc/element-plus/select-tree',
  argTypes: {
    treeProps: {
      description: '透传elelent-plus中tree属性',
      type: { name: 'object' },
      table: {
        defaultValue: {
          summary: '{...}',
          detail: `{
  props: {
    children: 'children',
    label: 'label',
  },
  nodeKey: 'id',
}`,
        },
      },
    },
    inputProps: {
      description: '透传elelent-plus中input属性',
      type: { name: 'object' },
      table: {
        defaultValue: {
          summary: '{}',
        },
      },
    },
    treeData: {
      description: '树结构中显示的数据',
      type: { name: 'array' },
      table: {
        defaultValue: {
          summary: '[]',
        },
        type: {
          detail: `TreeData[]
TreeData包含属性：
  id<string>: 节点id，可通过ep中tree的node-key修改
  label<string>: 节点名称，可通过ep中tree的props修改
  children<array>: 子节点对象数组，可通过ep中tree的props修改`,
        },
      },
    },
    modelValue: {
      description: '所选中的节点的id，使用v-model传递',
    },
    'update:modelValue': {
      table: { disable: true },
    },
    selectChange: {
      description: '节点选中后触发的方法，参数为所点击的节点对象data',
      table: {
        type: {
          summary: 'function(data: TreeData){}',
        },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: '树选择控件',
      },
    },
  },
}
const Template = (args) => ({
  components: { CelSelectTree },
  setup() {
    const value = ref<string>(args.moduleValue || '')
    const selectChange = (data: TreeData): void => {
      console.log(data)
    }
    return {
      // ref
      args,
      value,

      // method
      selectChange,
    }
  },
  template: '<cel-select-tree v-bind="args" @select-change="selectChange" v-model="value" />',
})

export const Primary = Template.bind({})
Primary.args = {}
Primary.storyName = '基本展示'

export const WithData = () => ({
  components: { CelSelectTree },
  setup() {
    const treeData = reactive<Record<string, any>[]>([
      {
        id: '1',
        label: '一级 1',
        children: [
          {
            id: '4',
            label: '二级 1-1',
          },
        ],
      },
      {
        id: '2',
        label: '一级 2',
        children: [
          {
            id: '5',
            label: '二级 2-1',
          },
        ],
      },
    ])
    const treeProps = reactive<Record<string, any>>({
      props: {
        children: 'children',
        label: 'label',
      },
      nodeKey: 'id',
    })
    const inputProps = reactive<Record<string, any>>({
      'prefix-icon': 'el-icon-search',
    })
    const value = ref<string>('4')
    const selectChange = (data: TreeData) => {
      console.log(data)
    }
    return {
      treeData,
      treeProps,
      inputProps,
      value,
      selectChange,
    }
  },
  template:
    '<cel-select-tree :tree-data="treeData" :tree-props="treeProps" :input-props="inputProps" v-bind="args" @select-change="selectChange" v-model="value" />',
})
WithData.storyName = '示例'
