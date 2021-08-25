<template>
  <section :class="$style.filter">
    <el-popover placement="bottom" :width="500" trigger="click">
      <template #reference>
        <search
          :placeholder-id="placeholderId || t('placeholder.input')"
          calss="search"
          @on-search="onSearch"
        />
      </template>
      <div>
        <cmp-form
          v-model="form"
          v-model:refForm="refForm"
          :form-items="formItems"
          :inline="true"
          :options="options"
          :label-width="labelWidth"
        />
        <div :class="$style.btn_group">
          <el-button type="primary" @click="params = form">
            {{ confirmBtnText || t('operate.confirm') }}
          </el-button>
          <el-button style="background-color: #5eaf01; color: #fff" @click="onReset">{{
            resetButtonText || t('operate.reset')
          }}</el-button>
        </div>
      </div>
    </el-popover>
    <el-button
      :class="$style.advanced_btn"
      size="small"
      type="primary"
      @click.stop="visible = !visible"
    >
      {{ t('operate.search') }}
    </el-button>
    <!-- 操作按钮 -->
    <div :class="$style.btns">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import CmpForm from '../../form/src/index.vue'
import Search from './Search.vue'
import { reduce } from 'lodash'
import { FormItems, Options } from '@/types/form'
import { ObjectType } from '@/types/interfaces'
import { ElButton, ElPopover } from 'element-plus'
import { t } from '@/locale'

export default defineComponent({
  name: 'CelAdvanceSearch',
  emits: ['on-search'],
  props: {
    queryFields: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    formItems: {
      type: Array as PropType<FormItems>,
      required: true,
    },
    options: {
      type: Object as PropType<Options>,
    },
    labelWidth: {
      type: String,
      default: '50px',
    },
    placeholderId: {
      type: String as PropType<string>,
    },
    confirmBtnText: {
      type: String as PropType<string>,
    },
    resetButtonText: {
      type: String as PropType<string>,
    },
  },
  components: {
    CmpForm,
    Search,
    ElPopover,
    ElButton,
  },
  setup() {
    const visible = ref(false)
    const refForm = ref<ObjectType>({})
    const form = reactive({})
    const params = reactive<ObjectType>({})
    return {
      visible,
      form,
      refForm,
      params,
      t,
    }
  },
  methods: {
    onReset() {
      this.refForm.resetFields()
    },
    onSearch(value: string) {
      const query = {
        ...this.form,
        ...reduce<string, any>(
          this?.queryFields,
          (total, item) => ({ ...total, [item]: value || undefined }),
          {}
        ),
      }
      this.$emit('on-search', 1, query)
    },
    onConfirm() {
      this.params = this.form
    },
  },
})
</script>
<style lang="scss" module>
.filter {
  display: flex;
  margin-bottom: 20px;

  & > div {
    margin-right: 10px;
  }
  .btns {
    display: flex;
    margin-left: auto;
  }
}
.advanced_btn {
  width: 74px;
}
.btn_group {
  display: flex;
  justify-content: flex-end;
}
</style>
