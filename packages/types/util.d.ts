/* 获取对象所有键的类型 */
export type $Keys<T extends Record<string, keyof any>> = keyof T

export type $Values<T extends Record<string, keyof any>> = T[keyof T]

export type ValuesType<T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>> =
  T extends ReadonlyArray<any>
    ? T[number]
    : T extends ArrayLike<any>
    ? T[number]
    : T extends Record<string, keyof any>
    ? T[keyof T]
    : never

export type Optional<T extends Record<string, any>, K extends keyof T = keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

type Required<T> = {
  [P in keyof T]-?: T[P]
}
