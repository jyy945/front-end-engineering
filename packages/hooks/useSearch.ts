import { onMounted, reactive, ref, Ref, nextTick } from 'vue'
import { omit, get } from 'lodash'
// import { ObjectType, ResponseDataPromise } from 'typings/interfaces'
// import { Optional } from 'typings/util'
import { ObjectType, ResponseDataPromise } from '@/types/interfaces'
import { Optional } from '@/types/util'
import { Pagination } from '@/types'

type Fetch = (
  pagination: Omit<Pagination, 'total'>,
  params: ObjectType
) => ResponseDataPromise<ObjectType>

type Sort = Optional<Pagination>

interface Return {
  pagination: Pagination
  dataSource: Ref<ObjectType[]>
  loading: Ref<boolean>
  changePage: (page: number, params?: ObjectType) => Promise<ObjectType[]>
  refreshData: (jumpFirstPage?: boolean) => Promise<ObjectType[]>
  onReset: () => void
  sort: (obj: Sort) => Promise<ObjectType[]>
}

interface Option {
  notImmediate?: boolean // 非立即执行
  valuePath?: string // 分页路径
  extraParams?: ObjectType // 额外参数
}

export default function useSearch(fetchRecords: Fetch, option?: Option): Return {
  const query = ref(get(option, 'extraParams', {}))
  const list = ref([])
  const loading = ref(false)
  const pagination = reactive<Pagination>({
    pageNum: 1,
    total: 0,
    pageSize: 10,
    orderBy: undefined,
    orderType: undefined,
  })
  const onSearch = async (params?: ObjectType): Promise<ObjectType[]> =>
    new Promise((resolve, reject) => {
      loading.value = true
      query.value = params || query.value
      fetchRecords &&
        fetchRecords(omit(pagination, 'total'), query.value)
          .then(({ data }) => {
            list.value = get(data, option?.valuePath ?? 'data.records', [])
            pagination.pageNum = get(data, 'data.current', 1)
            pagination.total = get(data, 'data.total', 0)
            loading.value = false
            resolve(list.value)
          })
          .catch(() => {
            reject([])
            loading.value = false
          })
    })

  const changePage = (page: number, params?: ObjectType) => {
    pagination.pageNum = page
    query.value = { ...query.value, ...params }
    return onSearch()
  }

  const onReset = () => changePage(1, {})

  /**
   *  页面刷新
   * @param jumpFirstPage 跳转第一页
   * @returns Promise<ObjectType[]>
   */
  const refreshData = (jumpFirstPage?: boolean) => {
    const page = jumpFirstPage ? 1 : pagination.pageNum
    return changePage(page)
  }

  /* 排序 */
  const sort = ({ orderBy, orderType }: Sort) => {
    pagination.orderBy = orderBy
    pagination.orderType = orderType
    return onSearch()
  }

  onMounted(() => {
    if (!option?.notImmediate) {
      nextTick().then(() => changePage(1))
    }
  })

  return {
    pagination,
    dataSource: list,
    loading,
    changePage,
    onReset,
    refreshData,
    sort,
  }
}
