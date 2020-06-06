import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/MediaBreakpoints.js',
  output: {
    file: 'lib/MediaBreakpoints.js',
    format: 'umd',
    name: 'MediaBreakpoints',
  },
  plugins: [
    commonjs(),
    resolve({
      browser: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
};
