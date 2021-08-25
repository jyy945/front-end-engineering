import CelEditableTable from '../packages/editable-table/src/index.vue'
import { Data, EditType, FormItemType } from '@/types'

let index = '1'
let globalData = [
  {
    name: 'ceshi',
    sex: 'female',
  },
]

export default {
  component: CelEditableTable,
  title: 'checc/element-plus/editable-table',
  argTypes: {
    type: {
      description: '控制表格的展示类型',
      options: [EditType.ADD, EditType.EDIT, EditType.REVIEW],
      control: {
        type: 'inline-radio',
        labels: {
          0: 'ADD',
          1: 'EDIT',
          2: 'REVIEW',
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
        component: '可编辑表格组件',
      },
    },
  },
}
const Template = (args) => ({
  components: { CelEditableTable },
  setup() {
    return { args }
  },
  template: '<cel-editable-table v-bind="args" v-model="args.data" />',
})

export const Primary = Template.bind({})
Primary.args = {
  columns: [
    {
      name: 'name',
      label: '姓名',
      type: FormItemType.INPUT,
    },
    {
      name: 'sex',
      label: '性别',
      type: FormItemType.SELECT,
      options: [
        {
          label: '男',
          value: 'male',
        },
        {
          label: '女',
          value: 'female',
        },
      ],
    },
  ],
  type: EditType.EDIT,
  operate: {
    add: (row: Record<string, any>) => {
      return new Promise((resolve) => {
        index = (parseInt(index) + 1).toString()
        globalData.unshift({ ...row, id: index })
        resolve(true)
      })
    },
    update: (row: Data) => {
      return new Promise((resolve) => {
        const _index = globalData.findIndex((data): boolean => data.id === row.id)
        globalData[_index] = row
        resolve(true)
      })
    },
    del: (ids: string[]) => {
      return new Promise((resolve) => {
        globalData = globalData.filter((data) => !ids.includes(data.id))
        resolve(true)
      })
    },
    get: (cur) => {
      return new Promise((resolve) => {
        console.log(globalData.slice(10 * (cur - 1), 10 * cur))
        resolve({
          current: cur,
          total: globalData.length,
          size: 10,
          records: globalData.slice(10 * (cur - 1), 10 * cur),
        })
      })
    },
  },
}
