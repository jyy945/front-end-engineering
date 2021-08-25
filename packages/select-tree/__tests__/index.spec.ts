import { mount } from '@vue/test-utils'
import SelectTree from '../src/index.vue'

const treeData = [
  {
    id: '1',
    label: '一级 1',
    children: [
      {
        id: '4',
        label: '二级 1-1',
      },
    ],
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      {
        id: '5',
        label: '二级 2-1',
      },
    ],
  },
]

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})

describe('select-tree组件', () => {
  it('测试渲染', () => {
    const wrap = mount(SelectTree, {
      attachTo: document.body,
    })
    // 检查子组件是否加载
    expect(wrap.findComponent({ name: 'ElPopover' })).toBeTruthy()
    expect(wrap.findComponent({ name: 'ElInput' })).toBeTruthy()
    expect(wrap.findComponent({ name: 'ElTree' })).toBeTruthy()
    // 子组件是否渲染
    expect(wrap.find('.el-input').exists()).toBeTruthy()
    expect(document.querySelector('.el-popover')).not.toBeNull()
  })
  it('测试pop的显示/隐藏触发', async () => {
    const wrapper = mount(SelectTree, {
      attachTo: document.body,
    })
    // popover默认不显示
    expect(document.body.querySelector('.el-popover').getAttribute('style')).toContain(
      'display: none'
    )
    const trigger = wrapper.find('.el-input input')
    await trigger.trigger('click')
    await wrapper.find('input').trigger('focus')
    // 点击输入框后，触发显示popover
    const popDom = <HTMLElement>document.body.querySelector('.el-popover')
    expect(popDom.getAttribute('style')).not.toContain('display: none')
    // 弹出气泡框后，气泡框和输入框宽度相同
    expect(parseInt(popDom.style.width.slice(0, -2))).toBe(wrapper.vm.popWidth)
  })
  it('测试tree数据显示', () => {
    mount(SelectTree, {
      propsData: { treeData },
      attachTo: document.body,
    })
    // 传入treedata，tree数据列表将会显示
    expect(document.querySelectorAll('.el-tree>div.el-tree-node').length).toBe(treeData.length)
  })
  it('默认树节点展示', async () => {
    const wrapper = mount(
      {
        template: '<select-tree v-model="val" :treeData="treeData"/>',
        components: {
          SelectTree,
        },
        data() {
          return {
            val: '5',
            treeData,
          }
        },
      },
      {
        attachTo: document.body,
      }
    )
    await wrapper.vm.$nextTick()
    // v-model传入默认显示的节点的id，输入框将显示该节点对应的名称
    const cmp = wrapper.findComponent({ name: 'CelSelectTree' })
    expect(cmp.find('input').element.value).toBe('二级 2-1')
  })

  it('点击树节点，输入框显示节点名称', async () => {
    const wrapper = mount(
      {
        template: '<select-tree v-model="val" :treeData="treeData"/>',
        components: {
          SelectTree,
        },
        data() {
          return {
            val: '',
            treeData,
          }
        },
      },
      {
        attachTo: document.body,
      }
    )
    // 模拟点击树中第一个节点
    const treeNode = document.getElementsByClassName('el-tree-node')[0]
    ;(<HTMLElement>treeNode).click()
    await wrapper.vm.$nextTick()
    // selectChange和v-model将会触发
    expect(
      wrapper.findComponent({ name: 'CelSelectTree' }).emitted()['selectChange'][0][0]
    ).toEqual(treeData[0])
    expect(
      wrapper.findComponent({ name: 'CelSelectTree' }).emitted()['update:modelValue'][0][0]
    ).toEqual(treeData[0].id)
    // 输入框中显示第一个树节点的名称
    expect(wrapper.findComponent({ name: 'CelSelectTree' }).find('input').element.value).toBe(
      treeData[0].label
    )
  })
})
