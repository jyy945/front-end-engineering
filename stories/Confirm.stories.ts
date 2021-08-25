import CelConfirm from '../packages/confirm/src/index.vue'
export default {
  component: CelConfirm,
  title: 'checc/element-plus/confirm',
  argTypes: {
    type: {
      name: 'type',
      description: '包含 button | link  俩种类型',
    },
    text: {
      description: '按钮展示文字',
    },
    infoType: {
      description: '弹窗类型，值参考elementPlus 的ElMessageBox组件',
    },
    linkType: {
      description: '点击的按钮类型',
    },
    title: {
      description: '确认弹窗标题',
    },
    content: {
      description: '确认弹窗显示内容',
    },
    requestData: {
      description: '弹窗确认点击确定需要调用的函数',
    },
    updateData: {
      description: '调用完requestData之后调用的函数',
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: '点击按钮进行操作之前进行确认操作',
      },
    },
  },
}
const Template = (args) => ({
  components: { CelConfirm },
  setup() {
    return { args }
  },
  template: '<cel-confirm v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'button',
  text: '确认',
  infoType: '',
  requestData: async () => await alert(1111),
  updateData: () => new Promise((resolve) => resolve('s')),
  disabled: false,
  content: '确认的内容',
}
Primary.storyName = '基本展示'
export const WithData = () => ({
  components: { CelConfirm },
  setup() {},
  template:
    '<cel-confirm type="button" text="删除" title="提示" :disabled="false" content="是否要删除？" info-type="warning" link-type="primary" ></cel-confirm>',
})
WithData.storyName = '示例'
