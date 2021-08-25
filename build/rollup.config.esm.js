import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import alias from 'rollup-plugin-alias'

export default [
  {
    input: path.resolve(__dirname, '../packages/index.ts'),
    output: {
      format: 'es',
      file: 'lib/index.esm.js',
    },
    plugins: [
      terser(),
      nodeResolve(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false,
      }),
      commonjs(),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx', '.vue'],
        entries: {
          '@': path.resolve(__dirname, '../packages'),
        },
      }),
      typescript({
        typescript: require('ttypescript'),
        tsconfigOverride: {
          compilerOptions: {
            plugins: [
              { transform: 'typescript-transform-paths' },
              { transform: 'typescript-transform-paths', afterDeclarations: true },
            ],
          },
          include: ['packages/**/*', 'types/vue-shim.d.ts'],
          exclude: ['node_modules', 'packages/**/__tests__/*'],
        },
        abortOnError: false,
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
    external(id) {
      return /^vue/.test(id)
    },
  },
]
