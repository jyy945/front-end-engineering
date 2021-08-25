import { AxiosPromise } from 'axios'

/* eslint-disable @typescript-eslint/no-explicit-any */
export declare type ObjectType = Record<string, any>

/**
 * 表单字段名
 */
export declare type FormItemKey = string

// 数据字典ID
export declare type DictId = string

// i18n message
export declare type I18nMessageId = string

export declare interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

// 返回数据
export declare interface ResponseData<T> {
  code: Code
  status: boolean
  data: T
  msg: string
}
export declare type ResponseDataPromise<T = any> = AxiosPromise<ResponseData<T>>
