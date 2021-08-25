import { ResponseDataPromise } from '@/types/interfaces'

export declare type ObjectType = Record<string, any>
export interface BaseColumn {
  key: string
  labelId: string
  type: 'string' | 'option' | 'org' | 'date' | 'progress'
  formate?: string
  width?: number
  fixed?: 'left' | 'right'
  children?: BaseColumn[]
  formatter?: (row: ObjectType, column: ObjectType, cellValue: string, index: number) => any
  sortable?: boolean // 可排序
  alias?: string // 别名
}

export interface EditColumn {
  key: string
  labelId: string
  type: 'datePick' | 'input' | 'select' | 'inputNumber' | 'org'
  dateType?: 'date' | 'week' | 'month' | 'year'
  formate?: string
  width?: number
  alias?: string
  required?: boolean
  editable?: boolean
  disabled?: boolean
  shouldUpdate?: Array<[x: string, x?: string]>
  remoteMethod?: (pagination: Pagination, params: ObjectType) => ResponseDataPromise<ObjectType> // 分页查询接口
  rules?: ObjectType[]
  min?: string
  children?: EditColumn[]
  /* 数据联动 */
  linkage?: {
    key: string
    dictMap: Record<string, string[]>
  }
}

export type DataSource = ObjectType[]

export type Columns = BaseColumn[]

export type EditColumns = EditColumn[]

export interface Pagination {
  pageNum: number
  pageSize: number
  total: number
  orderType?: 'ASC' | 'DESC' // 排序方式
  orderBy?: string // 排序字段
}
