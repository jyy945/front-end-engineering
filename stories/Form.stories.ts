import CelForm from '../packages/form/src/index.vue'
import { Types } from '../packages/types/form'
import { reactive } from 'vue'

export default {
  component: CelForm,
  title: 'checc/element-plus/form',
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

const Template = (args) => ({
  components: { CelForm },
  setup() {
    const rArgs = reactive(args)
    return { rArgs }
  },
  template: '<cel-form v-bind="rArgs" />',
})

export const Primary = Template.bind({})
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

// 请求列表接口
const fetchRecordsRequest = (...arg) =>
  new Promise((resolve) => {
    console.log(arg)
    setTimeout(() => {
      return resolve({
        data: {
          data: {
            records: [
              { cname: '八戒', hiredate: '2020-01-01' },
              { cname: '悟空', hiredate: '2020-02-01' },
              { cname: '哪吒', hiredate: '2020-04-01' },
            ],
          },
        },
      })
    }, 1000)
  })
Primary.args = {
  modelValue: { inspectionNo: '' },
  formItems: [
    {
      key: 'inspectionNo',
      required: false,
      width: 200,
      type: Types.input,
      disabled: false,
      labelId: '路网编号',
    },
    {
      key: 'inspectionTypeCode',
      required: true,
      type: Types.select,
      disabled: false,
      labelId: '公路数量(条)',
      width: 200,
    },
    {
      key: 'gender',
      required: true,
      type: Types.radio,
      disabled: false,
      labelId: '性别',
      width: 200,
    },
    {
      key: 'age',
      required: true,
      type: Types.inputNumber,
      disabled: false,
      labelId: '年龄',
      width: 200,
    },
    {
      key: 'birth',
      required: true,
      type: Types.datePick,
      disabled: false,
      labelId: '出生日期',
      width: 200,
    },
    {
      key: 'pic',
      required: true,
      type: Types.upload,
      disabled: false,
      labelId: '图片',
      width: 200,
    },
    {
      key: 'dailyInspectPositionList',
      required: true,
      type: Types.selectOrg,
      disabled: false,
      labelId: '填写人',
      width: 200,
    },
    {
      key: 'chargeMan',
      required: false,
      width: 200,
      multiple: true,
      type: Types.user,
      labelId: '主管负责人',
      fetchRecordsRequest,
      orgTreeData: orgTree,
    },
  ],
  labelWidth: '150px',
  inline: false,
  initialValues: {
    inspectionNo: '李逍遥',
  },
  rules: {},
  disabled: false,
  options: {
    inspectionTypeCode: [{ itemText: '12312', itemValue: '10002312' }],
    gender: [
      { itemText: '男', itemValue: '1' },
      { itemText: '女', itemValue: '2' },
    ],
    dailyInspectPositionList: [
      { itemText: '张无忌', itemValue: '1111' },
      { itemText: '赵灵儿', itemValue: '2222' },
      { itemText: '娃哈哈', itemValue: '3333' },
    ],
  },
}
Primary.storyName = '基本展示'

// const WithData = (args) => ({
//   components: { CelForm },
//   setup() {
//     const modelValue = reactive({inspectionNo:''})
//     return { args,modelValue }
//   },
//   template: '<cel-form v-bind="args" />',
// })
// WithData.storyName = '示例'
