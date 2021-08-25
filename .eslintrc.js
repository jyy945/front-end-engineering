module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-var-requires': 0,
    'vue/require-default-prop': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'vue/no-mutating-props': 0
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
}
