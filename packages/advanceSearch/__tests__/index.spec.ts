import { mount } from '@vue/test-utils'
import AdvanceSearch from '../src/index.vue'
import { ElButton, ElInput, ElSelect } from 'element-plus'
beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})

describe('高级搜索组件-测试', () => {
  const wrapper = mount(AdvanceSearch)
  it('渲染', () => {
    expect(wrapper.findComponent(ElButton)).toBeTruthy()
    expect(wrapper.findComponent(ElInput)).toBeTruthy()
  })
  it('点击确定', async () => {
    await wrapper.find('.search input').trigger('focus')
    const popover = document.querySelector('.el-popover')
    expect(popover.getAttribute('aria-hidden')).toEqual(false)
  })
})
