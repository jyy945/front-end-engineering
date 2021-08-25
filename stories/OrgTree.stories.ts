import CelOrgTree from '../packages/orgTree/src/index.vue'
import { reactive } from 'vue'

export default {
  component: CelOrgTree,
  title: 'checc/element-plus/orgTree',
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: 'describe the component',
      },
    },
  },
}
const orgTree = [
  {
    id: 1,
    name: '一级 1',
    children: [
      {
        id: 4,
        name: '二级 1-1',
        children: [
          {
            id: 9,
            name: '三级 1-1-1',
          },
          {
            id: 10,
            name: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '一级 2',
    children: [
      {
        id: 5,
        name: '二级 2-1',
      },
      {
        id: 6,
        name: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    name: '一级 3',
    children: [
      {
        id: 7,
        name: '二级 3-1',
      },
      {
        id: 8,
        name: '二级 3-2',
      },
    ],
  },
]

const Template = (args) => ({
  components: { CelOrgTree },
  setup() {
    const rArgs = reactive(args)
    return { rArgs }
  },
  template: '<cel-orgTree v-bind="rArgs" />',
})

export const Primary = Template.bind({})
Primary.args = {
  orgTree,
}

Primary.storyName = '基本展示'
