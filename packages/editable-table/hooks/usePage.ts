import { reactive } from 'vue'
import type { Ref } from 'vue'
import { Data, Page, ResponseData } from '@/types'

export default (
  get: (cur: number) => Promise<any>,
  data: Record<string, Data[]>,
  openLoading: () => void,
  closeLoading: () => void
): Record<string, any> => {
  const page = reactive<Page>({
    current: 1,
    total: 0,
    pageSize: 10,
  })

  // 请求指定页数据
  const pageChange = async (cur: number): Promise<void> => {
    openLoading()
    const rst: ResponseData = await get(cur)
    page.current = rst.current
    page.total = rst.total
    page.pageSize = rst.size
    data.records = rst.records
    closeLoading()
  }

  return {
    page,
    pageChange,
  }
}
