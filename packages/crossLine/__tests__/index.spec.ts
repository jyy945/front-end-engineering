import { mount } from '@vue/test-utils'
import CelCrossLine from '../src/index.vue'

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})

describe('测试组件', () => {
  it('渲染测试', async () => {
    const wrapper = mount(CelCrossLine, { props: { text: '标题', visible: true } })
    // 标题渲染
    expect(wrapper.text()).toContain('标题')
    // 事件触发
    await wrapper.find('span').trigger('click')
    expect(wrapper.emitted()['update:visible']).toBeTruthy()
    // props
    expect(wrapper.vm.className).toEqual('el-icon-arrow-up')
    await wrapper.setProps({ visible: false })
    expect(wrapper.vm.className).toEqual('el-icon-arrow-down')
  })
})
