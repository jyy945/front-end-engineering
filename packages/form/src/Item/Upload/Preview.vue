<template>
  <el-dialog
    :title="t('operate.preview')"
    :model-value="modelValue"
    @close="$emit('update:modelValue', false)"
  >
    <div v-loading="loading" class="image">
      <el-image v-if="visible" :src="imageUrl" fit="fit" />
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { ElDialog, ElImage } from 'element-plus'
import { t } from '@/locale'
export default defineComponent({
  components: { ElDialog, ElImage },
  emits: ['update:modelValue'],
  props: {
    fileId: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    previewImageRequest: {
      type: Function as PropType<(any) => Promise<any>>,
      required: true,
    },
  },
  setup(props) {
    const imageUrl = ref('')
    const visible = ref(false)
    const loading = ref(false)
    watch(
      () => props.fileId,
      (value) => {
        if (value) {
          loading.value = true
          props
            .previewImageRequest(value)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .then(({ data }) => {
              imageUrl.value = data.data
              visible.value = true
              loading.value = false
            })
            .catch(() => (loading.value = false))
        }
      }
    )
    return {
      imageUrl,
      visible,
      loading,
      t,
    }
  },
})
</script>
<style>
.image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
}
</style>
