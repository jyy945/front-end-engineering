import CelExportButton from '../packages/export-button/src/index.vue'

export default {
  component: CelExportButton,
  title: 'checc/element-plus/export-button',
  argTypes: {
    requestData:{
      description:'导出函数'
    },
    updateData:{
      description:'执行完导出函数执行的函数'
    },
    text:{
      description:'按钮展示文字'
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: '导出按钮',
      },
    },
  },
}
const Template = (args) => ({
  components: { CelExportButton },
  setup() {
    return { args }
  },
  template: '<cel-export-button v-bind="args" />',
})

export const Primary = Template.bind({
  slot: 'primary',
})
Primary.args = {
}
Primary.storyName = '基本展示';

export const WithData = (args) => ({
  components: {CelExportButton},
  setup() {},
  template:'<cel-export-button v-bind="args" />'
})
WithData.storyName = '示例'
