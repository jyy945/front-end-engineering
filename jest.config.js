module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // 告诉 Jest 处理 `*.vue` 文件
    'vue',
  ],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  // 支持源代码中相同的 `@` -> `src` 别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
