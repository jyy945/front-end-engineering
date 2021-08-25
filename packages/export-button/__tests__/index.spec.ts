import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import ExportButton from '../src/index.vue'

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
const spy = sinon.spy()
const btnName = '下载'
describe('export-button组件', () => {
  it('测试渲染', () => {
    const wrap = mount(ExportButton, {
      attachTo: document.body,
      propsData: {
        requestData: () => Promise.resolve('value'),
      },
    })
    // 检查组件是否加载
    expect(wrap.findComponent({ name: 'ElButton' })).toBeTruthy()
  })
  it('测试点击行为', async () => {
    const wrap = mount(ExportButton, {
      attachTo: document.body,
      propsData: {
        text: btnName,
        requestData: () => {
          spy()
          return Promise.resolve('value')
        },
      },
    })
    // 按钮显示的文字
    expect(wrap.findComponent({ name: 'ElButton' }).text()).toBe(btnName)
    await wrap.findComponent({ name: 'ElButton' }).trigger('click')
    expect(spy.called).toBe(true)
  })
})
