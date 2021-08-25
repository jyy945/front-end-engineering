import { t } from '@/locale'
import { FormItem } from '@/types/form'

function usePlaceholder({ placeholderId, disabled }: FormItem, defaultPlaceholderId: string) {
  if (placeholderId) return t(placeholderId)
  if (disabled) return t('placeholder.defaultSys')
  return t(defaultPlaceholderId)
}

export default usePlaceholder
