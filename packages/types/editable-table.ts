import { FormItemType } from '@/types/form-creator'

export enum EditType {
  ADD,
  EDIT,
  REVIEW,
}
export interface Column {
  name: string
  label: string
  type: FormItemType
  formItemProps?: Record<string, any>
  elementProps?: Record<string, any>
}

export interface Page {
  current: number
  pageSize: number
  total: number
}

export interface OperateType {
  add: (row: Record<string, any>) => Promise<any>
  del: (ids: string[]) => Promise<any>
  update: (row: Data) => Promise<any>
  get: (cur: number) => Promise<any>
}

export interface PropsType {
  type: EditType
  operate: OperateType
  columns: Column[]
}

export interface Data {
  id: string
  [key: string]: any
}

export interface ResponseData {
  current: number
  total: number
  size: number
  records: Data[]
  [key: string]: any
}
