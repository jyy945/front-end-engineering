import CelCrossLine from '../packages/crossLine/src/index.vue'

export default {
  component: CelCrossLine,
  title: 'checc/element-plus/crossLine',
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: '表单分割线',
      },
    },
  },
}
const Template = (args) => ({
  components: { CelCrossLine },
  setup() {
    return { args }
  },
  template: '<cel-crossLine v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  text: '基本信息',
  visible: true,
}
Primary.storyName = '基本展示'
