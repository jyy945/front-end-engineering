import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import FormCreator from '../src/index.vue'
import { FormItemType } from '@/types'
import useForm from '@/hooks/useForm'

beforeEach(() => {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})

type Methods = Record<string, () => any>
function mountForm<D, M extends Methods, C>(config: C & { data?(): D; methods?: M }) {
  return mount(FormCreator, { attachTo: document.body, ...config })
}

describe('测试form-creator组件', () => {
  it('测试渲染', () => {
    const wrapper = mountForm({
      props: {
        modelValue: {
          name: '',
        },
        items: {
          name: {
            key: '1',
            label: '姓名',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
        },
      },
    })
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find('form').classes()).toContain('el-form')
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
  it('测试传递空属性', () => {
    const wrapper = mountForm({
      props: {
        modelValue: {
          name: '',
        },
        items: {
          name: {
            key: '1',
            label: '姓名',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
        },
        formProps: {
          'label-width': '100px',
        },
      },
    })
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find('form').classes()).toContain('el-form')
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
  it('测试各类型表单元素显示', () => {
    const wrapper = mountForm({
      props: {
        modelValue: {
          name: '',
          age: 20,
          addr: '1',
          createDate: '',
          region: '',
        },
        items: {
          name: {
            key: '1',
            label: '姓名',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
          age: {
            key: '2',
            label: '年龄',
            name: 'age',
            type: FormItemType.INPUT_NUMBER,
            invisible: false,
          },
          addr: {
            key: '3',
            label: '地址',
            type: FormItemType.SELECT,
            options: [
              {
                value: '1',
                label: '北京',
              },
              {
                value: '2',
                label: '上海',
              },
              {
                value: '3',
                label: '广州',
              },
              {
                value: '4',
                label: '深圳',
              },
            ],
          },
          createDate: {
            key: '4',
            label: '创建日期',
            type: FormItemType.DATE,
          },
          region: {
            key: '5',
            label: '行政区划',
            type: FormItemType.SELECT_TREE,
          },
        },
        formProps: {
          'label-width': '100px',
        },
      },
    })
    expect(wrapper.findAll('label').length).toBe(5)
    expect(wrapper.findAll('input').length).toBe(5)
  })
  it('测试单行显示元素个数', async () => {
    const wrapper = mountForm({
      props: {
        modelValue: {
          name: '',
          age: 20,
          addr: '1',
          createDate: '',
          region: '',
        },
        items: {
          name: {
            key: '1',
            label: '姓名',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
          age: {
            key: '2',
            label: '年龄',
            name: 'age',
            type: FormItemType.INPUT_NUMBER,
            invisible: false,
          },
          addr: {
            key: '3',
            label: '地址',
            type: FormItemType.SELECT,
            options: [
              {
                value: '1',
                label: '北京',
              },
              {
                value: '2',
                label: '上海',
              },
              {
                value: '3',
                label: '广州',
              },
              {
                value: '4',
                label: '深圳',
              },
            ],
          },
          createDate: {
            key: '4',
            label: '创建日期',
            type: FormItemType.DATE,
          },
          region: {
            key: '5',
            label: '行政区划',
            type: FormItemType.SELECT_TREE,
          },
        },
        formProps: {
          'label-width': '100px',
        },
        columnsPerRow: 1,
      },
    })
    expect(wrapper.findAll('.el-row').length).toBe(5)
    await wrapper.setProps({ columnsPerRow: 2 })
    expect(wrapper.findAll('.el-row').length).toBe(3)
    await wrapper.setProps({ columnsPerRow: 3 })
    expect(wrapper.findAll('.el-row').length).toBe(2)
    await wrapper.setProps({ columnsPerRow: 5 })
    expect(wrapper.findAll('.el-row').length).toBe(2)
  })
  it('测试表单验证', async () => {
    const wrapper = mountForm({
      props: {
        modelValue: {
          name: '',
          age: 20,
          addr: '1',
          createDate: '',
          region: '',
        },
        items: {
          name: {
            key: '1',
            label: '姓名',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
          age: {
            key: '2',
            label: '年龄',
            name: 'age',
            type: FormItemType.INPUT_NUMBER,
            invisible: false,
          },
          addr: {
            key: '3',
            label: '地址',
            type: FormItemType.SELECT,
            options: [
              {
                value: '1',
                label: '北京',
              },
              {
                value: '2',
                label: '上海',
              },
              {
                value: '3',
                label: '广州',
              },
              {
                value: '4',
                label: '深圳',
              },
            ],
          },
          createDate: {
            key: '4',
            label: '创建日期',
            type: FormItemType.DATE,
          },
          region: {
            key: '5',
            label: '行政区划',
            type: FormItemType.SELECT_TREE,
          },
        },
        formProps: {
          'label-width': '100px',
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
            ],
            createDate: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
            ],
          },
        },
        columnsPerRow: 1,
      },
    })
    const nameInput = wrapper.find('input:first-child')
    await nameInput.trigger('focus')
    await nameInput.trigger('blur')
    const nameInputError = nameInput.element.parentNode.parentNode.children[1]
    expect(nameInputError).not.toBeUndefined()
    expect(nameInputError.textContent).toBe('请输入活动名称')
    await nameInput.trigger('focus')
    await nameInput.setValue('aa')
    await nameInput.trigger('blur')
    const nameInputError1 = nameInput.element.parentNode.parentNode.children[1]
    expect(nameInputError1.textContent).toBe('长度在 3 到 5 个字符')
    await (wrapper.vm.$refs.nodeRef as any).validate((valid) => {
      if (valid) {
        return true
      } else {
        return false
      }
    })
    expect(document.body.querySelectorAll('.el-form-item__error').length).toBe(2)
  })
  it('测试多表单校验', async () => {
    const Parent = {
      components: { FormCreator },
      setup() {
        const { validate } = useForm()
        const modelValue1 = reactive({
          name: '',
        })
        const modelValue2 = reactive({
          name: '',
        })
        const items1 = reactive({
          name: {
            key: '1',
            label: '姓名1',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
        })
        const items2 = reactive({
          name: {
            key: '1',
            label: '姓名2',
            name: 'name',
            type: FormItemType.INPUT,
            invisible: false,
          },
        })
        const formProps1 = reactive({
          'label-width': '100px',
          rules: {
            name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          },
        })
        const formProps2 = reactive({
          'label-width': '100px',
          rules: {
            name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          },
        })
        const submit = async () => {
          await validate()
        }
        return {
          modelValue1,
          modelValue2,
          items1,
          items2,
          formProps1,
          formProps2,
          submit,
        }
      },
      template: `          
        <div>
          <form-creator v-model="modelValue1" :items="items1" :form-props="formProps1"></form-creator>
          <form-creator v-model="modelValue2" :items="items2" :form-props="formProps2"></form-creator>
          <button @click="submit">submit</button>
        </div>
      `,
    }
    const wrapper = mount(Parent, { attachTo: document.body })
    expect(wrapper.findAll('.el-form-item__error').length).toBe(0)
    await wrapper.find('button').trigger('click')
    expect(wrapper.findAll('.el-form-item__error').length).toBe(2)
  })
})
