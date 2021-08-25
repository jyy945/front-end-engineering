import { mount } from '@vue/test-utils'
import EditableTable from '../src/index.vue'
import { Data, EditType, FormItemType } from '@/types'

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})

function mountForm(config) {
  return mount(EditableTable, { attachTo: document.body, ...config })
}

let globalData = [
  {
    id: '0',
    name: 'ceshi',
    sex: 'female',
  },
]
let index = '0'
describe('测试editable-table组件', () => {
  it('测试渲染', async () => {
    const wrapper = mountForm({
      props: {
        type: EditType.ADD,
        columns: [
          {
            label: '姓名',
            name: 'name',
            type: 'input',
          },
          {
            label: '性别',
            name: 'sex',
            type: 'select',
            options: [
              {
                label: '男',
                value: 'male',
              },
              {
                label: '女',
                value: 'female',
              },
            ],
          },
        ],
        operate: {
          add: (row: Record<string, any>) => {
            return new Promise((resolve) => {
              index = (parseInt(index) + 1).toString()
              globalData.unshift({ sex: row.sex, name: row.name, id: index })
              resolve(true)
            })
          },
          update: (row: Data) => {
            return new Promise((resolve) => {
              const _index = globalData.findIndex((data) => data.id === row.id)
              globalData[_index] = { sex: row.sex, name: row.name, id: row.id }
              resolve(true)
            })
          },
          del: (ids: string[]) => {
            return new Promise((resolve) => {
              globalData = globalData.filter((data) => !ids.includes(data.id))
              resolve(true)
            })
          },
          get: (cur) => {
            return new Promise((resolve) => {
              console.log(globalData.slice(10 * (cur - 1), 10 * cur))
              resolve({
                current: cur,
                total: globalData.length,
                size: 10,
                records: globalData.slice(10 * (cur - 1), 10 * cur),
              })
            })
          },
        },
      },
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$forceUpdate()
    // 按键是否正确渲染
    expect(wrapper.findAll('.el-button-group button.el-button').length).toBe(2)
    expect(wrapper.find('table').exists()).toBeTruthy()
    expect(wrapper.find('.el-form input[type="checkbox"]').exists()).toBeTruthy()
    console.log(wrapper)
    expect(
      wrapper.find('.el-table__header-wrapper table thead tr th:nth-child(2) div').text()
    ).toBe('姓名')
    expect(
      wrapper.find('.el-table__header-wrapper table thead tr th:nth-child(3) div').text()
    ).toBe('性别')
    expect(wrapper.findAll('.el-table__body-wrapper table tbody tr').length).toBe(1)
  })
  it('点击添加按键，弹出一条新数据', async () => {
    const wrapper = mountForm({
      props: {
        type: EditType.ADD,
        columns: [
          {
            label: '姓名',
            name: 'name',
            type: 'input',
          },
          {
            label: '性别',
            name: 'sex',
            type: 'select',
            options: [
              {
                label: '男',
                value: 'male',
              },
              {
                label: '女',
                value: 'female',
              },
            ],
          },
        ],
        operate: {
          add: (row: Record<string, any>) => {
            return new Promise((resolve) => {
              index = (parseInt(index) + 1).toString()
              globalData.unshift({ sex: row.sex, name: row.name, id: index })
              resolve(true)
            })
          },
          update: (row: Data) => {
            return new Promise((resolve) => {
              const _index = globalData.findIndex((data) => data.id === row.id)
              globalData[_index] = { sex: row.sex, name: row.name, id: row.id }
              resolve(true)
            })
          },
          del: (ids: string[]) => {
            return new Promise((resolve) => {
              globalData = globalData.filter((data) => !ids.includes(data.id))
              resolve(true)
            })
          },
          get: (cur) => {
            return new Promise((resolve) => {
              console.log(globalData.slice(10 * (cur - 1), 10 * cur))
              resolve({
                current: cur,
                total: globalData.length,
                size: 10,
                records: globalData.slice(10 * (cur - 1), 10 * cur),
              })
            })
          },
        },
      },
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$forceUpdate()
    await wrapper.find('.el-button-group button:first-child').trigger('click')
    expect(wrapper.findAll('.el-table__body-wrapper table tbody tr').length).toBe(2)
  })
  it('选择行后，点击删除按键，删除所选数据', async () => {
    const wrapper = mountForm({
      props: {
        type: EditType.ADD,
        columns: [
          {
            label: '姓名',
            name: 'name',
            type: 'input',
          },
          {
            label: '性别',
            name: 'sex',
            type: 'select',
            options: [
              {
                label: '男',
                value: 'male',
              },
              {
                label: '女',
                value: 'female',
              },
            ],
          },
        ],
        operate: {
          add: (row: Record<string, any>) => {
            return new Promise((resolve) => {
              index = (parseInt(index) + 1).toString()
              globalData.unshift({ sex: row.sex, name: row.name, id: index })
              resolve(true)
            })
          },
          update: (row: Data) => {
            return new Promise((resolve) => {
              const _index = globalData.findIndex((data) => data.id === row.id)
              globalData[_index] = { sex: row.sex, name: row.name, id: row.id }
              resolve(true)
            })
          },
          del: (ids: string[]) => {
            return new Promise((resolve) => {
              globalData = globalData.filter((data) => !ids.includes(data.id))
              resolve(true)
            })
          },
          get: (cur) => {
            return new Promise((resolve) => {
              console.log(globalData.slice(10 * (cur - 1), 10 * cur))
              resolve({
                current: cur,
                total: globalData.length,
                size: 10,
                records: globalData.slice(10 * (cur - 1), 10 * cur),
              })
            })
          },
        },
      },
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$forceUpdate()
    await wrapper
      .find('.el-table__fixed .el-table__fixed-body-wrapper table tbody tr label.el-checkbox')
      .trigger('click')

    expect(
      wrapper
        .find('.el-table__fixed .el-table__fixed-body-wrapper table tbody tr label.el-checkbox')
        .classes()
    ).toContain('is-checked')
  })
})
