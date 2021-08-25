import { flushPromises, mount } from '@vue/test-utils'
import sinon from 'sinon'
import Confirm from '../src/index.vue'

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})
afterEach(() => {
  sinon.restore()
})

const requestData = sinon.fake.resolves('')
const updateData = sinon.fake.resolves('')

const title = '提示'
describe('confirm组件', () => {
  it('测试渲染', () => {
    const wrap = mount(Confirm, {
      attachTo: document.body,
      propsData: {
        text: '删除',
        content: '确定要删除吗',
        requestData: requestData,
      },
    })
    // 检查组件是否加载
    expect(wrap.findComponent({ name: 'ElButton' })).toBeTruthy()
  })
  it('测试按钮点击 二次确认弹窗触发', async () => {
    const wrapper = mount(Confirm, {
      attachTo: document.body,
      propsData: {
        text: '删除',
        content: '确定要删除吗',
        requestData: requestData,
      },
    })
    // 点击按钮展示确认弹窗
    expect(wrapper.findComponent({ name: 'ElMessageBox' }).exists()).toBeFalsy()
    await wrapper.findComponent({ name: 'ElButton' }).trigger('click')
    expect(wrapper.findComponent({ name: 'ElMessageBox' })).toBeTruthy()
    // 提示弹窗点击确认按钮
    const confirmBtn: HTMLElement = document.querySelector(
      '.el-message-box__btns .el-button--primary'
    )

    confirmBtn.click()
    await flushPromises()
    expect(requestData.called).toBe(true)
    expect(updateData.called).toBe(false)
  })
  it('测试 传入props,点击确认按钮', async () => {
    const wrapper = mount(Confirm, {
      attachTo: document.body,
      propsData: {
        text: '删除',
        content: '确定要删除吗',
        title: title,
        requestData: requestData,
        updateData: updateData,
      },
    })
    expect(wrapper.text()).toBe('删除')
    await wrapper.find('.el-button').trigger('click')
    expect(wrapper.findComponent({ name: 'ElMessageBox' })).toBeTruthy()
    expect(document.querySelector('.el-message-box .el-message-box__title').textContent).toBe(title)
    // 提示弹窗点击确认按钮
    const confirmBtn: HTMLElement = document.querySelector(
      '.el-message-box__btns .el-button--primary'
    )

    confirmBtn.click()
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ElMessageBox' }).exists()).toBeFalsy()
    expect(requestData.called).toBe(true)
    expect(updateData.called).toBe(true)
  })
  // it('测试 传入props,点击取消按钮', async () => {
  //   const wrapper = mount(Confirm, {
  //     attachTo: document.body,
  //     propsData: {
  //       text: '删除',
  //       content: '确定要删除吗',
  //       title: title,
  //       requestData: requestData,
  //       updateData: updateData,
  //     },
  //   })
  //   await wrapper.find('.el-button').trigger('click')
  //   // 提示弹窗点击确认按钮
  //   const cancelButton: HTMLElement = document.querySelector('.el-message-box__btns button')
  //   await cancelButton.click()
  //   await flushPromises()
  //
  // })
})
