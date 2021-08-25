import { provide, reactive } from 'vue'

type Validate = Promise<any>

export default (): Record<string, any> => {
  const validateList = reactive<Validate[]>([])
  const validate = (): Validate => {
    return new Promise((resolve, reject) => {
      Promise.all(validateList.map((validate: any): Validate => validate()))
        .then(() => resolve(true))
        .catch(() => reject(false))
    })
  }
  const addValidate = (validate: any) => validateList.push(validate)
  provide('AddValidate', addValidate)
  return {
    validate,
  }
}
