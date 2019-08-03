import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'src/MediaBreakpoints.js',
  output:  {
    file: 'lib/MediaBreakpoints.js',
    format: 'umd',
    name: 'MediaBreakpoints'
  },
  plugins: [
    babel(),
    uglify(),
  ],
};
