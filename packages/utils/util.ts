/**
 * 树节点找到某个节点
 * @param root tree节点 ObjectType[]
 * @param params ObjectType
 * @returns ObjectType
 */
import { ObjectType } from '@/types/interfaces'
import { forEach, isEmpty, reduce } from 'lodash'

export function findNode(root: any, params: { [x: string]: string }): ObjectType {
  const stack: ObjectType = [...root]
  const key = Object.keys(params)[0]
  let node
  stack.push(root)
  while (stack.length > 0) {
    node = stack.pop()
    if (node[key] == params[key]) {
      return node
    } else if (!isEmpty(node.children)) {
      forEach(node.children, (item) => stack.push(item))
    }
  }
  return {}
}

/**
 * 处理表单项
 * @param items 表单项
 * @returns Record<FormItemKey, undefined>
 */
export const handleFormItems = (items: Record<'key', string>[]): Record<string, undefined> =>
  reduce(
    items,
    (total, { key }) => {
      return {
        ...total,
        [key]: undefined,
      }
    },
    {}
  )
