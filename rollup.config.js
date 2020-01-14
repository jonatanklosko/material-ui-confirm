import pkg from './package.json';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  external: id => !id.startsWith('.'),
  plugins: [
    babel({ exclude: 'node_modules/**' })
  ]
};
