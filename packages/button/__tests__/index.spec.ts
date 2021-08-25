import { mount } from '@vue/test-utils'
import Demo from './demo.vue'

describe('测试组件', () => {
  it('测试1', () => {
    const wrap = mount(Demo)
    console.log(wrap.html())
  })
})
