export enum FormItemType {
  'INPUT',
  'INPUT_NUMBER',
  'DATE',
  'RADIO',
  'SELECT',
  'SELECT_TREE',
  'UPLOAD',
  'FILE',
  'CASCADER',
}
export enum DataType {
  Form,
  ApprovalHistory,
  DynamicTable,
  Images,
}

export interface FormCreatorPropType {
  modelValue: Record<string, any>
  items: Record<string, ItemType>
  formProps?: Record<string, any>
  columnsPerRow?: number
}

export interface OptionType {
  label: string
  value: string
}

export interface ItemType {
  key: string
  label: string
  name: string
  type: number
  options?: OptionType
  formItemProps?: Record<string, any>
  elementProps?: Record<string, any>
  invisible?: boolean
}
