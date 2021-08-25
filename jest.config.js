module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json', 'vue', 'd.ts'],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  // 支持源代码中相同的 `@` -> `src` 别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['packages/**/*.vue'],
  coverageReporters: ['clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  transformIgnorePatterns: ['/node_modules\\/.*'],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  testMatch: ['**/__tests__/*.(spec|test).ts'],
}
