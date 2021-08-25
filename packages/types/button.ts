import { PropType } from 'vue'

type IButtonType = PropType<
  'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
>
declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export declare interface IButtonProps {
  type: IButtonType
  size: PropType<ComponentSize>
  icon: string
  nativeType: string
  loading: boolean
  disabled: boolean
  plain: boolean
  autofocus: boolean
  round: boolean
  circle: boolean
}
