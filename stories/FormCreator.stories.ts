import { reactive, ref } from 'vue'
import CelFormCreator from '../packages/form-creator/src/index.vue'
import { FormItemType } from '../packages/types/index'

export default {
  component: CelFormCreator,
  title: 'checc/element-plus/form-creator',
  argTypes: {
    'update:modelValue': {
      table: { disable: true },
    },
    modelValue: {
      description: '对表单进行双向绑定，相当于el中form的model',
      type: { name: 'object' },
      table: {
        defaultValue: {
          summary: '{}',
        },
        type: {
          detail: `{key: value,...}
key为表单元素的name， value为初始值
例如：{
  name: '',
  age: 0,
  addr: 'bj'
}
`,
        },
      },
      control: { type: 'object' },
    },
    items: {
      description: '描述表单元素信息的对象',
      type: { name: 'array', required: true },
      table: {
        defaultValue: {
          summary: '{}',
        },
        type: {
          detail: `ItemType:{
  key<string>: 元素key，必传
  label<string>: 元素的标签名
  name<string>: 元素的name，和modelValue中name对应
  type<number>: 元素的类型，值为FormItemType<INPUT=0,INPUT_NUMBER=1,DATE=2,RADIO=3,SELECT=4,SELECT_TREE=5,UPLOAD=6,FILE=7,CASCADER=8>
  options<array>?: 若元素为select，则此项为其option数组
  formItemProps<object>?: 透传el的el-form-item标签属性
  elementProps<object>?: 透传响应的el的表单元素标签属性，例如el-input、el-date、el-select
  invisible<boolean>?: 是否显示该表单元素 
}
例如： {
  roadName: {
    key: '1',
    label: '路段名称'，
    name: 'roadName',
    type: FormItemType.INPUT
    formItemProps: {
      required: true,
      rules: {...}
    },
    elementProps: {
      disabled: true,
      onChange: function(){}
    },
    invisible: true
  }
}
`,
        },
      },
      control: { type: 'object' },
    },
    formProps: {
      description: '透传el中form属性',
      type: { name: 'object' },
      table: {
        defaultValue: {
          summary: '{}',
        },
      },
      control: { type: 'object' },
    },
    columnsPerRow: {
      description:
        '用于控制每行显示的表单元素的个数，默认为1，即每行只展示一个表单元素。每行最多为4个',
      control: { type: 'number', min: 1, max: 4 },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'auto',
      },
      description: {
        component: '根据表单元素列表生成表单',
      },
    },
  },
}

const Template = (args) => ({
  components: { CelFormCreator },
  setup() {
    return {
      args,
    }
  },
  template: '<cel-form-creator v-model="args.modelValue" v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  modelValue: {
    name: '',
    age: 20,
    addr: '1',
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
  },
  columnsPerRow: 2,
  formProps: {
    'label-width': '100px',
  },
}
Primary.storyName = '基本展示'

export const WithValidate = () => ({
  components: { CelFormCreator },
  setup() {
    const formRef = ref(null)
    const modelValue = reactive<Record<string, any>>({
      name: '',
      age: 20,
      addr: '1',
      createDate: '',
      region: '',
    })
    const items = reactive<Record<string, any>>({
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
    })
    const columnsPerRow = 2
    const formProps = {
      'label-width': '100px',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        age: [{ required: true, message: '请填写年龄', trigger: 'blur' }],
        addr: [{ type: 'date', required: true, message: '请选择地址', trigger: 'change' }],
        createDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
      },
    }
    const submit = () => {
      formRef.value.nodeRef.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    return {
      modelValue,
      items,
      formRef,
      columnsPerRow,
      formProps,
      submit,
    }
  },
  template: `<div>
  <cel-form-creator ref="formRef" v-model="modelValue" :form-props="formProps" :items="items" :columns-per-row="columnsPerRow" />
  <button @click="submit">submit</button>
</div>`,
})
WithValidate.args = {}
WithValidate.storyName = '带有表单验证'
