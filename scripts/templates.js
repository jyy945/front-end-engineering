const path = require('path')
const uppercamelcase = require('uppercamelcase')

module.exports = function (packageDir, name) {
  return [
    {
      name: 'package.json',
      path: path.resolve(packageDir, 'package.json'),
      params: {
        name,
      },
      template: `{
  "name": "@checc/{{name}}",
  "version": "1.0.0",
  "license": "MIT",
  "main": "lib/index.ts",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib"
  ],
  "publishConfig": {
    "access": "publish"
  }
}`,
    },
    {
      name: 'cmp/index.ts',
      path: path.resolve(packageDir, 'index.ts'),
      params: {
        name: uppercamelcase(name),
      },
      template: `import { App } from 'vue'
import type { SFCWithInstall } from 'element-plus/lib/utils/types'
import {{name}} from './src/index.vue'

{{name}}.install = (app: App): void => {
  app.component({{name}}.name, {{name}})
}

const _{{name}}: SFCWithInstall<typeof {{name}}> = {{name}}
export default _{{name}}`,
    },
    {
      name: 'test',
      path: path.resolve(packageDir, '__tests__', 'index.spec.ts'),
      params: {},
      template: `describe('测试组件', () => {
  it('测试1', () => {
    expect('123').toBe('123')
  })
})`,
    },
    {
      name: 'index.vue',
      path: path.resolve(packageDir, 'src', 'index.vue'),
      params: {
        name: 'Cel' + uppercamelcase(name),
      },
      template: `<template>
    {{name}}
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name: "{{name}}",
})
</script>

<style scoped lang="scss">
</style>`,
    },
    {
      name: 'stories',
      path: path.resolve(__dirname, `../stories/${uppercamelcase(name)}.stories.ts`),
      params: {
        name,
        upperName: uppercamelcase(name),
      },
      template: `import Cel{{upperName}} from '../packages/{{name}}/src/index.vue'

export default {
  component: Cel{{upperName}},
  title: 'checc/element-plus/{{name}}',
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
  components: { Cel{{upperName}} },
  setup() {
    return { args }
  },
  template: '<cel-{{name}} v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {}`,
    },
  ]
}
