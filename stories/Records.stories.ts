import CelRecords from '../packages/records/src/index.vue'

export default {
  component: CelRecords,
  title: 'checc/element-plus/records',
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: '表格',
      },
    },
  },
}

const COLUMNS = [
  {
    key: 'cname',
    type: 'string',
    width: 140,
    labelId: '姓名',
  },
  {
    key: 'hiredate',
    type: 'date',
    width: 120,
    formate: 'YYYY-MM-DD',
    labelId: '入职时间',
  },
  {
    key: 'gender',
    type: 'string',
    width: 100,
    labelId: '性别',
  },
  {
    key: 'birth',
    type: 'date',
    width: 120,
    formate: 'YYYY-MM-DD',
    labelId: '出生年月',
  },
]
const dataSource =[
  {cname:'张三',hiredate:'2020-01-01',gender:'男',birth:'2026-11-1'}
]
const Template = (args) => ({
  components: { CelRecords },
  setup() {
    return { args }
  },
  template: '<cel-records v-bind="args" :loading="false" />',
})

export const Primary = Template.bind({})
Primary.args = {
  columns: COLUMNS,
  loading: false,
  dataSource: dataSource,
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 20,
  },
  // 非必填
  index: true,
  selection: true,
  selectedRows: [],
  defaultSelectedRows: [],
  options: {},
  maxHeight: 500,
  valuePath: 'id',
  sort: (sort) => {
    console.log(sort)
    return Promise.resolve([])
  },
}

Primary.storyName = '基本展示'

// export const WithData = () => ({
//   components:{CelRecords},
//   setup(){},
//   template: '<cel-records></cel-records>',
// })
// WithData.storyName = '示例'
