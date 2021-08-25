import { FormItem } from '@/types/form'

export default function useStyle({ width }: FormItem) {
  return {
    style: {
      width: width ? width + 'px' : '100%',
    },
  }
}
