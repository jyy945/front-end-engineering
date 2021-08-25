import { watch, Ref } from 'vue'
import { filter, includes } from 'lodash'
import { FormItemKey, ObjectType } from '@/types/interfaces'
import { Option } from '@/types/form'

interface Params {
  key: FormItemKey
  form: ObjectType
  option: Ref<Option[]>
  primevalOption: Option[]
  watchKey: FormItemKey
  dictMap: Record<string, string[]>
}

const useFilterOption = ({ watchKey, key, form, option, dictMap, primevalOption }: Params) => {
  watch(
    () => form[watchKey],
    (value) => {
      form[key] = undefined
      if (dictMap[value]) {
        option.value = filter(primevalOption, ({ itemValue }) =>
          includes(dictMap[value], itemValue)
        )
      } else {
        option.value = primevalOption
      }
    }
  )
}

export default useFilterOption
