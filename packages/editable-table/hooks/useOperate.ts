import { Column, Data, OperateType } from '@/types'
import { ElMessage } from 'element-plus'

export default (
  columns: Column[],
  data: Record<string, Data[]>,
  selectedRows: Record<string, Data[]>,
  operators: OperateType,
  pageChange: (cur: number) => Promise<Record<string, any>[]>
): Record<string, any> => {
  // 添加数据，成功后重新获取第一页数据
  const saveRow = async (row: Record<string, any>): Promise<void> => {
    await operators.add(row)
    await pageChange(1)
  }
  // 删除数据，成功后重新获取第一页数据
  const delRow = async (): Promise<any> => {
    await operators.del(selectedRows.records.map((item) => item.id))
    data.records = data.records.filter((item) => !selectedRows.records.includes(item))
    selectedRows.records = []
    await pageChange(1)
    ElMessage.success('删除成功')
  }
  // 更新数据， 成功后重新获取当前页数据
  const updateRow = async (row: Data): Promise<any> => {
    await operators.update(row)
    ElMessage.success('编辑成功')
  }

  return {
    saveRow,
    delRow,
    updateRow,
  }
}
