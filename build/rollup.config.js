import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import alias from 'rollup-plugin-alias'
import postcss from 'rollup-plugin-postcss'

export default {
  input: path.resolve(__dirname, '../packages/index.ts'),
  output: {
    format: 'umd',
    file: 'lib/index.js',
    name: 'CheccEP',
  },
  plugins: [
    alias({
      resolve: ['.ts', '.js', '.tsx', '.jsx', '.vue'],
      entries: {
        '@': path.resolve(__dirname, '../packages'),
      },
    }),
    terser(),
    nodeResolve(),
    vue({
      target: 'browser',
      css: false,
      exposeFilename: false,
    }),
    commonjs(),
    typescript({
      tsconfigOverride: {
        include: ['packages/**/*', 'types/vue-shim.d.ts'],
        exclude: ['node_modules', 'packages/**/__tests__/*'],
      },
      abortOnError: false,
    }),
    postcss({
      extract: false,
    }),
  ],
  external(id) {
    return /^vue/.test(id)
  },
}
