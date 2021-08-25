<template>
  <el-upload
    ref="uploadRef"
    :action="uploadUrl"
    multiple
    :headers="headers"
    :on-success="onSuccess"
    :show-file-list="false"
    :class="$style.upload"
  >
    <el-popover placement="bottom" :width="200" trigger="hover">
      <template #reference>
        <el-button :class="$style.btn">
          <span :class="$style.text">
            {{ t('form.fileList') }}
            <i class="el-icon-arrow-down" />
          </span>
        </el-button>
      </template>
      <div v-if="fileList.length" :class="$style.file_list">
        <div v-for="file of fileList" :key="file.uid" :class="$style.file">
          <i :class="['el-icon-document', $style.icon]" />
          <el-link :key="file.uid" type="info" @click.prevent="downloadFile(file)">
            {{ file.name }}
          </el-link>
          <div :class="$style.operate">
            <i v-if="isPreview(file)" class="el-icon-picture-outline" @click="onPreivew(file)" />
            <i
              v-if="!disabled"
              :class="['el-icon-close', $style.icon, $style.delete]"
              @click="deleteFile(file)"
            />
          </div>
        </div>
      </div>
      <div v-else :class="$style.no_data">{{ t('form.noData') }}</div>
    </el-popover>
    <el-button v-if="!disabled" type="primary" :loading="loading" @click="loading = true">
      {{ t('operate.upload') }}
    </el-button>
  </el-upload>
  <preivew v-model="previewInfo.visible" :file-id="previewInfo.fileId" />
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, reactive } from 'vue'
import { get, remove, map } from 'lodash'
import { ElButton, ElLink, ElMessage, ElPopover, ElUpload } from 'element-plus'
// import * as api from '@/api/file'
import Preivew from './Preview.vue'
// import { ObjectType } from 'typings/interfaces'
import { t } from '@/locale'
import { Upload } from '@/types/form'
import { ObjectType } from '@/types/interfaces'
// import { ObjectType } from "@/types/interfaces";

interface File {
  name: string
  uid: number
  row: any
  response: {
    data: {
      path: string
      fileId: string
      fileName: string
      type: string
    }
  }
}

export default defineComponent({
  components: {
    ElUpload,
    ElPopover,
    ElButton,
    ElLink,
    Preivew,
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as PropType<Upload>,
      required: true,
    },
    form: {
      type: Object as PropType<ObjectType>,
      required: true,
    },
    token: {
      type: String as PropType<string>,
      required: true,
    },
    uploadUrl: {
      type: String as PropType<string>,
      required: true,
    },
    downloadFileRequest: {
      type: Function as PropType<(any) => Promise<any>>,
      required: true,
    },
  },
  setup(props) {
    const fileList = ref<File[]>([])
    const loading = ref(false)
    const uploadRef = ref(null)
    const previewInfo = reactive({
      visible: false,
      fileId: '',
    })
    // const { t } = useI18n()
    const deleteFile = (file: File) =>
      api.deleteFileRequset(get(file, 'response.data.fileId')).then(() => {
        ElMessage({
          type: 'success',
          message: t('lang.operate.deleteSuccess'),
        })
        remove(get(uploadRef, 'value.uploadFiles', []), {
          uid: file.uid,
        })
      })

    const onSuccess = () => {
      ElMessage({
        type: 'success',
        message: t('lang.operate.updateSuccess'),
      })
      loading.value = false
      fileList.value = get(uploadRef, 'value.uploadFiles')
    }

    watch(fileList, (list) => {
      props.form[props.item.key] =
        list.length === 1 ? [list[0].response.data] : map(list, (item) => item.response.data)
    })

    const onPreivew = (file: File) => {
      previewInfo.visible = true
      previewInfo.fileId = get(file, 'response.data.fileId')
    }

    const isPreview = (file: File) => {
      const fileType = get(file, 'response.data.type', '')
      const imageTypes = ['png', 'jpg', 'gif', 'svg']
      return imageTypes.includes(fileType)
    }
    return {
      deleteFile,
      fileList,
      uploadRef,
      onSuccess,
      loading,
      previewInfo,
      onPreivew,
      // uploadUrl: props.uploadUrl,
      headers: {
        Authorization: 'Bearer ' + props.token,
      },
      style: {
        width: props.item?.width ? props.item.width + 'px' : '100%',
      },
      isPreview,
      downloadFile: (file: File) => props.downloadFileRequest(get(file, 'response.data.fileId')),
      t,
    }
  },
})
</script>

<style module lang="scss">
.upload {
  width: 200px;
  :global(.el-upload) {
    display: flex;
  }
  .btn {
    width: 100%;
    flex: 1;
    .text {
      display: flex;
      justify-content: space-around;
    }
  }
}
.file_list {
  display: flex;
  flex-direction: column;
  .file {
    width: 100%;
    display: flex;
    align-content: center;
    margin: 4px 0;
    &:hover {
      background-color: #f5f7fa;
      a {
        color: #66b1ff;
        &::after {
          color: #66b1ff;
        }
      }
    }
    a {
      margin-left: 4px;
    }
    .icon {
      cursor: pointer;
      &:before {
        vertical-align: sub;
      }
    }
  }
}

.operate {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.delete {
  margin-left: auto;
  &:hover {
    color: red;
  }
}
.no_data {
  text-align: center;
}
</style>
