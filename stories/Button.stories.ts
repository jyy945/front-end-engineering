import CelButton from '../packages/button/src/index.vue'
import { t } from '../packages/locale'

export default {
  component: CelButton,
  title: 'checc/element-plus/button',
  argTypes: {
    text: {
      type: {
        required: true,
      },
      description: 'click',
    },
  },
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
  components: { CelButton },
  setup() {
    return { args }
  },
  template: '<cel-button v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  text: t('cel.buttonName'),
}
