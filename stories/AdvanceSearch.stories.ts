import CelAdvanceSearch from '../packages/advanceSearch/src/index.vue'
import { Types } from '../packages/types/form'
import { reactive } from 'vue'
import { ElButton } from 'element-plus'

export default {
  component: CelAdvanceSearch,
  title: 'checc/element-plus/advanceSearch',
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
const getBdSection = async () => [{ itemText: '1111', itemValue: '111133' }]
const FILTER_ITEMS = [
  {
    key: 'sectionNum',
    alias: 'sectionNo',
    required: false,
    type: Types.input,
    width: 100,
    labelId: '姓名',
    remoteMethod: getBdSection,
  },
  {
    key: 'minStake',
    required: false,
    width: 100,
    type: Types.inputNumber,
    labelId: '年龄',
  },
]
const Template = (args) => ({
  components: { CelAdvanceSearch, ElButton },
  setup() {
    const rArgs = reactive(args)
    return { rArgs }
  },
  template:
    '<cel-advanceSearch v-bind="rArgs" ><el-button type="primary">添加</el-button><el-button>导出</el-button></cel-advanceSearch>',
})

export const Primary = Template.bind({})
Primary.args = {
  formItems: FILTER_ITEMS,
  width: '300',
}
Primary.storyName = '基本展示'
