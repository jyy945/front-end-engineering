<template>
  <el-upload
    style="width: 200px"
    drag
    :action="uploadUrl"
    :headers="headers"
    multiple
    :limit="item.limit"
    :on-exceed="onExceed"
    :on-preview="downloadFile"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :file-list="fileList"
    :disabled="itemDisabled"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      {{ $t('lang.operate.dragFile') }}
      <em>{{ $t('lang.operate.clickUpload') }}</em>
    </div>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { getToken } from '@/utils/auth'
import { CHECC_API_FAST_DFS } from '@/constants/proxy'
import { map, isEmpty } from 'lodash'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { Upload } from '../types'
import * as api from '@/api/file'
import useDisabled from '../hooks/useDisabled'
import { ObjectType } from 'typings/interfaces'

interface File {
  name: string
  raw: ObjectType
  response: {
    code: number
    msg: string
    data: {
      fileId: string
      fileName: string
    }
  }
}

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
    item: {
      type: Object as PropType<Upload>,
      required: true,
    },
    form: {
      type: Object as PropType<ObjectType>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n()
    const itemDisabled = useDisabled(props.disabled, props.item.disabled)
    const fileList = ref(
      map(props.form[props.item.key], (item) => ({
        name: item.fileName,
        url: item.fileId,
        response: {
          data: item,
        },
      }))
    )

    const hanleValues = (fileList: File[]) => {
      const list = map(fileList, (file) => file.response.data)
      if (!isEmpty(list)) {
        props.form[props.item.key] = list
      } else {
        props.form[props.item.key] = undefined
      }
    }
    const downloadFile = (file: File) => api.downloadFileRequest(file?.response.data.fileId)
    const onSuccess = (response: Omit<File, 'data'>, file: File, fileList: File[]) =>
      hanleValues(fileList)
    const onRemove = (file: File, fileList: File[]) => hanleValues(fileList)

    /* 限制文件上传钩子 */
    const onExceed = () => {
      ElMessage({
        type: 'error',
        message: t('lang.validate.exceedFile', { limit: props.item.limit }),
      })
    }

    return {
      fileList,
      uploadUrl: CHECC_API_FAST_DFS + '/file/upload',
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      itemDisabled,
      downloadFile,
      onSuccess,
      onExceed,
      onRemove,
    }
  },
})
</script>

<style></style>
