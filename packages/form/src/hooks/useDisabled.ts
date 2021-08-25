/* 处理表单禁用状态 */
export default function useDisabled(disabled: boolean, itemDisabled: boolean | undefined) {
  if (disabled) return disabled
  return itemDisabled
}
