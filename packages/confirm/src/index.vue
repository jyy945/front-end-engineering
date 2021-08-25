<template>
  <template v-if="type === 'button'">
    <el-button :disabled="disabled" :type="linkType" :class="$attrs.class" @click="onOpen">{{
      text
    }}</el-button>
  </template>
  <template v-if="type === 'link'">
    <el-link :type="linkType" :disabled="disabled" :class="$attrs.class" @click.prevent="onOpen">{{
      text
    }}</el-link>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { t } from '../../locale'
import { ElMessageBox, ElButton, ElLink } from 'element-plus'
import { MessageType } from 'element-plus/packages/message-box/src/message-box.type'
export default defineComponent({
  props: {
    type: {
      type: String as PropType<'link' | 'button'>,
      default: 'button',
    },
    infoType: {
      type: String as PropType<MessageType>,
      default: 'info',
    },
    linkType: {
      type: String,
      default: 'info',
    },
    title: {
      type: String,
    },
    updateData: {
      type: Function as PropType<() => Promise<any>>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    requestData: {
      type: Function as PropType<() => Promise<any>>,
      required: true,
    },
  },
  components: { ElButton, ElLink },
  setup(props) {
    const onOpen = () => {
      ElMessageBox.confirm(props.content, props.title || t('cel.hint'), {
        confirmButtonText: t('cel.confirm'),
        cancelButtonText: t('cel.cancel'),
        type: props.infoType,
      }).then(async () => {
        try {
          await props.requestData()
          if (props.updateData) {
            await props.updateData()
          }
        } catch (e) {
          console.log(e)
        }
      })
    }
    return {
      onOpen,
    }
  },
})
</script>
