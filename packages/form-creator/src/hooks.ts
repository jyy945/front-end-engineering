import { ItemType } from '@/types'

// 根据columnsPerRow设置每行展示的form元素个数
export const useDealColumns = (
  columnsPerRow: number,
  items: Record<string, ItemType>
): Record<string, ItemType>[] => {
  columnsPerRow = columnsPerRow > 4 ? 4 : columnsPerRow
  let i = 0,
    temp: any = {}
  const formattedItems: Record<string, ItemType>[] = []
  for (const key in items) {
    if (i % columnsPerRow === 0) {
      if (Object.keys(temp).length > 0) formattedItems.push({ ...temp })
      temp = {}
    }
    if (!items[key].invisible) {
      temp[key] = items[key]
      i++
    }
  }
  if (Object.keys(temp).length > 0) formattedItems.push({ ...temp })
  return formattedItems
}
