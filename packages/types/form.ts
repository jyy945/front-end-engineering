import {
  DictId,
  FormItemKey,
  ObjectType,
  Pagination,
  ResponseDataPromise,
} from '@/types/interfaces'
import { ITreeData } from '@/types/orgTree'

export interface Option {
  itemText: string
  itemValue: string | boolean | number
  disabled?: boolean
}

export type Options = Record<DictId, Option[] | Array<any>>

export enum Types {
  redio = 'redio',
  input = 'input',
  select = 'select',
  inputNumber = 'input-number',
  user = 'user',
  datePick = 'date-pick',
  upload = 'upload',
  selectOrg = 'selectOrg',
  radio = 'radio',
  image = 'image',
}

export type Alias = string

interface BaseFormItem {
  key: FormItemKey
  type: Types
  required: boolean
  labelId: string
  placeholderId?: string
  width?: number
  class?: string
  error?: string
  disabled?: boolean
}

export interface Input extends BaseFormItem {
  placeholderId?: string
  errorMsg?: string
}

export interface Select extends BaseFormItem {
  multiple?: boolean
  collapseTags?: boolean
  alias?: Alias
  shouldUpdate?: Array<[x: FormItemKey, x?: Alias]>
  linkage?: {
    key: FormItemKey
    dictMap: Record<string, string[]>
  }
  remoteMethod: (
    pagination: Omit<Pagination, 'total'>,
    params: ObjectType
  ) => ResponseDataPromise<ObjectType> // 分页查询接口
}

export interface InputNumber extends BaseFormItem {
  max?: number
  min?: number
  precision: number /** 精度 */
  step?: number /** 步长*/
}

export interface DatePick extends BaseFormItem {
  formate: string
  dateType: 'year' | 'month' | 'date' | 'week'
}

// 用户
export interface User extends BaseFormItem {
  multiple: boolean
  fetchRecordsRequest: (params: any) => ResponseDataPromise<ObjectType> // 分页查询接口
  treeData: ITreeData[]
}

// 上传文件
export interface Upload extends BaseFormItem {
  multiple: boolean
  limit: number
}

//机构树形选择
export interface SelectOrg extends BaseFormItem {
  filterName: string
}

export type FormItem = Select | Input | DatePick | InputNumber | User | Upload | SelectOrg

export type FormItems = FormItem[]
